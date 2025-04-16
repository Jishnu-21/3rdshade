'use client';

import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';
import AnalogClock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './clock.css';
import { useTheme } from '@/app/context/ThemeContext';
import moment from 'moment-timezone';

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
    flag: '🇯🇵'
  },
  {
    city: 'Mumbai',
    timezone: 'Asia/Kolkata',
    flag: '🇮🇳'
  }
];

const TimeDisplay: React.FC = () => {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeForZone = (timezone: string) => {
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
    <section className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      py-12 sm:py-16 md:py-20
      transition-colors duration-300
      w-full
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <h2 className={`
          text-3xl sm:text-4xl md:text-5xl 
          font-bold text-center mb-8 sm:mb-16
          ${theme === 'dark' ? 'text-white' : 'text-black'}
        `}>
          Global Presence
        </h2>

        <div className="flex sm:block overflow-x-auto sm:overflow-visible pb-4 sm:pb-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 snap-x">
            {locations.map((location, index) => {
              const timeForZone = getTimeForZone(location.timezone);
              return (
                <div
                  key={index}
                  className={`
                    flex-shrink-0 w-[85vw] sm:w-auto
                    snap-center
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
                    <div className="w-32 h-32">
                      <AnalogClock
                        value={timeForZone}
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
                      timezone={location.timezone}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeDisplay;