import React from 'react';
import { StopCircle } from 'lucide-react';
import LoadingSpinner from './loadingSpinner';

const AudioButton = ({
  isRecording,
  startRecording,
  stopRecording,
  isGenerating,
  stopAudioAndAnimation,
  isPlaying,
}: {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  isGenerating: boolean;
  stopAudioAndAnimation: () => void;
  isPlaying: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 pl-4">
      {/* <input
    className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
    placeholder="Type a message..."
    ref={input}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        sendMessage(input.current.value);
      }
    }}
  />
  <button
    onClick={sendMessage}
    className={`bg-white/90 hover:bg-white text-black p-4 px-10 font-semibold uppercase rounded-md ${
      loading ? 'cursor-not-allowed opacity-30' : ''
    }`}
  >
    Send
  </button> */}
      {isPlaying && (
        <button
          onClick={stopAudioAndAnimation}
          className="bg-white rounded-full text-black text-xs shadow-lg group hover:bg-red-500 shadow-black/40 cursor-pointer h-10 w-10 flex flex-col items-center justify-center"
        >
          <div className="w-4 h-4 bg-red-500 rounded-sm group-hover:bg-white"></div>
        </button>
      )}
      {isGenerating ? (
        <div className="flex items-center justify-center bg-white h-16 w-16 rounded-full border border-neutral-300  overflow-hidden">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        <div
          onMouseDown={startRecording}
          onMouseUp={() => {
            stopRecording();
          }}
          className="self-center shadow-lg hover:border-black shadow-black/40 cursor-pointer text-black sm:hover:text-white transition-colors duration-100 bg-green-400 hover:bg-green-500 rounded-full border-neutral-300 flex items-center justify-center  h-24 w-24 overflow-hidden hover:text-black"
        >
          {isRecording ? (
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-green-500 w-full h-full p-1"
            >
              <path
                fill="white"
                d="M19 12c0 3.86-3.14 7-7 7s-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7"
              />
            </svg>
          ) : (
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2q1.25 0 2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16q2.075 0 3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21z"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioButton;
