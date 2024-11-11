"use client"
import React, { useState, useEffect } from 'react';

const Videoplayback = ({ autoPlay = true, muted = true }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = 'Video Editor Showreel _ Portfolio _ 2023 _ video editor showreel portfolio.mp4';
    video.preload = 'auto';
    
    video.addEventListener('loadeddata', () => {
      setIsLoading(false);
    });

    return () => {
      video.removeEventListener('loadeddata', () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-x-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 bg-black flex items-center justify-center min-h-[600px]">
          <div className="absolute inset-0 bg-black"></div>
          <div className="relative z-10 text-center">
            <span className="text-white text-2xl font-medium tracking-wider">
              Loading
              <span className="inline-block animate-[bounce_1s_infinite] text-[#F1967D]">.</span>
              <span className="inline-block animate-[bounce_1s_infinite_200ms] text-[#C93F80]">.</span>
              <span className="inline-block animate-[bounce_1s_infinite_400ms] text-[#1CB0CE]">.</span>
            </span>
          </div>
        </div>
      )}
      <video
        src='Video Editor Showreel _ Portfolio _ 2023 _ video editor showreel portfolio.mp4'
        autoPlay={autoPlay}
        muted={muted}
        loop
        playsInline
        className={`w-full h-full object-cover min-h-[600px] ${isLoading ? 'hidden' : 'block'}`}
        onLoadedData={() => setIsLoading(false)}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Videoplayback;
