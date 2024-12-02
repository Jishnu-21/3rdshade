"use client"

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';
import { Parisienne } from 'next/font/google';

// Add Parisienne font configuration
const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
});

const LifeAtShade = () => {
  const { theme } = useTheme();
  
  const images = [
    '/grid1.jpg',
    '/grid2.jpg',
    '/grid3.jpg',
    '/grid4.jpg',
    '/grid5.jpg',
    '/grid6.jpg',
    '/grid7.jpg',
    '/grid8.jpg',
    '/grid9.jpg',
    '/grid10.jpg',
  ];

  return (
    <section className={`life-at-shade py-20 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div className="relative text-center pb-16">
          <h3 className={`${parisienne.className} text-5xl sm:text-6xl md:text-7xl absolute top-0 left-1/2 transform 
            -translate-x-1/2 -translate-y-full mb-4
            ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Life at
          </h3>
          <div className="mt-8 relative w-full max-w-2xl mx-auto">
            <Image 
              src="/logo png-03 1.png"
              alt="3RD SHADE"
              width={600}
              height={200}
              className={`w-full h-auto 
                ${theme === 'dark' ? 'opacity-10' : 'opacity-100'}`}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-1">
          {images.map((src, index) => {
            let classes = "relative overflow-hidden";
            
            // Apply specific grid classes based on index
            if (index < 2) {
              classes += " col-span-3 row-span-3";
            } else if (index < 5 || index > 6) {
              classes += " col-span-2 row-span-2";
            } else {
              classes += " col-span-3 row-span-2";
            }

            return (
              <div key={index} className={classes}>
                <div className={`group relative w-full h-full
                  ${theme === 'dark' ? 'opacity-90 hover:opacity-100' : 'opacity-100 hover:opacity-90'}
                  transition-all duration-300`}
                >
                  <Image 
                    src={src} 
                    alt={`Life at 3RD SHADE ${index + 1}`} 
                    layout="responsive" 
                    width={index < 2 ? 600 : 400} 
                    height={index < 2 ? 600 : 400} 
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 
                    ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
                    opacity-0 group-hover:opacity-10 
                    transition-opacity duration-300`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifeAtShade;
