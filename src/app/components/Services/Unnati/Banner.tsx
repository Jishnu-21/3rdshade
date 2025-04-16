'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Banner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
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

  if (!mounted) {
    return (
      <div className="bg-black text-white min-h-[calc(100vh-73px)]"></div>
    );
  }

  return (
    <div className="bg-black text-white min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 relative overflow-hidden pb-0" ref={ref}>
      {/* Yellow Glow Effects - Adjusted positioning */}
      <div 
        className="absolute top-[45%] left-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] sm:h-[600px] md:h-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(170, 255, 0, 0.1) 0%,
              rgba(170, 255, 0, 0.02) 30%,
              rgba(170, 255, 0, 0.03) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(40px) sm:blur(70px)',
          zIndex: 0
        }}
      />
      
      {/* Medium glow circle - Adjusted positioning */}
      <div 
        className="absolute top-[45%] left-1/2 w-[200px] sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.04) 0%, transparent 70%)',
          filter: 'blur(30px) sm:blur(60px)',
          zIndex: 0
        }}
      />
      
      {/* Center concentrated glow - Adjusted positioning */}
      <div 
        className="absolute top-[45%] left-1/2 w-[150px] sm:w-[300px] md:w-[400px] h-[150px] sm:h-[300px] md:h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.05) 0%, transparent 60%)',
          filter: 'blur(20px) sm:blur(50px)',
          zIndex: 0
        }}
      />

      {/* Content - Moved up */}
      <motion.div 
        className="w-full max-w-5xl mx-auto relative z-10 -mt-20 sm:-mt-24 md:-mt-32"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.1]"
          variants={textVariants}
        >
          <span className="inline-block">Unnati:</span>
          <br className="hidden sm:block" />
          <span className="inline-block">From Success to{' '}</span>
          <span className="text-[#0049FF] italic">Supersuccess!</span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
          variants={textVariants}
        >
Unnati is your brand’s personal growth booster! 
<br className="hidden sm:block" />
A perfect mix of strategies and consulting,it is for established businesses that aim to break barriers and grow faster!
        </motion.p>

        <motion.div variants={textVariants}>
          <Link 
            href="/register"
            className="inline-block bg-[#AAFF00] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#95E600] transition-colors text-sm sm:text-base font-medium"
          >
            Book A Meeting
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;