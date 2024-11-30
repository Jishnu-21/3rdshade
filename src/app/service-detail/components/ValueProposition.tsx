"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/app/context/ThemeContext';

const ValueProposition: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const gradientLineVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} h-[300px]`}></div>
      
      <div 
        ref={ref}
        className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} 
          px-4 sm:px-6 md:px-8 lg:px-[122px] py-12 sm:py-16 md:py-20 lg:py-24 relative z-10 transition-colors duration-300`}
      >
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 sm:mb-10 md:mb-12"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[600px]"
              variants={itemVariants}
            >
              Values that<br />
              Makes 3RD SHADE<br />
              #1
            </motion.h2>
            <motion.button 
              variants={itemVariants}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden 
                text-base sm:text-lg font-semibold rounded-full group 
                bg-gradient-to-br from-[#F1967D] via-[#955DDC] to-[#1CB0CE]
                hover:text-white focus:ring-4 focus:outline-none 
                focus:ring-purple-200 dark:focus:ring-purple-800
                w-full lg:w-auto"
            >
              <span className={`relative px-6 sm:px-8 py-2.5 sm:py-3 transition-all ease-in duration-75 
                ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full 
                group-hover:bg-opacity-0 w-full lg:w-auto text-center`}
              >
                Get in touch
              </span>
            </motion.button>
          </motion.div>
          
          <div className="relative h-2 mb-16">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-800'}`} />
            <motion.div 
              variants={gradientLineVariants}
              className="absolute inset-0 bg-gradient-to-r from-[#F1967D] via-[#955DDC] to-[#1CB0CE]"
              style={{ originX: 0 }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {[
              {
                title: "100% In-House Developers",
                description: "With 30+ dedicated In-House team, we make sure to deliver top-notch quality output"
              },
              {
                title: "Dedicated Project Manager",
                description: "Communication is essential to success, we'll assign you with a dedicated project manager."
              },
              {
                title: "Award-Winning Team",
                description: (
                  <>
                    Our passionate team has been acclaimed by global clients for creating out-of-the-box digital products.
                    <Link 
                      href="/portfolio" 
                      className="text-[#1CB0CE] hover:underline ml-1 transition-colors duration-300"
                    >
                      Take a look here.
                    </Link>
                  </>
                )
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="benefit-item p-4 sm:p-6 md:p-8"
              >
                <motion.h3 
                  variants={itemVariants}
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  variants={itemVariants}
                  className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} 
                    text-sm sm:text-base md:text-lg leading-relaxed`}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ValueProposition;