'use client';

import React from 'react';
import Image from 'next/image';
import ClientCard from './ClientCard';
import { useTheme } from '@/app/context/ThemeContext';

const PlatformsWeWorkOn = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-12 sm:py-16 md:py-20
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
      transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[48px] 
          font-bold text-center mb-8 sm:mb-10 md:mb-12
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          transition-colors duration-300`}
        >
          Platforms we Work on
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 
          gap-4 sm:gap-6 md:gap-8 justify-items-center">
          <ClientCard
            logoSrc={
              <Image 
                alt="Amazon logo"
                src="/platforms/amazon.png" 
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
                priority
              />
            }
            name="Amazon"
          />
          <ClientCard
            logoSrc={
              <Image 
                src="/platforms/ajio.png" 
                alt="Ajio logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            }
            name="Ajio"
          />
          <ClientCard
            logoSrc={
              <Image 
                src="/platforms/nykaa.jpg" 
                alt="Nykaa logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            }
            name="Nykaa"
          />
          <ClientCard
            logoSrc={
              <Image 
                src="/platforms/flipkart.jpg" 
                alt="Flipkart logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            }
            name="Flipkart"
          />
          <ClientCard
            logoSrc={
              <Image 
                src="/platforms/myntra.png" 
                alt="Myntra logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            }
            name="Myntra"
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformsWeWorkOn;