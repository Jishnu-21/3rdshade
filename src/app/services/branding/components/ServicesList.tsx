'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const services = [
  'Branding', 'Website Development', 'Logo Design',
  'UI/UX Design', 'Packaging',
  'Product Feature Videos','Mobile App Design',  'Digital Marketing', 'Illustrations & Iconography',
  'Consulting Services', 'Motion Design Systems', 'Nykaa Listing',
  'Amazon Listing', 'Flipkart Listing', 'Myntra Listing'
];

const ServicesList: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      py-12 sm:py-16 md:py-20
      transition-colors duration-300
      w-full
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className={`
          text-3xl sm:text-4xl md:text-5xl 
          font-bold text-center mb-16
          ${theme === 'dark' ? 'text-white' : 'text-black'}
        `}>
         Services that Spark Magic
        </h2>
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-start">
                <div className="w-2 h-2 bg-[#955DDC] rounded-full mr-4 flex-shrink-0"></div>
                <span className={`
                  text-base md:text-lg 
                  ${theme === 'dark' ? 'text-gray-300' : 'text-black'}
                  transition-colors duration-300
                `}>
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;