'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { FaHandshake, FaUsersCog, FaRocket, FaChartLine } from 'react-icons/fa';

const processSteps = [
  { 
    icon: FaHandshake,
    title: 'Personalized Branding solutions',
    description: 'No two brands are the same, and neither are the solutions. There’s always a Unique Selling Proposition that makes a brand different. We work closely with our clients, intake their unique needs and goals, crafting a personalized branding strategy with our expertise.'
  },
  { 
    icon: FaUsersCog,
    title: 'Industry-specific expertise',
    description: 'We have a deep understanding of every industry and its ever-changing dynamics. We ensure that the branding solutions provided are not only current but also forward-thinking, helping businesses stay relevant in competitive markets.'
  },
  { 
    icon: FaRocket,
    title: 'Strong emphasis on storytelling',
    description: 'Storytelling is at the heart of our strategy. We weave narratives via words and graphics that resonate emotionally with the audience, narrating the vision, story, and philosophy of the brand, that audience can feel and be part of.'
  },
];

const DesignProcess: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`pt-12 sm:pt-16 md:pt-20 lg:pt-[80px] 
      ${theme === 'dark' ? 'bg-white' : 'bg-black'}
      transition-colors duration-300`}
    >
      <div className={`py-12 sm:py-16 md:py-20 
        ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}
        transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold 
            mb-10 sm:mb-16 md:mb-20 max-w-full sm:max-w-[700px]"
          >
            <span className="block mb-2">Our Branding Strength</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="group h-[300px] sm:h-[320px] md:h-[340px] [perspective:1000px]"
              >
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div 
                    className={`absolute inset-0 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}
                      p-6 sm:p-8 rounded-lg flex flex-col items-center justify-between 
                      [backface-visibility:hidden]`}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl mt-4">
                      <step.icon />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4">{step.title}</h3>
                  </div>
                  {/* Back */}
                  <div 
                    className={`absolute inset-0 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}
                      p-5 sm:p-6 rounded-lg flex items-center justify-center 
                      [transform:rotateY(180deg)] [backface-visibility:hidden]`}
                  >
                    <p className="text-sm sm:text-base leading-snug">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignProcess;