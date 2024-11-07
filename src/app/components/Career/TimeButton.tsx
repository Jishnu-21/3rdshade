"use client"

import React, { useState } from 'react';

interface TimeButtonProps {
  label: string;
  time: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ label, time }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className={`bg-white text-black border border-gray-300 rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base transition-all duration-300 overflow-hidden relative w-full sm:w-auto ${isHovered ? 'bg-black text-white border-gray-700' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`block transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        {label}: {time}
      </span>
      <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        Contact us
      </span>
    </button>
  );
};

export default TimeButton;
