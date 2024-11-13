"use client"

import React, { useRef, useState, useEffect } from 'react';

const ServiceLine: React.FC = () => {
  // Reduce number of items for mobile to prevent performance issues
  const getServiceCount = () => (window.innerWidth < 768 ? 13 : 26);
  const [services, setServices] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setServices(Array(getServiceCount()).fill(""));
    };

    // Initial setup
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const currentContainer = containerRef.current;

    if (currentContainer) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              setIsPaused(true);
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                setIsPaused(false);
              }, 200);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
              window.removeEventListener('scroll', handleScroll);
              clearTimeout(scrollTimeout);
            };
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(currentContainer);

      return () => {
        observer.unobserve(currentContainer);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full pt-0 sm:pt-[60px] md:pt-[100px] pb-2 sm:pb-4 md:pb-8 px-2 sm:px-3 md:px-6 bg-white overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Title Container - adjusted top margin for mobile */}
        <div className="w-3/4 sm:w-1/2 md:w-1/3 h-8 sm:h-10 md:h-18 border border-gray-300 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-8 mt-4 sm:mt-0">
          <h2 className="text-sm sm:text-base md:text-xl font-bold whitespace-nowrap">
            <span className="text-pink-500">Our </span>
            <span className="text-purple-500">services </span>
            <span className="text-blue-500">line</span>
          </h2>
        </div>
        
        {/* Marquee Lines Container */}
        <div className="w-full flex flex-col gap-2 sm:gap-3 md:gap-6 mt-2 sm:mt-3 md:mt-4">
          {[0, 1, 2].map((rowIndex) => (
            <div 
              key={rowIndex} 
              className={`flex ${rowIndex % 2 === 0 ? 'animate-marquee-right' : 'animate-marquee-left'}`}
              style={{ 
                animationPlayState: isPaused ? 'paused' : 'running',
                animationDuration: `${window.innerWidth < 768 ? '15s' : '30s'}`,
              }}
            >
              {services.map((_, index) => (
                <div 
                  key={index} 
                  className={`
                    h-6 sm:h-8 md:h-12 
                    border border-gray-300 
                    rounded-full 
                    flex-shrink-0 
                    mx-1 sm:mx-1.5 md:mx-2
                    ${rowIndex === 0 ? 'w-[30vw] sm:w-[25vw] md:w-[15%]' : ''}
                    ${rowIndex === 1 ? 'w-[35vw] sm:w-[30vw] md:w-[18%]' : ''}
                    ${rowIndex === 2 ? 'w-[40vw] sm:w-[35vw] md:w-[20%]' : ''}
                  `}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceLine;