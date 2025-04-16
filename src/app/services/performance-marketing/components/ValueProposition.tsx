
"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ValueProposition = () => {
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
    <section 
      ref={ref}
      className={`benefits-section ${theme === 'light' ? 'bg-white' : 'bg-black'} 
        ${theme === 'dark' ? 'text-white' : 'text-black'} 
        py-8 sm:py-12 md:py-16 lg:py-20`}
    >
      <motion.div 
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6 sm:mb-8 md:mb-10"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
              font-bold leading-tight md:leading-[1.2]
              max-w-full md:max-w-[60%] lg:max-w-[600px]"
            variants={itemVariants}
          >
              Values that<br />
              Makes 3RD SHADE #1  
            </motion.h2>
        </motion.div>

        {/* Gradient Divider with Animation */}
        <div className="relative h-1 sm:h-1.5 md:h-2 mb-8 sm:mb-10 md:mb-12">
          {/* Background line */}
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />
          
          {/* Animated gradient line */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            variants={gradientLineVariants}
            style={{ originX: 0 }}
          />
        </div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
        >
          {[
            {
              title: '100% In-House Developers',
              description: 'With 30+ dedicated In-House team, we make sure to deliver top-notch quality output.'
            },
            {
              title: 'Dedicated Project Manage',
              description: 'Communication is essential to success, we\'ll assign you with a dedicated project manager.'
            },
            {
              title: 'Award-Winning Team',
              description: 'Our passionate team has been acclaimed by global clients for creating out-of-the-box digital products.'
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`p-6 sm:p-8 rounded-2xl border 
                ${theme === 'dark' 
                  ? 'border-gray-800 hover:border-gray-700' 
                  : 'border-gray-200 hover:border-gray-300'} 
                transition-colors duration-300`}
            >
              <motion.h3 
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
                variants={itemVariants}
              >
                {benefit.title}
              </motion.h3>
              <motion.p 
                className="text-base sm:text-lg opacity-80 leading-relaxed"
                variants={itemVariants}
              >
                {benefit.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ValueProposition;
