'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Banner.module.css';
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
      <div className="bg-black text-white min-h-[calc(100vh-80px)]"></div>
    );
  }

  return (
    <div className="bg-black text-white min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pb-0" ref={ref}>
      {/* Background Glow Effects */}
      {mounted && (
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(170, 255, 0, 0.15) 0%, rgba(0, 51, 0, 0.1) 50%, transparent 70%)',
            }}
          />
          
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] opacity-10"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(170, 255, 0, 0.1) 0%, transparent 60%)',
            }}
          />
        </div>
      )}

      {/* Stars */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Main large star above Reality */}
          <div 
            className="absolute top-[25%] left-[75%]"
          >
            <span 
              className="text-[#1A237E] text-[150px] cursor-pointer block opacity-40" 
              style={{ 
                filter: 'brightness(1.5) contrast(1.2)',
                transform: 'translateY(-50%)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) rotate(360deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) rotate(0deg)';
              }}
            >
              ✦
            </span>
          </div>
          
          {/* Other decorative stars */}
          <div className="absolute bottom-[30%] left-[10%] transform transition-all duration-500 hover:rotate-[360deg]">
            <span className="text-[#1A237E] text-xl opacity-30 cursor-pointer block">
              ✦
            </span>
          </div>
          
          <div className="absolute top-[40%] right-[25%] transform transition-all duration-500 hover:rotate-[360deg]">
            <span className="text-[#1A237E] text-xl opacity-30 cursor-pointer block">
              ✦
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div 
        className="w-full max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
          variants={textVariants}
        >
          <span className={`${styles.glowOnHover} inline-block`}>Bringing Your</span>
          <br />
          <span className={`${styles.glowOnHover} inline-block`}>Dream Into{' '}</span>
          <span className={`text-[#0066FF] italic ${styles.glowOnHoverBlue}`}>Reality</span>
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={textVariants}
        >
          We increase revenue and ensure sustainable long-term growth
          <br />
          for your business through powerful Webflow websites.
        </motion.p>

        <motion.div variants={textVariants}>
          <Link 
            href="/book-meeting"
            className="inline-block bg-[#AAFF00] text-black px-8 py-2.5 rounded-md hover:bg-[#95E600] transition-colors text-base font-medium"
          >
            Book A Meeting
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;