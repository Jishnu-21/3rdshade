'use client';

import React from 'react';
import ClientCard from './ClientCard';
import { useTheme } from '@/app/context/ThemeContext';

const TopClients = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-12 sm:py-16 md:py-20
      ${theme === 'dark' ? 'bg-white' : 'bg-black'}
      transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[48px] 
          font-bold text-center mb-8 sm:mb-10 md:mb-12
          ${theme === 'dark' ? 'text-black' : 'text-white'}
          transition-colors duration-300`}
        >
          Top Clients
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-4 sm:gap-6 md:gap-8 justify-items-center">
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
        </div>
      </div>
    </section>
  );
};

export default TopClients;