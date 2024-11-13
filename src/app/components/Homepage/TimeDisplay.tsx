"use client"

import React, { useState, useEffect } from 'react';
import TimeButton from './TimeButton';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2 md:space-x-4 lg:space-x-8 px-4 sm:px-0">
      <TimeButton label="India" time={formattedTime} />
      <TimeButton label="London" time={formattedTime} />
      <TimeButton label="Dubai" time={formattedTime} />
      <TimeButton label="Amsterdam" time={formattedTime} />
    </div>
  );
};

export default TimeDisplay;
