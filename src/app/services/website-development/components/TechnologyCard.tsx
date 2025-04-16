"use client"

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

interface TechnologyCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ name, description, imageUrl }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${
      theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-100'
    } py-16 px-4 transition-colors duration-300`}>
      <div className="mb-4 h-40 relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        {name}
      </h3>
      <p className={`${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );
};

export default TechnologyCard;