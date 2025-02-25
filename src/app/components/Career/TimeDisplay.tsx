'use client';

import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';
import AnalogClock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { useTheme } from '@/app/context/ThemeContext';

const locations = [
  {
    city: 'New York',
    timezone: 'America/New_York',
    flag: '🗽'
  },
  {
    city: 'London',
    timezone: 'Europe/London',
    flag: '🇬🇧'
  },
  {
    city: 'Tokyo',
    timezone: 'Asia/Tokyo',
    flag: '🗼'
  },
  {
    city: 'Mumbai',
    timezone: 'Asia/Kolkata',
    flag: '🇮🇳'
  }
];

const TimeDisplay: React.FC = () => {
  const { theme } = useTheme();
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      py-12 sm:py-16 md:py-20
      transition-colors duration-300
      w-full
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <h2 className={`
          text-3xl sm:text-4xl md:text-5xl 
          font-bold text-center mb-16
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          relative
        `}>
          <span className="relative z-10">Global Presence</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl transform -skew-y-6"></div>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
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
                <span className="text-2xl">{location.flag}</span>
                <h3 className={`
                  font-medium
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {location.city}
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
                  timezone={location.timezone}
                />
              </div>
              <div className={`
                text-sm mt-1 text-center
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
              `}>
                <Clock
                  format={'MMM DD, YYYY'}
                  timezone={location.timezone}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeDisplay;