"use client"

import React, { useRef, useState, useEffect } from 'react';

const ServiceLine: React.FC = () => {
  const services = Array(26).fill(""); // Doubled the services for smooth looping
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const handleScroll = () => {
            setIsPaused(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              setIsPaused(false);
            }, 200); // 1 second pause after scrolling stops
          };

          window.addEventListener('scroll', handleScroll);

          return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
          };
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full pt-[100px] pb-16 px-6 bg-white overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="w-1/3 h-12 border border-gray-300 rounded-full flex items-center justify-center mb-8">
          <h2 className="text-xl font-bold">
            <span className="text-pink-500">Our </span>
            <span className="text-purple-500">services </span>
            <span className="text-blue-500">line</span>
          </h2>
        </div>
        
        <div className="w-full flex flex-col gap-6 mt-4">
          {[0, 1, 2].map((rowIndex) => (
            <div 
              key={rowIndex} 
              className={`flex ${rowIndex % 2 === 0 ? 'animate-marquee-right' : 'animate-marquee-left'}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {services.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-12 border border-gray-300 rounded-full flex-shrink-0 mx-2
                    ${rowIndex === 0 ? 'w-[15%]' : ''}
                    ${rowIndex === 1 ? 'w-[18%]' : ''}
                    ${rowIndex === 2 ? 'w-[20%]' : ''}`}
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