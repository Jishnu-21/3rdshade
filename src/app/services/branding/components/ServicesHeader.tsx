'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const ServicesHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`services-header min-h-screen flex items-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="container px-4 md:px-[122px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16">
        <h1 className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-5xl md:text-6xl lg:text-[64px] font-bold`}>
          Branding
        </h1>
        <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'} max-w-md`}>
          Branding is like writing the character and personality of your business. It's everything from your catchy company name, eye-catching logo, colors, voice, tone, and so much more. If you want to differentiate your business from others and leave a memorable impression on your consumers then this is it!
        </p>
      </div>
    </div>
  );
};

export default ServicesHeader;