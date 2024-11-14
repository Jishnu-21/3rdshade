"use client"
import React, { useState, useEffect, useRef } from 'react';

const Videoplayback = ({ autoPlay = true, muted = true, onScroll = (progress: number) => {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportHeight);
      setScrollProgress(progress);
      onScroll(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  return (
    <div 
      ref={videoRef}
      className="relative h-screen bg-black"
    >
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden bg-black"
        style={{
          zIndex: 50,
          transform: `translateY(${Math.max(0, 100 - (scrollProgress * 100))}vh)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
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
          className={`w-full h-full object-cover ${isLoading ? 'hidden' : 'block'}`}
          onLoadedData={() => setIsLoading(false)}
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Videoplayback;
