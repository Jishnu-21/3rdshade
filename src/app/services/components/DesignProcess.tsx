import React from 'react';
import Image from 'next/image';

const processSteps = [
  { icon: '/specs1.png', title: 'Discover' },
  { icon: '/specs2.png', title: 'Strategy' },
  { icon: '/specs3.png', title: 'Execute' },
];

const DesignProcess: React.FC = () => {
  return (
    <div className='pt-12 sm:pt-16 md:pt-20 lg:pt-[80px] bg-black'>
      <div className="bg-black text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold mb-10 sm:mb-16 md:mb-20 max-w-full sm:max-w-[510px]">
            From Product Specs to Design Boards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white text-black p-6 sm:p-8 md:p-10 rounded-lg flex flex-col items-center justify-between h-64 sm:h-72 md:h-80 transition-transform duration-300 ease-in-out hover:-translate-y-4 cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
                  <Image src={step.icon} alt={step.title} layout="fill" objectFit="contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold">{step.title}</h3>
              </div>
            ))}
            <div 
              className="bg-white text-black p-6 sm:p-8 md:p-10 rounded-lg flex items-center h-64 sm:h-72 md:h-80 transition-transform duration-300 ease-in-out hover:-translate-y-4 cursor-pointer"
            >
              <p className="text-base sm:text-lg leading-relaxed">
                As designs move from our screens to yours we take care of everything in between. Pre and post launch we do user testings and use metrix to ensure the output is right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignProcess;