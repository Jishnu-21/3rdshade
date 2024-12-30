"use client"
import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';

const MoreInfo = () => {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme === 'dark' 
        ? 'bg-white text-black' 
        : 'bg-black text-white'
      } 
      rounded-lg 
      py-8 sm:py-12 md:py-16 lg:py-20 
      px-4 sm:px-6 md:px-8 
      text-center 
      mb-8 sm:mb-10 md:mb-12 lg:mb-16 
      mx-4 sm:mx-6 md:mx-8 lg:mx-auto 
      max-w-6xl
      transition-colors duration-300
    `}>
      <h2 className={`
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-bold 
        mb-6 sm:mb-8 md:mb-10 lg:mb-14
        ${theme === 'dark' ? 'text-black' : 'text-white'}
      `}>
       From business to iconic brand
      </h2>
      <Link href="/contact-us" className="inline-block">
        <button className={`
          ${theme === 'dark' 
            ? 'bg-black text-white hover:shadow-[0_0_10px_3px_rgba(0,255,255,0.6)]' 
            : 'bg-white text-black hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.6)]'
          }
          text-base sm:text-lg 
          px-8 sm:px-12 md:px-16 lg:px-24 
          py-2 sm:py-2.5 md:py-3 
          rounded-[21px] font-medium 
          transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${theme === 'dark' 
            ? 'focus:ring-black focus:ring-offset-white' 
            : 'focus:ring-white focus:ring-offset-black'
          }
          active:scale-95
          transform hover:-translate-y-0.5
        `}>
          Let's make it happen
        </button>
      </Link>
    </div>
  );
};

export default MoreInfo;