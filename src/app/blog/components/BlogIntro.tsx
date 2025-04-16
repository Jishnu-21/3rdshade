"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const BlogIntro: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`px-4 sm:px-8 md:px-16 lg:px-24 pt-6 sm:pt-8 md:pt-10 lg:pt-12 
      pb-12 sm:pb-16 md:pb-20 lg:pb-24 text-start 
      ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">
        Goals, Laughter, and Teamwork: 3RD SHADE&apos;s Inogration
      </h2>
      <p className={`text-base sm:text-lg mb-6 sm:mb-8
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
      >
        We understand the nuances of websites and apps owing to our focus on user-centric design
      </p>
      <button className={`px-8 sm:px-10 md:px-12 py-2 sm:py-3 rounded-[22px] 
        border border-red-500 text-sm sm:text-base transition-colors duration-300
        ${theme === 'dark' 
          ? 'bg-white text-black hover:bg-black hover:text-white' 
          : 'bg-black text-white hover:bg-white hover:text-black'}`}
      >
        Get in touch
      </button>
    </div>
  );
};

export default BlogIntro;