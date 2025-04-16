"use client"

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const CareerHero = () => {
  const { theme } = useTheme();

  const scrollToOpenings = (e: React.MouseEvent) => {
    e.preventDefault();
    const openingsSection = document.getElementById('benefits-section');
    if (openingsSection) {
      openingsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={`relative ${theme === 'dark' ? 'bg-black' : 'bg-white'} mt-[70px] md:mt-[80px]`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px] py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="text-start pb-6 sm:pb-8 md:pb-10">
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} 
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[60px] 2xl:text-[70px] 
            font-bold pb-4 leading-[1.1] md:leading-[1.2] 
            max-w-[800px] md:max-w-[90%] lg:max-w-[800px]
            tracking-tight`}
          >
            Join us and add Shade to our growing Canvas!
          </h2>
          <div className="inline-block relative p-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full animate-border-move bg-[length:200%_200%]">
            <button 
              onClick={scrollToOpenings}
              className={`relative ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} 
                text-base sm:text-lg font-semibold 
                py-2.5 sm:py-3 px-6 sm:px-8 rounded-full 
                transition-all duration-200 
                hover:bg-opacity-90 hover:scale-105
                active:scale-95
                whitespace-nowrap`}
            >
              Explore our jobs
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
        <Image 
          src="/careerHero.jpg" 
          alt="3RD SHADE team" 
          fill
          style={{ objectFit: "cover" }}
          className="transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 85vw, 70vw"
          priority
        />
        <div className={`absolute -top-[100px] sm:-top-[120px] md:-top-[131px] right-4 sm:right-6 md:right-8 lg:right-[122px] 
          w-[150px] sm:w-[180px] md:w-[220px] lg:w-[262px] 
          h-[150px] sm:h-[180px] md:h-[220px] lg:h-[262px] 
          group transition-transform duration-300 hover:scale-105`}>
          <div className={`relative w-full h-full ${theme === 'dark' ? 'bg-white' : 'bg-black'} 
            rounded-full flex items-center justify-center 
            transition-transform duration-300 ease-in-out group-hover:scale-110
            ${theme === 'dark' ? 'shadow-lg' : 'border border-gray-800'}`}
          >
            <div className={`${theme === 'dark' ? 'text-black' : 'text-white'} text-center`}>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light">↓</span>
            </div>
            <div className="absolute inset-0 rounded-full">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="9">
                  <textPath 
                    xlinkHref="#circle" 
                    startOffset="0%" 
                    className={`${theme === 'dark' ? 'fill-black' : 'fill-white'} text-[7px] sm:text-[8px] md:text-[9px]`}
                  >
                    Our Culture &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Our Culture &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Our Culture &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
