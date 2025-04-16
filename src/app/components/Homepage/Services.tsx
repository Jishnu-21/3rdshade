"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServiceLine: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Define services for each row
  const serviceRows = [
    [
      "Website Development", "Social Media Management", "Advertising", 
      "Performance Marketing", "App Development", "Influencer Marketing",
      "Website Development", "Social Media Management", "Advertising", 
      "Performance Marketing", "App Development", "Influencer Marketing"
    ],
    [
      "E-Commerce Listing", "SEO", "Branding", 
      "Content Creation", "Whatsapp Marketing", "Consulting",
      "E-Commerce Listing", "SEO", "Branding", 
      "Content Creation", "Whatsapp Marketing", "Consulting"
    ],
    [
      "Video Creation", "Email Marketing", "Website Development", 
      "Social Media Management", "Advertising", "Performance Marketing",
      "Video Creation", "Email Marketing", "Website Development", 
      "Social Media Management", "Advertising", "Performance Marketing"
    ]
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const currentContainer = containerRef.current;

    if (currentContainer) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              setIsPaused(true);
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                setIsPaused(false);
              }, 200);
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
              clearTimeout(scrollTimeout);
            };
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(currentContainer);
      return () => observer.unobserve(currentContainer);
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`w-full pt-8 sm:pt-[60px] md:pt-[40px] pb-20 sm:pb-32 md:pb-20 px-2 sm:px-3 md:px-6 overflow-hidden relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
      style={{ isolation: 'isolate' }}
    >
      <div className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-b ${theme === 'dark' ? 'from-gray-950 to-black' : 'from-gray-50 to-white'} opacity-50`}></div>
      
      <div className="flex flex-col items-center relative" ref={ref}>
        <div className={`w-3/4 sm:w-1/2 md:w-1/3 h-10 sm:h-12 md:h-16 border-2 ${theme === 'dark' ? 'border-gray-300' : 'border-gray-400'} rounded-[24px] flex items-center justify-center mb-3 sm:mb-4 md:mb-8 mt-4 sm:mt-0`}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
            <span className="text-pink-500">Our </span>
            <span className="text-purple-500">services </span>
            <span className="text-blue-500">line</span>
          </h2>
        </div>
        
        <div className="w-full flex flex-col gap-2 sm:gap-3 md:gap-6 mt-2 sm:mt-3 md:mt-4">
          {serviceRows.map((services, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`flex ${rowIndex % 2 === 0 ? 'animate-marquee-right' : 'animate-marquee-left'}`}
              style={{ 
                animationPlayState: isPaused ? 'paused' : 'running',
                animationDuration: `${window.innerWidth < 768 ? '15s' : '30s'}`,
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`h-6 sm:h-8 md:h-12 border ${
                    theme === 'dark' ? 'border-gray-300' : 'border-gray-400'
                  } rounded-[21px] flex-shrink-0 mx-1 sm:mx-1.5 md:mx-2 flex items-center justify-center px-4 ${
                    rowIndex === 0 ? 'w-[30vw] sm:w-[25vw] md:w-[15%]' : ''
                  } ${rowIndex === 1 ? 'w-[35vw] sm:w-[30vw] md:w-[18%]' : ''} ${
                    rowIndex === 2 ? 'w-[40vw] sm:w-[35vw] md:w-[20%]' : ''
                  }`}
                >
                  <span className={`text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {service}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceLine;