"use client"

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const WorkCulture = () => {
  const { theme } = useTheme();

  return (
    <section className={`work-culture-section py-16 pt-[80px] px-4 md:px-[122px]
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="container mx-auto">
        <div className="work-culture-top pb-16">
          <h2 className={`text-5xl font-bold pb-6 
            ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Family, not company
          </h2>
          <p className={`text-xl pb-8 max-w-lg 
            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
          >
            Like our design, the qualities that sets us apart are simple and yet amazing. 
            We won&apos;t promise you the world when you come to work with us, but we will 
            commit to uphold the values that make 3rd shade a great place to work at.
          </p>
          <div className={`relative w-[75%] h-[500px] 
            ${theme === 'dark' ? 'opacity-90' : 'opacity-100'}
            transition-opacity duration-300`}
          >
            <Image
              src="/work1.png"
              alt="Smiling colleagues"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        
        <div className="work-culture-bottom flex flex-col lg:flex-row items-center pt-[100px]">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12 flex flex-col justify-center">
            <h2 className={`text-5xl font-bold pb-6 
              ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Family, not company
            </h2>
            <p className={`text-xl 
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
            >
              Like our design, the qualities that sets us apart are simple and yet amazing. 
              We won&apos;t promise you the world when you come to work with us, but we will 
              commit to uphold the values that make 3rd shade a great place to work at.
            </p>
          </div>
          <div className="lg:w-1/2">
            <div className={`relative w-full h-[400px] 
              ${theme === 'dark' ? 'opacity-90' : 'opacity-100'}
              transition-opacity duration-300`}
            >
              <Image
                src="/work2.png"
                alt="Colleagues working together"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkCulture;
