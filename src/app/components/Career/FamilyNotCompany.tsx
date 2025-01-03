"use client"

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext';

export default function FamilyNotCompany() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col lg:flex-row w-full 
      ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <div className="w-full lg:w-1/2 xl:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto relative
        overflow-hidden group">
        <Image
          src="/familynot.webp"
          alt="3RD SHADE team culture"
          fill
          style={{ objectFit: "cover" }}
          className={`object-cover w-full h-full 
            ${theme === 'dark' ? 'opacity-90' : 'opacity-100'}
            transition-all duration-500 group-hover:scale-105`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex-1 flex items-center justify-center 
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
        py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col max-w-[600px]">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] 
            font-bold mb-6 sm:mb-8 md:mb-10
            leading-[1.1]
            ${theme === 'dark' ? 'text-black' : 'text-white'}`}
          >
         Grow with Us
         </h2>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl 
            leading-relaxed
            ${theme === 'dark' ? 'text-gray-800' : 'text-gray-300'}`}
          >
           We realize what our mates expect from us. We are a team and every victory, and every achievement is a collective effort. We believe in a Win-Win situation. You Grow We Grow, and the other way around. 
          </p>
        </div>
      </div>
    </div>
  )
}
