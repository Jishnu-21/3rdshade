'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWeWork2 = () => {
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
        className="max-w-[1200px] mx-auto px-6 flex justify-between items-start gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Left Section */}
        <div className="flex-1">
          <motion.span 
            className="text-[#AAFF00] text-sm font-medium mb-4 block uppercase tracking-wider"
            variants={textVariants}
          >
            BENEFITS
          </motion.span>
          <motion.h2 
            className="text-[56px] font-bold leading-[1.1] tracking-tight"
            variants={textVariants}
          >
            The design subscription that connects you to your dream team
          </motion.h2>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <motion.p 
            className="text-gray-400 text-lg mb-8 leading-relaxed"
            variants={textVariants}
          >
            A subscription can alleviate the stress of staffing, managing expenses, or make design calls like a Creative Director. We partner with you to ensure that your design elevates your brand to new levels.
          </motion.p>
          <motion.button 
            className="bg-[#0066FF] text-white px-8 py-3 rounded-md hover:bg-[#0052CC] transition-colors text-base font-medium"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Pricing
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowWeWork2; 