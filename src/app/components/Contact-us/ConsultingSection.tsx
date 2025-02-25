"use client"
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import MoreInfo from './MoreInfo';

const ConsultingSection = () => {
  const { theme } = useTheme();


  return (
    <div className={`w-full py-16 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} ease-in-out`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
      </div>
      <MoreInfo />
    </div>
  );
};

export default ConsultingSection;
