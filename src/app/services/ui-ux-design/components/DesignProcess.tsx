import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

function DesignProcess() {
  const { theme } = useTheme();

  const services = [
    {
      icon: "/service-icon-1.png",
      description: "A thorough study of your audience, your vision, your brand, and your competitors."
    },
    {
      icon: "/service-icon-1.png",
      description: "Our team creates captivating interfaces that reflect your brand's personality and captivate users."
    },
    {
      icon: "/service-icon-1.png",
      description: "We specialize in crafting intuitive workflows, effortless navigation, and a cohesive experience that keeps users immersed."
    }
  ];

  return (
    <>
      <div className={`
        ${theme === 'dark' ? 'bg-black' : 'bg-[#F3F3F3]'}
        py-12 px-4 sm:px-6 lg:px-8
        transition-colors duration-300
      `}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`
            text-5xl font-bold text-center mb-16
            ${theme === 'dark' ? 'text-white' : 'text-black'}
            transition-colors duration-300
          `}>
            The Blueprint of our UI/UX
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                  rounded-lg shadow-lg p-8 flex flex-col items-center text-center 
                  transform transition-all duration-300 hover:-translate-y-2
                `}
                style={{ minHeight: '300px' }}
              >
                <div className="mb-6 relative w-24 h-24">
                  <Image
                    src={service.icon}
                    alt={`Service Icon ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    priority={true}
                  />
                </div>
                <p className={`
                  text-lg leading-relaxed
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  transition-colors duration-300
                `}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* White div at the bottom */}
      <div className={`
        w-full h-[30px] md:h-[40px] lg:h-[50px]
        ${theme === 'dark' ? 'bg-black' : 'bg-white'}
        transition-colors duration-300
      `}></div>
    </>
  );
}

export default DesignProcess;