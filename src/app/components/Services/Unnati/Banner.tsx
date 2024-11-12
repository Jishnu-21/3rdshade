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
    <div className="bg-black text-white min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pb-0" ref={ref}>
      {/* Yellow Glow Effects - further reduced intensity */}
      <div 
        className="absolute top-[35%] left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2"
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
          filter: 'blur(70px)',
          zIndex: 0
        }}
      />
      
      {/* Medium glow circle - further reduced intensity */}
      <div 
        className="absolute top-[35%] left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      
      {/* Center concentrated glow - further reduced intensity */}
      <div 
        className="absolute top-[35%] left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(170, 255, 0, 0.05) 0%, transparent 60%)',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />

      {/* Stars */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Main large star above Reality */}
          <div 
            className="absolute top-[25%] left-[75%] transform transition-all duration-700"
            style={{ 
              transform: 'translateY(-50%)',
            }}
          >
            <span 
              className="text-[#0066FF] text-[150px] cursor-pointer block opacity-40 hover:rotate-[360deg] transition-transform duration-700" 
              style={{ 
                filter: 'brightness(1.5) contrast(1.2)',
              }}
            >
              ✦
            </span>
          </div>
          
          {/* Other decorative stars */}
          <div className="absolute bottom-[30%] left-[10%]">
            <span 
              className="text-[#0066FF] text-xl opacity-30 cursor-pointer block hover:rotate-[360deg] transition-transform duration-500"
            >
              ✦
            </span>
          </div>
          
          <div className="absolute top-[40%] right-[25%]">
            <span 
              className="text-[#0066FF] text-xl opacity-30 cursor-pointer block hover:rotate-[360deg] transition-transform duration-500"
            >
              ✦
            </span>
          </div>
        </div>
      )}

      {/* Content - Adjusted spacing */}
      <motion.div 
        className="w-full max-w-5xl mx-auto relative z-10 mt-20" // Added margin-top
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]" // Increased bottom margin
          variants={textVariants}
        >
          <span className="inline-block">Bringing Your</span>
          <br />
          <span className="inline-block">Dream Into{' '}</span>
          <span className="text-[#0049FF] italic">Reality</span> {/* Changed color to blue */}
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed" // Increased bottom margin
          variants={textVariants}
        >
          We increase revenue and ensure sustainable long-term growth
          <br />
          for your business through powerful Webflow websites.
        </motion.p>

        <motion.div variants={textVariants}>
          <Link 
            href="/book-meeting"
            className="inline-block bg-[#AAFF00] text-black px-8 py-3 rounded-md hover:bg-[#95E600] transition-colors text-base font-medium"
          >
            Book A Meeting
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;