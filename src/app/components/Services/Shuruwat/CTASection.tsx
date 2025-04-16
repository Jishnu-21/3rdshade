'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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
    <div className="bg-black text-white py-12 sm:py-16 md:py-24 mt-8 sm:mt-10 md:mt-14" ref={ref}>
      <motion.div 
        className="max-w-[1200px] mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="bg-[#001F2D] rounded-xl sm:rounded-2xl md:rounded-3xl 
          py-12 sm:py-16 md:py-24 
          px-4 sm:px-6 md:px-8 
          text-center"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] 
              font-bold leading-[1.2] sm:leading-[1.15] md:leading-[1.1] 
              tracking-tight mb-3 sm:mb-4"
            variants={textVariants}
          >
            <span className="block">Start Right, Start Strong, Start with Shuruwaat</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 
              text-base sm:text-lg 
              mb-6 sm:mb-8
              max-w-[280px] sm:max-w-none mx-auto"
            variants={textVariants}
          >
            <span className="block"> A strong Shuruwaat is all it takes to build a brand that leaves a mark.</span>
          </motion.p>
          <Link href="/contact-us">

          <motion.button 
            className="bg-[#30D5B6] text-white 
              w-full sm:w-auto
              px-6 sm:px-8 
              py-2.5 sm:py-3 
              rounded-md hover:bg-[#30D5B6] 
              transition-colors 
              text-sm sm:text-base 
              font-medium 
              inline-flex items-center justify-center sm:justify-start gap-2"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5"
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
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CTASection; 