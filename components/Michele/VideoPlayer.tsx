import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  isVisible: boolean;
  isPlaying: boolean;
  onPlayPause: (isPlaying: boolean) => void;
  onVideoEnded: () => void;
  forceKeepPlaying: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isVisible,
  isPlaying,
  onPlayPause,
  onVideoEnded,
  forceKeepPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = forceKeepPlaying;

    const handlePlay = () => {
      setIsAnimating(true);
      onPlayPause(true);
    };

    const handlePause = () => {
      setIsAnimating(false);
      onPlayPause(false);
    };

    const handleEnded = () => {
      setIsAnimating(false);
      if (!forceKeepPlaying) {
        onVideoEnded();
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [forceKeepPlaying, onPlayPause, onVideoEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying && isVisible) {
      video.play().catch(() => {
        // Autoplay was prevented, handle if needed
      });
    } else {
      video.pause();
    }
  }, [isPlaying, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className={`w-[55vw] h-auto rounded-2xl border-8 ${
        isAnimating ? 'animate-border-color' : 'border-green-500'
      }`}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
