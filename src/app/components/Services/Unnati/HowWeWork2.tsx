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
    <div className="bg-black text-white py-12 sm:py-16 md:py-24 mt-8 sm:mt-10 md:mt-14" ref={ref}>
      <motion.div 
        className="max-w-[1200px] mx-auto px-4 sm:px-6 
          flex flex-col md:flex-row justify-between items-start 
          gap-6 sm:gap-10 md:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Left Section */}
        <div className="w-full md:flex-1">
          <motion.span 
            className="text-[#AAFF00] text-xs sm:text-sm font-medium 
              mb-2 sm:mb-3 md:mb-4 block uppercase tracking-wider"
            variants={textVariants}
          >
            BENEFITS
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] 
              font-bold leading-[1.2] md:leading-[1.1] tracking-tight
              mb-6 md:mb-0"
            variants={textVariants}
          >
Unnati: Your brand’s next big leap starts here! 
</motion.h2>
        </div>

        {/* Right Section */}
        <div className="w-full md:flex-1">
          <motion.p 
            className="text-gray-400 text-base sm:text-lg 
              mb-6 sm:mb-8 leading-relaxed"
            variants={textVariants}
          >
        It combines killer strategies, and data-driven results with personal consulting straight from our founders, ensuring your business gets the spotlight it deserves. Whether it’s boosting engagement or driving sales, Unnati turns potential into performance and makes your success our mission! Contact us to learn about our 3 packages, Silver, Platinum, and Gold, each one taking you towards Business Growth. 
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default HowWeWork2; 