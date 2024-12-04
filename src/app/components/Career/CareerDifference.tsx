"use client"

import React from "react";
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const CareerDifference = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full pt-[30px] sm:pt-[50px] md:pt-[75px] lg:pt-[100px] pb-[30px] sm:pb-[50px] 
      min-h-screen overflow-x-hidden 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-[1175px] mx-auto flex-grow">
        <div className={`flex flex-col md:flex-row gap-6 md:gap-8 
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          <div className="w-full md:w-1/2">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold 
              pb-[50px] sm:pb-[75px] md:pb-[100px] lg:pb-[200px] 
              ${theme === 'dark' ? 'text-white' : 'text-black'} 
              leading-tight`}
            >
            Here’s something <br/>you need to know about us        
           </h1>
            <div>
              <h2 className={`text-3xl sm:text-4xl md:text-[48px] font-bold pb-4 sm:pb-6 
                ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              >
              More than Just Colleagues
              </h2>
              <p className={`text-sm sm:text-base md:text-lg leading-6 sm:leading-7 pb-6 sm:pb-8 
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} 
                max-w-md`}
              >
               We are weirdly creative people brewing magic. We talk more than ‘Let me know if you need any assistance with this’ and are always up for Tea and Coffee Breaks. 
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className={`text-sm sm:text-base md:text-lg leading-6 sm:leading-7 
              pb-[50px] sm:pb-[75px] md:pb-[100px] lg:pb-[150px] 
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
            >
             We are crazy about what we do.  We are dreamers lost in stories and hardcore designs. We are super workaholics but also entertainers ourselves, adding a pinch of drama to our work. 
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className={`aspect-square ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-opacity duration-300`}
              >
                <Image
                  src="/different1.jpg"
                  alt="Career hero image 1"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
              <div className={`row-span-2 ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-opacity duration-300`}
              >
                <Image
                  src="/different3.jpg"
                  alt="Career hero image 2"
                  width={500}
                  height={1000}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
              <div className={`aspect-square ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-opacity duration-300`}
              >
                <Image
                  src="/different2.jpg"
                  alt="Career hero image 3"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDifference;