"use client"

import React, { useState, useEffect } from 'react';
import TimeButton from './TimeButton';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  // Don't render until component is mounted on client
  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center items-center 
      gap-4 sm:gap-0 sm:space-x-2 md:space-x-4 lg:space-x-8 
      px-4 sm:px-0">
      {[
        { label: "India", time: formattedTime },
        { label: "London", time: formattedTime },
        { label: "Dubai", time: formattedTime },
        { label: "Amsterdam", time: formattedTime }
      ].map((item, index) => (
        <TimeButton 
          key={item.label}
          label={item.label} 
          time={item.time}
        />
      ))}
    </div>
  );
};

export default TimeDisplay;