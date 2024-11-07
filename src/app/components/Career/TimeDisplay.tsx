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
    <div className="flex justify-center items-center space-x-8 bg-white text-black p-4"> {/* Ensured bg is white and text is black */}
      <TimeButton label="India" time={formattedTime} />
      <TimeButton label="London" time={formattedTime} />
      <TimeButton label="Dubai" time={formattedTime} />
      <TimeButton label="Amsterdam" time={formattedTime} />
    </div>
  );
};

export default TimeDisplay;