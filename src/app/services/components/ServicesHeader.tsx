'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ServicesHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`services-header ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-16 sm:py-24 md:py-32 lg:pt-[180px] lg:pb-[180px]`}>
      <div className="container px-4 md:px-[122px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16">
        <h1 className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-5xl md:text-6xl lg:text-[64px] font-bold`}>
          Services
        </h1>
        <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'} max-w-md`}>
        Tweets, Posts, Pixels, Clicks, Conversions- we do all things Digital. 
        </p>
      </div>
    </div>
  );
};

export default ServicesHeader;