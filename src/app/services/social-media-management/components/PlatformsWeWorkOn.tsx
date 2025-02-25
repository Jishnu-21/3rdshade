'use client';

import React from 'react';
import ClientCard from './ClientCard';
import { useTheme } from '@/app/context/ThemeContext';
import { FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaTwitter } from 'react-icons/fa';

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
        <p className={`text-xl text-center mb-12
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          transition-colors duration-300`}
        >
          Your Audience doesn't find you. You find them.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 
          gap-4 sm:gap-6 md:gap-8 justify-items-center">
          <ClientCard
            logoSrc={<FaInstagram className="w-12 h-12" />}
            name="Instagram"
            description="Connect with your audience through visual storytelling and engaging content."
          />
          <ClientCard
            logoSrc={<FaLinkedin className="w-12 h-12" />}
            name="LinkedIn"
            description="Build professional relationships and establish thought leadership in your industry."
          />
          <ClientCard
            logoSrc={<FaYoutube className="w-12 h-12" />}
            name="YouTube"
            description="Share your story through video content and reach a global audience."
          />
          <ClientCard
            logoSrc={<FaPinterest className="w-12 h-12" />}
            name="Pinterest"
            description="Inspire your audience with visual content and drive traffic to your business."
          />
          <ClientCard
            logoSrc={<FaTwitter className="w-12 h-12" />}
            name="Twitter"
            description="Engage in real-time conversations and stay connected with your community."
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformsWeWorkOn;