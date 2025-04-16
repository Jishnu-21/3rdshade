'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const services = [
  {
    title: 'The Importance of E-commerce Listing',
    description: 'E-commerce listings are your online storefront, showcasing your products to the world, acting as your first impression, attracting attention, building trust, and ultimately converting browsers into buyers.',
    features: [
      'Serves as the Digital Storefront', 'A great way to introduce Brands to the audience', 'Audience today demands a trusted Digital Channels',
      'Expanded Customer Reaction', 'Easy use', 'Increased Visibility'
    ]
  }
];

const BrandingGrid: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      py-12 sm:py-16 md:py-20 2xl:py-28
      transition-colors duration-300
      w-full
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
        {services.map((service, serviceIndex) => (
          <div key={serviceIndex} className="mb-20 last:mb-0 2xl:mb-32">
            <div className="max-w-4xl 2xl:max-w-[1400px]">
              <h2 className={`
                text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl
                font-bold mb-6 2xl:mb-10
                ${theme === 'dark' ? 'text-white' : 'text-black'}
              `}>
                {service.title}
              </h2>
              <p className={`
                text-lg md:text-xl 2xl:text-2xl mb-16 2xl:mb-24
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                max-w-3xl 2xl:max-w-[1200px]
              `}>
                {service.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 2xl:gap-y-10 2xl:gap-x-16">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 2xl:w-8 2xl:h-8 rounded-full bg-[#955DDC] flex items-center justify-center mr-4">
                      <svg 
                        className="w-4 h-4 2xl:w-5 2xl:h-5 text-white" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className={`
                      text-lg 2xl:text-2xl
                      ${theme === 'dark' ? 'text-gray-300' : 'text-black'}
                      transition-colors duration-300
                    `}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandingGrid;