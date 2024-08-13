'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import AudioButton from './AudioButton';

export const HeroUI = ({
  cameraZoomed,
  setCameraZoomed,
  isRecording,
  startRecording,
  stopRecording,
  isGenerating,
  stopAudioAndAnimation,
  isPlaying,
}: {
  cameraZoomed: boolean;
  setCameraZoomed: (value: boolean) => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isGenerating: boolean;
  stopAudioAndAnimation: () => void;
  isPlaying: boolean;
}) => {
  return (
    <div className="absolute h-full w-full inset-0 z-10 flex justify-between flex-col">
      {/* <ZoomButtonwww
        cameraZoomed={cameraZoomed}
        setCameraZoomed={setCameraZoomed}
      /> */}
      <div className="flex items-center justify-center gap-2 z-30 mx-auto absolute bottom-28 w-full">
        <AudioButton
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          isGenerating={isGenerating}
          stopAudioAndAnimation={stopAudioAndAnimation}
          isPlaying={isPlaying}
        />
      </div>

      <div className="flex items-center justify-center gap-2 group z-30 mx-auto absolute bottom-0 w-full">
        <Link href="/dashboard/analytics">
          <button className="shadow-lg text-md hover:text-lg shadow-black/40 cursor-pointer transition-all duration-100 rounded-b-none rounded-t-3xl  hover:bg-black flex items-center justify-center bg-black hover:h-20 h-16 w-fit text-white p-8 border-2 border-black">
            Dashboard
          </button>
        </Link>
      </div>

      {/* <div className="w-full flex flex-col justify-between h-full absolute z-20 p-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-black font-bold text-5xl">PREVENTA</h1>
          <h3>AI Surveillance for a Safer Tomorrow</h3>
        </div>
      </div> */}
    </div>
  );
};
