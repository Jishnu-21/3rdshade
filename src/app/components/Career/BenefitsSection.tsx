"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const BenefitsSection = () => {
  const { theme } = useTheme();

  return (
    <section className={`benefits-section ${theme === 'light' ? 'bg-black' : 'bg-white'} 
      ${theme === 'dark' ? 'text-black' : 'text-white'} 
      py-12 sm:py-16 md:py-20 lg:py-24`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[600px]">
            We put you first.<br />Always.
          </h2>
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden 
            text-base sm:text-lg font-semibold rounded-full group 
            bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 
            hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 
            hover:text-white focus:ring-4 focus:outline-none 
            focus:ring-purple-200 dark:focus:ring-purple-800
            w-full lg:w-auto"
          >
            <span className={`relative px-6 sm:px-8 py-2.5 sm:py-3 transition-all ease-in duration-75 
              ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full 
              group-hover:bg-opacity-0 w-full lg:w-auto text-center`}
            >
              Explore our jobs
            </span>
          </button>
        </div>

        {/* Gradient Divider */}
        <div className="h-1 sm:h-1.5 md:h-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
          mb-8 sm:mb-12 md:mb-16"
        ></div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {['Health Insurance', 'Hybrid culture', 'Upskill Programs'].map((benefit, index) => (
            <div key={index} className="benefit-item p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                {benefit}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} 
                text-sm sm:text-base md:text-lg leading-relaxed`}
              >
                Like our design, the qualities that sets us apart are simple
                and yet amazing. We won&apos;t promise you the world when you
                come to work with us, but we will commit to uphold the
                values that make 3rd shade a great place to work at.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
