'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ServicesHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`services-header ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-16 sm:py-24 md:py-32 lg:pt-[180px] lg:pb-[180px]`}>
      <div className="container px-4 md:px-[122px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16">
        <h2 className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-5xl md:text-6xl lg:text-[64px] font-bold`}>
          Performance Marketing
        </h2>
        <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'} max-w-md`}>
        Clicks, Leads, Sales, ..ohh and so much more. It is Digital advertising that hunts down your audience and tracks exactly how well your ads are working. It's about using smart targeting to reach the right people and measure every single result. Think of it like a marketing sniper - precise, focused, and hitting exactly where it matters!  
        </p>
      </div>
    </div>
  );
};

export default ServicesHeader;