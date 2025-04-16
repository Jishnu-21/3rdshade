'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

function BrandingServices() {
  const { theme } = useTheme();

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      description: "No two brands are the same, and neither are the solutions. There’s always a Unique Selling Proposition that makes a brand different. We work closely with our clients, intake their unique needs and goals, crafting a personalized branding strategy with our expertise."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      description: "We have a deep understanding of every industry and its ever-changing dynamics. We ensure that the branding solutions provided are not only current but also forward-thinking, helping businesses stay relevant in competitive markets."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke={theme === 'dark' ? '#D1D5DB' : '#4B5563'}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
      description: "Storytelling is at the heart of our strategy. We weave narratives via words and graphics that resonate emotionally with the audience, narrating the vision, story, and philosophy of the brand, that audience can feel and be part of."
    }
  ];

  return (
    <>
      <div className={`
        ${theme === 'dark' ? 'bg-black' : 'bg-[#F3F3F3]'} 
        py-12 px-4 sm:px-6 lg:px-8
        transition-colors duration-300
        w-full
      `}>
        <div className="container mx-auto">
          <h2 className={`
            text-4xl sm:text-5xl md:text-6xl 
            font-bold text-center mb-16
            ${theme === 'dark' ? 'text-white' : 'text-black'}
            transition-colors duration-300
          `}>
           Our Branding Strengths
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                  rounded-lg shadow-lg p-8 flex flex-col items-center text-center 
                  transform transition-all duration-300 hover:-translate-y-2
                `}
                style={{ minHeight: '300px' }}
              >
                <div className="mb-6">
                  {service.icon}
                </div>
                <p className={`
                  text-lg md:text-xl
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  transition-colors duration-300
                `}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* White div at the bottom */}
      <div className={`
        w-full h-[30px] md:h-[40px] lg:h-[50px]
        ${theme === 'dark' ? 'bg-black' : 'bg-white'}
        transition-colors duration-300
      `}></div>
    </>
  );
}

export default BrandingServices;