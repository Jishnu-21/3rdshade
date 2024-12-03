'use client'

import React from 'react';
import TimeDisplay from './TimeDisplay';
import { useTheme } from '@/app/context/ThemeContext';

const FooterLabel = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      pt-16 px-4 pb-32 rounded-b-[40px] 
      transition-colors duration-500 ease-in-out`}
    >
      <TimeDisplay />
    </div>
  );
};

export default FooterLabel;