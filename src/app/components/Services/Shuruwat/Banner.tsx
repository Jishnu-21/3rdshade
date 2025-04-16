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
      {/* Yellow Glow Effects */}
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
      
      {/* Medium glow circle */}
      <div 
        className="absolute top-[45%] left-1/2 w-[200px] sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.04) 0%, transparent 70%)',
          filter: 'blur(30px) sm:blur(60px)',
          zIndex: 0
        }}
      />
      
      {/* Center concentrated glow */}
      <div 
        className="absolute top-[45%] left-1/2 w-[150px] sm:w-[300px] md:w-[400px] h-[150px] sm:h-[300px] md:h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.05) 0%, transparent 60%)',
          filter: 'blur(20px) sm:blur(50px)',
          zIndex: 0
        }}
      />

      {/* Stars - Hidden on mobile, visible on sm and up */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          {/* Other decorative stars - Keeping these smaller ones */}
          <div className="absolute bottom-[25%] sm:bottom-[35%] left-[8%] sm:left-[12%]">
            <span 
              className="text-[#30D5B6] text-xl opacity-30 cursor-pointer block hover:rotate-[360deg] transition-transform duration-500"
            >
              ✦
            </span>
          </div>
          
          <div className="absolute top-[35%] sm:top-[40%] right-[20%] sm:right-[30%]">
            <span 
              className="text-[#30D5B6] text-xl opacity-30 cursor-pointer block hover:rotate-[360deg] transition-transform duration-500"
            >
              ✦
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div 
        className="w-full max-w-5xl mx-auto relative z-10 -mt-20 sm:-mt-24 md:-mt-32"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.1]"
          variants={textVariants}
        >
          <span className="inline-block">Start Strong 
          </span>
          <br className="hidden sm:block" />
          <span className="text-[#00E5BE] italic">with Shuruwaat</span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 
          max-w-[350px] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light"
          variants={textVariants}
        >
          To new brands that are ready to make their mark, Shuruwaat is their launchpad. Everything your brand needs from day one, our product makes sure you roar out loud. A perfect mix of strategies and consulting, it is for established businesses that aim to break barriers and grow faster!
        </motion.p>

        <motion.div variants={textVariants}>
          <Link 
            href="/register"
            className="inline-block bg-[#00E5BE] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00ccaa] transition-colors text-sm sm:text-base font-medium"
          >
            Book A Meeting
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;