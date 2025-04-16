"use client"

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FamilyNotCompany() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col lg:flex-row w-full 
      ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="w-full lg:w-1/2 xl:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto relative
        overflow-hidden group">
         <DotLottieReact
          src="https://lottie.host/8950a2ba-95e3-43ca-b6e6-f15691d29085/00SD8IcZbv.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center 
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
        py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col max-w-[600px]">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] 
            font-bold mb-6 sm:mb-8 md:mb-10
            leading-[1.1]
            ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
         Grow with Us
         </h2>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl 
            leading-relaxed
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
          >
           We realize what our mates expect from us. We are a team and every victory, and every achievement is a collective effort. We believe in a Win-Win situation. You Grow We Grow, and the other way around. 
          </p>
        </div>
      </div>
    </div>
  )
}
