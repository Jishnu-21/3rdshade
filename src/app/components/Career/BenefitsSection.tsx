"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BenefitsSection = () => {
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
      className={`benefits-section ${theme === 'light' ? 'bg-black' : 'bg-white'} 
        ${theme === 'dark' ? 'text-black' : 'text-white'} 
        py-12 sm:py-16 md:py-20 lg:py-24`}
    >
      <motion.div 
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Header Section */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 sm:mb-10 md:mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[600px]"
            variants={itemVariants}
          >
            What do we Look for <br />
            in our Future Teammate?
          </motion.h2>
          <motion.button 
            variants={itemVariants}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden 
              text-base sm:text-lg font-semibold rounded-full group 
              bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 
              hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 
              hover:text-white focus:ring-4 focus:outline-none 
              focus:ring-purple-200 dark:focus:ring-purple-800
              w-full lg:w-auto"
          >
            <span className={`relative px-6 sm:px-8 py-2.5 sm:py-3 transition-all ease-in duration-75 
              ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full 
              group-hover:bg-opacity-0 w-full lg:w-auto text-center`}
            >
              Explore our jobs
            </span>
          </motion.button>
        </motion.div>

        {/* Gradient Divider with Animation */}
        <div className="relative h-2 mb-16">
          {/* Background line */}
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-800'}`} />
          
          {/* Animated gradient line */}
          <motion.div 
            variants={gradientLineVariants}
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            style={{ originX: 0 }}
          />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {['Vision', 'Passion', 'Learners'].map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="benefit-item p-4 sm:p-6 md:p-8"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
              >
                {benefit}
              </motion.h3>
              <motion.p 
                variants={itemVariants}
                className={`${
                  theme === 'dark' ? 'text-black' : 'text-white'
                } text-sm sm:text-base md:text-lg leading-relaxed`}
              >
                {benefit === 'Vision' && (
                  <>Skills can be taught, but what we seek in someone is a Vision. One who can turn ideas into action, seeing not just what is but what could be. One who brings fresh perspectives and paves the way for bold, transformative growth.</>
                )}
                {benefit === 'Passion' && (
                  <>We’re looking for people who live and breathe digital marketing, staying energized by every challenge. One who ignites creativity, is up to date on trends, and transforms strategies into stories that captivate and inspire.</>
                )}
                {benefit === 'Learners' && (
                  <>There are dozens of new things introduced in the Digital World. We are always on the hunt for lifelong learners driven by the excitement of discovering new trends, tools, and techniques that keep us ahead in the digital world.</>
                )}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BenefitsSection;
