import { useEffect, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';

const blobToBase64 = (
  blob: Blob,
  callback: (base64data: string | null) => void
): void => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64data = reader?.result?.toString()?.split(',')[1] ?? null;
    callback(base64data);
  };
  reader.readAsDataURL(blob);
};

export const RecordAudio = () => {
  const [text, setText] = useState('');
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder();

  useEffect(() => {
    if (!recordingBlob) return;
    const type = recordingBlob.type;
    blobToBase64(recordingBlob, (base64data) => {
      if (base64data !== null) {
        getText(base64data, type);
      } else {
        console.error('Failed to convert blob to base64.');
      }
    });
  }, [recordingBlob]);

  const getText = async (base64data: string, type: string) => {
    const body = JSON.stringify({
      audio: base64data,
      type: type,
    });

    try {
      const response = await axios.post('/api/speechToText', body, {
        headers: { 'Content-Type': 'application/json' },
      });
      const transcription = response.data;
      setText(transcription);
    } catch (error) {
      console.error('Error getting transcription:', error);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return { isRecording, startRecording, stopRecording, toggleRecording, text };
};
