"use client"
import React from 'react';
import MoreInfo from './MoreInfo';
import TimeDisplay from './TimeDisplay';
import { useTheme } from '@/app/context/ThemeContext';

const MoreInfoWithTime = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
      pt-8 sm:pt-12 md:pt-16 
      px-4 sm:px-6 md:px-8 
      pb-16 sm:pb-24 md:pb-32 
      rounded-b-[20px] sm:rounded-b-[30px] md:rounded-b-[40px]
      relative
      transition-colors duration-300
      ${theme === 'dark' ? 'shadow-lg' : 'shadow-md'}
    `}>
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        <MoreInfo />
        <div className="mt-8 sm:mt-12 md:mt-16">
          <TimeDisplay />
        </div>
      </div>
    </div>
  );
};

export default MoreInfoWithTime;