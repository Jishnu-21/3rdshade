"use client";

import React from 'react';

interface TimeButtonProps {
  label: string;
  time: string;
  className?: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ label, time, className }) => {
  React.useEffect(() => {
    // Any window-dependent code here
  }, []);

  return (
    <button 
      className={`
        bg-black text-white border border-gray-700 rounded-full 
        px-8 py-3 text-base
        overflow-hidden relative group
        hover:bg-white hover:text-black hover:border-white
        transition-all duration-200 ease-in-out
        ${className || ''}
      `}
    >
      <div className="relative z-10">
        <span className="block group-hover:opacity-0 transition-opacity duration-200">
          {label}: {time}
        </span>
        <span className="font-bold absolute inset-0 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Contact us
        </span>
      </div>
    </button>
  );
};

export default TimeButton;
