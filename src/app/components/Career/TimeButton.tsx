'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import Clock from 'react-live-clock';
import AnalogClock from 'react-clock';
import 'react-clock/dist/Clock.css';

interface TimeButtonProps {
  timezone: string;
  city: string;
  flag: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ timezone, city, flag }) => {
  const { theme } = useTheme();
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        p-6 rounded-xl
        ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-gray-50'}
        backdrop-blur-sm
        transition-all duration-300
        hover:scale-105
        group
        border border-transparent
        ${theme === 'dark' 
          ? 'hover:border-purple-500/20' 
          : 'hover:border-purple-500/30'
        }
        shadow-sm
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{flag}</span>
        <h3 className={`
          font-medium
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
        `}>
          {city}
        </h3>
      </div>

      <div className="flex justify-center mb-4">
        <div className={`
          ${theme === 'dark' ? 'opacity-90' : 'opacity-100'}
          transition-opacity duration-300
          group-hover:opacity-100
          [&_.react-clock]:scale-[0.8]
          [&_.react-clock__face]:${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}
          [&_.react-clock__hand__body]:${theme === 'dark' ? 'bg-white' : 'bg-black'}
          [&_.react-clock__second-hand__body]:bg-[#955DDC]
          [&_.react-clock__mark__body]:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'}
        `}>
          <AnalogClock
            value={value}
            size={150}
            renderNumbers={false}
          />
        </div>
      </div>

      <div className={`
        text-2xl font-bold text-center
        ${theme === 'dark' ? 'text-white' : 'text-black'}
        transition-colors duration-300
        font-mono
      `}>
        <Clock
          format={'HH:mm:ss'}
          ticking={true}
          timezone={timezone}
        />
      </div>
      <div className={`
        text-sm mt-1 text-center
        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
      `}>
        <Clock
          format={'MMM DD, YYYY'}
          timezone={timezone}
        />
      </div>
    </div>
  );
};

export default TimeButton;
