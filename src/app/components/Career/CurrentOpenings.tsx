"use client"

import React from 'react';
import JobListing from './JobListingProps';
import { useTheme } from '@/app/context/ThemeContext';
import { jobData } from './jobData';

const CurrentOpenings: React.FC = () => {
  const { theme } = useTheme();
  
  // Get available job titles from jobData
  const openings = Object.keys(jobData);

  return (
    <section id="current-openings" className={`current-openings py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 md:px-[122px]">
        <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-5xl md:text-6xl font-bold pb-4`}>
          Current openings
        </h2>
        <p className={`text-lg pb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Grow with us at 3RD SHADE - where creativity and passion thrive.
        </p>
        
        <div className={`job-listings ${theme === 'dark' ? 'text-white' : 'text-black'} space-y-4`}>
          {openings.map((job) => (
            <JobListing key={job} title={job} />
          ))}
        </div>
        
        <p className={`mt-12 text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>
          If your profile is not listed above, send your resume{' '}
          <a 
            href="mailto:info@3rdshade.in" 
            className={`underline font-semibold ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} 
              transition-colors duration-200`}
          >
            info@3rdshade.in
          </a>
        </p>
      </div>
    </section>
  );
};

export default CurrentOpenings;
