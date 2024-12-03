"use client"
import React, { useState, useEffect, useRef } from 'react';

const Videoplayback = ({ autoPlay = true, muted = true, onScroll = (progress: number) => {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div 
      ref={containerRef}
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
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="relative z-10 text-center">
              <span className="text-white text-xl sm:text-2xl font-medium tracking-wider">
                Loading
                <span className="inline-block animate-[bounce_1s_infinite] text-[#F1967D]">.</span>
                <span className="inline-block animate-[bounce_1s_infinite_200ms] text-[#C93F80]">.</span>
                <span className="inline-block animate-[bounce_1s_infinite_400ms] text-[#1CB0CE]">.</span>
              </span>
            </div>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-white text-base sm:text-xl">
              Error loading video. Please refresh the page.
            </div>
          </div>
        )}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay={autoPlay}
            loop
            muted={isMuted}
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoadedData={() => setIsLoading(false)}
            onError={handleVideoError}
          >
            <source 
              src="https://res.cloudinary.com/dkgjl08a5/video/upload/f_auto:video,q_auto/wvz3zbnqxu2tgworqmvg" 
              type="video/mp4" 
            />
          </video>
        </div>
        
        <button
          onClick={handleMuteToggle}
          className="absolute bottom-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors
            max-sm:bottom-8 max-sm:right-8"
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Videoplayback;
