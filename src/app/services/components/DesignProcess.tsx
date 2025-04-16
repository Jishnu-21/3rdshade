'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { FaHandshake, FaUsersCog, FaRocket, FaChartLine } from 'react-icons/fa';

const processSteps = [
  { 
    icon: FaHandshake,
    title: 'Consultation',
    description: 'Our founders, leading experts with experience in high-end brands across various industries, engage in deep discussions to understand your brand\'s current stage. They analyze problems and provide tailored solutions, outlining how we will effectively support your brand\'s growth.'
  },
  { 
    icon: FaUsersCog,
    title: 'Onboarding',
    description: 'In this phase, the relevant team members connect with you to gather detailed requirements. They clarify expectations and initiate the services, ensuring everyone is aligned on goals.'
  },
  { 
    icon: FaRocket,
    title: 'Execution',
    description: 'Our team meticulously implements the agreed-upon strategies, executing tasks step-by-step according to the specific services outlined, ensuring quality and coherence throughout the process.'
  },
  { 
    icon: FaChartLine,
    title: 'Optimization',
    description: 'The entire team conducts regular internal discussions and collaborates with you to monitor progress and performance. Feedback is actively integrated to make necessary adjustments, enhancing the effectiveness of our campaigns.'
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
            <span className="block mb-2">You choose our Services.</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-[36px] text-gray-600">
              What Next? How do we Work?
            </span>
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