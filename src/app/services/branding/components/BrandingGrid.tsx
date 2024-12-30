'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const brandFeatures = [
    { id: 1, title: 'Logo' },
    { id: 2, title: 'Colour Palette' },
    { id: 3, title: 'Brand Name' },
    { id: 4, title: 'Tagline' },
    { id: 5, title: 'Brand Story' },
    { id: 6, title: 'Typography' },
    { id: 7, title: 'Tone and Voice' },
    { id: 8, title: 'Packaging and Labeling' },
    { id: 9, title: 'Brand Guideline' },
  ];

const BrandingGrid: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`pb-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'} py-20`}>
      <div className="container mx-auto px-4 md:px-[122px]">
        <div className="max-w-2xl mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Our Branding Toolkit
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
          {brandFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <svg 
                  className="w-3 h-3 text-white" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M10 3L4.5 8.5L2 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingGrid; 