'use client';

import { CheckVideoPlayback } from '@/app/tools_actions';
import { useAvatar } from '@/hooks/useAvatar';
import { Loader } from '@react-three/drei';
import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { Leva } from 'leva';
import { useEffect, useRef, useState } from 'react';
import { Experience } from './Experience';
import { RecordAudio } from './RecordAudio';
import VideoPlayer from './VideoPlayer';
import { HeroUI } from './HeroUI';
import {
  continueConversation2,
  generateDescriptions2,
  generateDescriptions3,
  generateDescriptions4,
} from '@/app/actions';

function Hero() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const { startRecording, stopRecording, text, isRecording } = RecordAudio();
  const [visemes, setVisemes] = useState<number[][]>([]);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const { cameraZoomed, setCameraZoomed } = useAvatar((state) => ({
    cameraZoomed: state.cameraZoomed,
    setCameraZoomed: state.setCameraZoomed,
  }));
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const isCancelledRef = useRef(false);
  const shouldVideoPlayRef = useRef(false);

  useEffect(() => {
    if (text !== '') {
      console.log('Text:', text);

      const newMessages: CoreMessage[] = [
        ...messages,
        { content: text, role: 'user' },
      ];

      setMessages(newMessages);
      handleSubmit(newMessages);
    }
  }, [text]);

  const handleSubmit = async (newMessages: CoreMessage[]) => {
    setIsGenerating(true);
    setIsCancelled(false);
    isCancelledRef.current = false;

    const result = await continueConversation2(newMessages);
    console.log('Result:', result);

    if (isCancelledRef.current) {
      console.log('Operation cancelled during API call');
      setIsGenerating(false);
      return;
    }

    if (result.type === 'text') {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: result.content as string,
        },
      ]);
      await synthesizeAudio(result.content as string);
    } else if (result.type === 'toolResult') {
      console.log('Result:', result);
      if (Array.isArray(result.content) && result.content.length > 0) {
        const toolResult = result.content[result.content.length - 1];
        if (toolResult.tool === 'show_Shoplifting_Instances') {
          if (Array.isArray(toolResult.result)) {
            await executeVideoPlayback(toolResult.result);
          } else {
            console.error('Invalid result format for video playback');
          }
        } else if (toolResult.tool === 'get_Count') {
          const latestUserMessage = newMessages[newMessages.length - 1].content;
          await executeAudioPlayback(toolResult.result, latestUserMessage);
        } else if (toolResult.tool === 'handle_different_questions') {
          const latestUserMessage = newMessages[newMessages.length - 1].content;
          await executeAudioPlayback2(toolResult.result, latestUserMessage);

          // if (Array.isArray(result.content) && result.content.length > 0) {
          //   if (
          //     Array.isArray(result.content[0]) &&
          //     result.content[0].length > 0 &&
          //     typeof result.content[0][0] === 'object' &&
          //     'video_url' in result.content[0][0] &&
          //     'details' in result.content[0][0]
          //   ) {
          //     await executeVideoPlayback(result.content[0]);
          //   } else if (
          //     Array.isArray(result.content) &&
          //     result.content.every((item) => typeof item === 'number')
          //   ) {
          //     const latestUserMessage = newMessages[newMessages.length - 1].content;
          //     await executeAudioPlayback(
          //       result.content[result.content.length - 1],
          //       latestUserMessage
          //     );

          // console.error(
          //   'Invalid toolResult content structure:',
          //   result.content
          // );
        }
      } else {
        console.error('Invalid toolResult content:', result.content);
      }
    } else {
      console.error('Error in response:', result.content);
    }

    if (!isCancelledRef.current) {
      setIsGenerating(false);
    }
  };

  // Modify synthesizeAudio to check for cancellation
  const synthesizeAudio = async (gptResponse: string) => {
    try {
      if (isCancelledRef.current) return;

      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: gptResponse }),
      });

      if (!response.ok) {
        throw new Error(`Voice Synthesis error: ${response.status}`);
      }

      if (isCancelledRef.current) return;

      const audio = await response.blob();
      const visemes = JSON.parse(response.headers.get('visemes') || '');
      setVisemes(visemes);
      const audioUrl = URL.createObjectURL(audio);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error synthesizing audio:', error);
    }
  };

  const handleStartRecording = () => {
    console.log('Setting isVideoVisible to false');
    setIsVideoVisible(false);
    shouldVideoPlayRef.current = false;
    console.log('shouldVideoPlayRef set to false in handleStartRecording');
    startRecording();
  };

  const executeVideoPlayback = async (videoData: any[]) => {
    setIsCancelled(false);
    isCancelledRef.current = false;

    const count = videoData.length;
    const initialResponse = await generateInitialResponse(count);
    if (isCancelledRef.current) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'assistant', content: initialResponse },
    ]);
    await synthesizeAudio(initialResponse);
    await cancellableDelay(7000);
    if (isCancelledRef.current) return;

    console.log('Starting video playback');
    for (let i = 0; i < videoData.length; i++) {
      if (isCancelledRef.current) {
        console.log('Playback cancelled');
        break;
      }

      const item = videoData[i];
      console.log('Item:', item);
      const description = await generateDescriptions2(item.details);
      if (isCancelledRef.current) break;

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: description || '' },
      ]);

      if (description) {
        await synthesizeAudio(description);
        if (isCancelledRef.current) break;
      }

      setVideoUrl(item.video_url);
      setIsVideoVisible(true);

      await cancellableDelay(12000);
      if (isCancelledRef.current) break;
      // Generate another response if there are more items
      if (i < videoData.length - 1 && videoData.length > 1) {
        const anotherResponse = await generateAnotherResponse();
        if (isCancelledRef.current) break;

        await synthesizeAudio(anotherResponse);
        await cancellableDelay(3000);
        if (isCancelledRef.current) break;
      }
    }

    setIsVideoVisible(false);
  };

  const executeAudioPlayback = async (content: any, latestUserMessage: any) => {
    setIsCancelled(false);
    isCancelledRef.current = false;

    const description = await generateDescriptions3(content, latestUserMessage);

    await synthesizeAudio(description as string);
    await cancellableDelay(7000);
    if (isCancelledRef.current) return;
  };

  const executeAudioPlayback2 = async (
    content: any,
    latestUserMessage: any
  ) => {
    setIsCancelled(false);
    isCancelledRef.current = false;

    const description = await generateDescriptions4(content, latestUserMessage);

    await synthesizeAudio(description as string);
    await cancellableDelay(7000);
    if (isCancelledRef.current) return;
  };

  const cancellableDelay = (ms: number) => {
    return new Promise<void>((resolve) => {
      const startTime = Date.now();
      const check = () => {
        if (isCancelledRef.current || Date.now() - startTime >= ms) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    });
  };

  // Update stopAudioAndAnimation to reset necessary states
  const stopAudioAndAnimation = () => {
    setIsCancelled(true);
    isCancelledRef.current = true;
    setIsVideoVisible(false);
    setIsGenerating(false);
    setIsPlaying(false);

    // Stop audio playback
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    // Stop video playback
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    // Clear audio URL to prevent further playback
    setAudioUrl(undefined);

    // Clear video URL to prevent further playback
    setVideoUrl('');

    // Reset visemes
    setVisemes([]);
  };

  const waitForAudioToFinish = () => {
    return new Promise<void>((resolve) => {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        const checkAudioEnd = () => {
          if (isCancelled) {
            resolve();
          } else if (audioElement.ended) {
            resolve();
          } else {
            requestAnimationFrame(checkAudioEnd);
          }
        };

        if (audioElement.ended) {
          resolve();
        } else {
          audioElement.onended = () => {
            resolve();
          };
          checkAudioEnd(); // Start checking in case the audio ends before the event listener is set
        }
      } else {
        resolve(); // Resolve immediately if no audio element is found
      }
    });
  };

  const generateInitialResponse = async (count: number) => {
    if (count === 0) {
      return 'There are no instances related to that. Is there anything else I can help you with?';
    }

    return `I have found ${count} relevant ${
      count === 1 ? 'instance' : 'instances'
    }. I'll describe ${count === 1 ? 'it' : 'each one'} as we view ${
      count === 1 ? 'it' : 'them'
    }. Please wait, I'm analyzing the footage now.`;
  };

  const generateAnotherResponse = async () => {
    return `Please wait, I'm analyzing the next footage now.`;
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen">
      <Loader />
      <Leva />
      <VideoComponent
        isVideoVisible={isVideoVisible}
        videoUrl={videoUrl}
        setIsVideoVisible={setIsVideoVisible}
        setIsPlaying={setIsPlaying}
        isAudioPlaying={isPlaying}
        isCancelled={isCancelled}
      />
      <HeroUI
        cameraZoomed={cameraZoomed}
        setCameraZoomed={setCameraZoomed}
        isRecording={isRecording}
        startRecording={handleStartRecording}
        stopRecording={stopRecording}
        isGenerating={isGenerating}
        stopAudioAndAnimation={stopAudioAndAnimation}
        isPlaying={isPlaying}
      />
      <Experience
        visemes={visemes}
        isGenerating={isGenerating}
        audioUrl={audioUrl || ''}
        setIsGenerating={setIsGenerating}
        isVideoVisible={isVideoVisible}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default Hero;

const VideoComponent: React.FC<{
  isVideoVisible: boolean;
  videoUrl: string;
  setIsVideoVisible: (isVisible: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isAudioPlaying: boolean;
  isCancelled: boolean;
}> = ({
  isVideoVisible,
  videoUrl,
  setIsVideoVisible,
  setIsPlaying,
  isAudioPlaying,
  isCancelled,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (isVideoVisible) {
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(false);
    }
  }, [isVideoVisible]);

  useEffect(() => {
    if (isCancelled) {
      setIsVideoPlaying(false);
      setIsVideoVisible(false);
    }
  }, [isCancelled, setIsVideoVisible]);

  const handlePlayPause = (isPlaying: boolean) => {
    setIsVideoPlaying(isPlaying);
    setIsPlaying(isPlaying);
  };

  const handleVideoEnded = () => {
    if (!isAudioPlaying) {
      setIsVideoVisible(false);
    }
  };

  return (
    <div className="z-50 absolute w-auto top-40 right-20">
      {videoUrl && (
        <VideoPlayer
          videoUrl={videoUrl}
          isVisible={isVideoVisible}
          isPlaying={isVideoPlaying}
          onPlayPause={handlePlayPause}
          onVideoEnded={handleVideoEnded}
          forceKeepPlaying={isAudioPlaying}
        />
      )}
      {isVideoVisible && (
        <div className="flex flex-row gap-2 mt-2 w-full items-center justify-center">
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="bg-white text-black text-xs px-4 py-2 rounded-md"
          >
            {isVideoPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => setIsVideoVisible(false)}
            className="bg-white text-black text-xs px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
