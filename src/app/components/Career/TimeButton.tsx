'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import Clock from 'react-live-clock';
import AnalogClock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './clock.css';
import moment from 'moment-timezone';

interface TimeButtonProps {
  timezone: string;
  city: string;
  flag: string;
}

const TimeButton: React.FC<TimeButtonProps> = ({ timezone, city, flag }) => {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeForZone = () => {
    const time = moment(currentTime).tz(timezone);
    const hours = time.hours();
    const minutes = time.minutes();
    const seconds = time.seconds();
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  };

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
        <div className="w-32 h-32">
          <AnalogClock
            value={getTimeForZone()}
            renderNumbers={true}
            size={128}
            className={theme === 'dark' ? 'react-clock--dark-mode' : ''}
          />
        </div>
      </div>

      <div className={`
        text-center text-2xl font-mono
        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
      `}>
        <Clock
          format={'HH:mm:ss'}
          ticking={true}
          timezone={timezone}
        />
      </div>
    </div>
  );
};

export default TimeButton;
