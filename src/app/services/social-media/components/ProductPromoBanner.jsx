'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const ProductPromoBanner = () => {
  const { theme } = useTheme();

  return (
    <section className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
      flex justify-center items-center 
      py-12 sm:py-16 md:py-20 lg:py-[120px] 
      px-4 sm:px-6 lg:px-8
      transition-colors duration-300
    `}>
      <div className={`
        w-full max-w-[970px] 
        ${theme === 'dark' ? 'bg-[#D97B66]' : 'bg-[#F1967D]'}
        flex flex-col lg:flex-row 
        overflow-hidden rounded-lg 
        shadow-lg
        transition-colors duration-300
      `}>
        <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] lg:h-[535px] relative">
          <Image
            src="/different1.jpg"
            alt="Product visual"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6
            transition-colors duration-300">
            Check out ruttl today!
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8
            transition-colors duration-300">
            ruttl is a visual feedback and collaboration tool for all your web & mobile projects. 
            Add contextual comments on websites & web apps, track bugs, make changes 
            (edits) and invite clients to review.
          </p>
          <button className={`
            ${theme === 'dark' 
              ? 'bg-white text-black hover:bg-black hover:text-white' 
              : 'bg-black text-white hover:bg-white hover:text-black'
            }
            px-4 sm:px-6 py-2 sm:py-3 
            rounded-full text-base sm:text-lg 
            font-semibold
            transition-all duration-300
            border-2 border-transparent
            hover:border-current
          `}>
            Know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPromoBanner;