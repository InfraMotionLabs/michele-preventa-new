'use client';

import { create } from 'zustand';

interface AvatarState {
  messages: Message[];
  currentMessage: Message | null;
  loading: boolean;
  cameraZoomed: boolean;
  askAI: (userMessage: string) => void;
  playMessage: (message: any) => void;
  stopMessage: (message: any) => void;
  setCameraZoomed: (zoomed: boolean) => void;
  isPlaying: boolean;
}

interface Message {
  userMessage: string;
  id: number;
  response?: any;
  visemes?: any[];
  animation?: any[];
  audioPlayer?: any;
}

export const useAvatar = create<AvatarState>((set, get) => ({
  messages: [],
  currentMessage: null,
  loading: false,
  cameraZoomed: true,
  isPlaying: false,
  setCameraZoomed: (zoomed: boolean) => set({ cameraZoomed: zoomed }),
  askAI: async (userMessage: string) => {
    if (!userMessage) {
      return;
    }
    const message: Message = {
      userMessage,
      id: get().messages.length,
    };
    set(() => ({
      loading: true,
    }));

    // Ask AI
    const res = await fetch('/api/gptChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userMessage }),
    });

    if (!res.ok) {
      throw new Error(`GPT response error: ${res.status}`);
    }

    const data = await res.json();
    console.log('GPT response: ', data);
    message.response = data;

    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    get().playMessage(message);
  },
  playMessage: async (message) => {
    const { currentMessage } = get();

    // Dispose of the previous audio player if there is one
    if (currentMessage && currentMessage.audioPlayer) {
      const previousAudioPlayer = currentMessage.audioPlayer;
      previousAudioPlayer.pause();
      previousAudioPlayer.src = '';
      previousAudioPlayer.removeEventListener(
        'canplaythrough',
        previousAudioPlayer.play
      );
      previousAudioPlayer.removeEventListener(
        'ended',
        previousAudioPlayer.onended
      );
    }

    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));

      // Get TTS
      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: message.response }),
      });

      if (!response.ok) {
        throw new Error(`Voice Synthesis error: ${response.status}`);
      }

      const responseBody = await response.json();
      console.log('responseBody', responseBody);

      if (responseBody.animations) {
        try {
          const animations = responseBody.animations;
          console.log('Animations:', animations);
          const allBlendShapes = animations.reduce((acc: any, anim: any) => {
            return acc.concat(anim.BlendShapes);
          }, []);
          console.log('All BlendShapes:', allBlendShapes);
          message.visemes = animations;
        } catch (error) {
          console.error('Failed to parse animation JSON:', error);
        }
      } else {
        console.log('No animation data found');
      }

      const audioBlob = new Blob(
        [Uint8Array.from(atob(responseBody.audioData), (c) => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioPlayer = new Audio(audioUrl);

      audioPlayer.addEventListener('loadedmetadata', () => {
        console.log('Audio metadata loaded');
        audioPlayer.currentTime = 0;
      });

      audioPlayer.addEventListener('canplaythrough', () => {
        console.log('Audio can play through');
        set((state) => ({
          ...state,
          isPlaying: true,
        }));
        audioPlayer.play();
      });

      audioPlayer.addEventListener('ended', () => {
        console.log('Audio ended');
        set(() => ({
          currentMessage: null,
          isPlaying: false,
        }));
      });

      message.audioPlayer = audioPlayer;

      set(() => ({
        loading: false,
        messages: get().messages.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        }),
      }));
    } else {
      message.audioPlayer.pause();
      message.audioPlayer.currentTime = 0;
    }

    // Ensuring that the currentTime is set to 0 before playing
    message.audioPlayer.addEventListener(
      'canplaythrough',
      () => {
        console.log('Audio can play through (existing player)');
        message.audioPlayer.currentTime = 0;
        set((state) => ({
          ...state,
          isPlaying: true,
        }));
        message.audioPlayer.play();
      },
      { once: true }
    );

    message.audioPlayer.load(); // Ensuring the audio is loaded and ready to play
  },
  stopMessage: (message) => {
    message.audioPlayer.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
}));
