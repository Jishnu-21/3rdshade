"use client"

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';

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

  const scrollToOpenings = (e: React.MouseEvent) => {
    e.preventDefault();
    const openingsSection = document.getElementById('current-openings');
    if (openingsSection) {
      openingsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="benefits-section"
      ref={ref}
      className={`benefits-section ${theme === 'light' ? 'bg-black' : 'bg-white'} 
        ${theme === 'dark' ? 'text-black' : 'text-white'} 
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
            What do we Look for <br className="hidden sm:block" />
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
              w-full sm:w-auto md:min-w-[180px] lg:min-w-[200px]"
            onClick={scrollToOpenings}
          >
            <span className={`relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all ease-in duration-75 
              ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full 
              group-hover:bg-opacity-0 w-full text-center whitespace-nowrap`}
            >
              Explore our jobs
            </span>
          </motion.button>
        </motion.div>

        {/* Gradient Divider with Animation */}
        <div className="relative h-1 sm:h-1.5 md:h-2 mb-8 sm:mb-10 md:mb-12">
          {/* Background line */}
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-200' : 'bg-gray-800'}`} />
          
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
              title: 'Vision',
              description: 'Skills can be taught, but what we seek in someone is a Vision. One who can turn ideas into action, seeing not just what it is but what it could be. One who brings fresh perspectives and paves the way for bold, transformative growth.'
            },
            {
              title: 'Passion',
              description: 'We’re looking for people who live and breathe digital marketing, staying energized by every challenge. One who is creative, is up to date on trends, and transforms strategies into stories that captivate and inspire.'
            },
            {
              title: 'Learners',
              description: 'There are dozens of new things introduced in the Digital World every day.  We are always on the hunt for lifelong learners driven by the excitement of discovering new trends, tools, and techniques that keep us ahead.'
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`p-6 sm:p-8 rounded-2xl border 
                ${theme === 'dark' 
                  ? 'border-gray-200 hover:border-gray-300' 
                  : 'border-gray-800 hover:border-gray-700'} 
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

export default BenefitsSection;
