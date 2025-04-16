"use client"

import React from "react";
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const CareerDifference = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full 
      pt-6 sm:pt-10 md:pt-16 lg:pt-24 
      pb-8 sm:pb-12 md:pb-16
      min-h-screen overflow-x-hidden 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-[1175px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          <div className="w-full md:w-1/2">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[60px] xl:text-[70px] font-bold 
              pb-8 sm:pb-12 md:pb-16 lg:pb-24
              ${theme === 'dark' ? 'text-white' : 'text-black'} 
              leading-tight sm:leading-tight`}
            >
              Here's something <br className="hidden sm:block"/>you need to know about us        
            </h2>
            <div>
              <h2 className={`text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] font-bold 
                pb-3 sm:pb-4 md:pb-6
                ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              >
                More than Just Colleagues
              </h2>
              <p className={`text-sm sm:text-base md:text-lg 
                leading-relaxed sm:leading-relaxed 
                pb-4 sm:pb-6 md:pb-8
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} 
                max-w-md`}
              >
                We are weirdly creative people brewing magic. We talk more than 'Let me know if you need any assistance with this' and are always up for Tea and Coffee Breaks. 
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <p className={`text-sm sm:text-base md:text-lg 
              leading-relaxed sm:leading-relaxed 
              pb-8 sm:pb-12 md:pb-16 lg:pb-24
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
            >
              We are crazy about what we do. We are dreamers lost in stories and hardcore designs. We are super workaholics but also entertainers ourselves, adding a pinch of drama to our work. 
            </p>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className={`aspect-square relative overflow-hidden rounded-lg
                ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-all duration-300 hover:scale-[1.02]`}
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
              <div className={`row-span-2 relative overflow-hidden rounded-lg
                ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-all duration-300 hover:scale-[1.02]`}
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
              <div className={`aspect-square relative overflow-hidden rounded-lg
                ${theme === 'dark' ? 'opacity-90' : 'opacity-100'} 
                transition-all duration-300 hover:scale-[1.02]`}
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