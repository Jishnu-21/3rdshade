'use client';

import React from 'react';
import StoryCard from './StoryCard';
import { useTheme } from '@/app/context/ThemeContext';

const RecentStories: React.FC = () => {
  const { theme } = useTheme();

  const stories = [
    {
      title: "Life At 3RD SHADE",
      description: "From 3rd shade's UI UX Intern to Full-Time Product Designer",
      date: "10th Jul 2024",
      imageUrl: "/life1.jpg"
    },
    // ... other stories with different images
  ];

  return (
    <section className={`px-4 sm:px-8 md:px-16 lg:px-24 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
      ${theme === 'dark' ? 'text-white' : 'text-black'}
      transition-colors duration-300`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-12">
        Recent Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-x-8 md:gap-y-12">
        {[...Array(8)].map((_, index) => (
          <StoryCard
            key={index}
            title="Life At 3RD SHADE"
            description="From 3rd shade's UI UX Intern to Full-Time Product Designer"
            date="10th Jul 2024"
            imageUrl={`/life${(index % 4) + 1}.jpg`}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentStories;