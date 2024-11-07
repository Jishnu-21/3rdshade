import React from 'react';
import Image from 'next/image';

interface StoryCardProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, description, date, imageUrl }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-x-4">
      <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 relative overflow-hidden rounded-lg">
        <Image 
          src={imageUrl} 
          alt={title} 
          layout="fill" 
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col mt-3 sm:mt-0">
        <h3 className="text-xl sm:text-lg font-bold mb-2 sm:mb-3">{title}</h3>
        <p className="text-base sm:text-sm text-gray-600 mb-2 sm:mb-1">{description}</p>
        <p className="text-sm sm:text-xs text-gray-400">Added {date}</p>
      </div>
    </div>
  );
};

export default StoryCard;