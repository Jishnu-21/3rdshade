"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface JobListingProps {
  title: string;
}

const JobListing: React.FC<JobListingProps> = ({ title }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`job-listing flex items-center justify-between py-6 px-6 rounded-lg
      ${theme === 'dark' 
        ? 'bg-gray-900 hover:bg-gray-800' 
        : 'bg-gray-100 hover:bg-gray-200'} 
      transition-all duration-200`}
    >
      <h3 className={`text-xl font-bold
        ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        {title}
      </h3>
      
      <div className="flex items-center space-x-4">
        <button className={`${theme === 'dark' 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-600 hover:text-black'} 
          transition-colors duration-200`}
        >
          View details ▼
        </button>
        
        <button className={`px-6 py-3 rounded-full transition-colors duration-200
          ${theme === 'dark' 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-black text-white hover:bg-gray-800'}`}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobListing;