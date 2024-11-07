'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const CTASection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

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

  return (
    <div className="bg-black text-white py-24 mt-14" ref={ref}>
      <motion.div 
        className="max-w-[1200px] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="bg-[#001F2D] rounded-3xl py-24 px-8 text-center">
          <motion.h2 
            className="text-[56px] font-bold leading-[1.1] tracking-tight mb-4"
            variants={textVariants}
          >
            Become part of the<br />design revolution
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-lg mb-8"
            variants={textVariants}
          >
            Jump on a membership and start<br />requesting designs right away!
          </motion.p>

          <motion.button 
            className="bg-[#0066FF] text-white px-8 py-3 rounded-md hover:bg-[#0052CC] transition-colors text-base font-medium inline-flex items-center gap-2"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Pricing
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5"
            >
              <path 
                d="M6 12L10 8L6 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CTASection; 