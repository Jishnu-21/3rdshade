'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const ProblemSolution = ({ industry, title, description, imageSrc, theme }) => (
  <div className="flex flex-col items-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 rounded-xl">
    <div className="relative w-full aspect-[4/3] mb-4 sm:mb-6 overflow-hidden rounded-lg group">
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority
      />
    </div>
    <div className="text-start w-full">
      <p className="text-[#955DDC] font-medium uppercase mb-2 sm:mb-3 
        text-xs sm:text-sm md:text-base tracking-wider">
        {industry}
      </p>
      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-black'} 
        text-lg sm:text-xl md:text-2xl font-bold 
        mb-2 sm:mb-3 md:mb-4 line-clamp-2`}>
        {title}
      </h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} 
        text-sm sm:text-base md:text-lg 
        leading-relaxed line-clamp-3`}>
        {description}
      </p>
    </div>
  </div>
);

const IndustryProblems = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-8 sm:py-12 md:py-16 lg:py-[120px] ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-black'}
          mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-[800px] mx-auto`}>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-[48px] mb-2">
            Case Studies
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-gray-600">
            Know us with the Facts
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-6 sm:gap-8 md:gap-10 lg:gap-12
          max-w-[1200px] mx-auto">
          <ProblemSolution
            industry="ARTIFICIAL INTELLIGENCE"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem1.png"
            theme={theme}
          />
          <ProblemSolution
            industry="CAR POOLING"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem2.png"
            theme={theme}
          />
          <ProblemSolution
            industry="3D PRINTING"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem3.png"
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
};

export default IndustryProblems;