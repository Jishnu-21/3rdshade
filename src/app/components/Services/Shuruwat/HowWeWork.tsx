'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWeWork = () => {
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
    <div className="bg-black text-white py-8 sm:py-10 md:py-12" ref={ref}>
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
            className="text-[#0066FF] text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 
              block uppercase tracking-wider"
            variants={textVariants}
          >
            HOW WE WORK
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] 
              font-bold leading-[1.2] md:leading-[1.1] tracking-tight
              mb-6 md:mb-0"
            variants={textVariants}
          >
The ‘Why’ Behind Idea of Shuruwaat
</motion.h2>
        </div>

        {/* Right Section */}
        <div className="w-full md:flex-1">
          <motion.p 
            className="text-gray-400 text-base sm:text-lg 
              mb-6 sm:mb-8 leading-relaxed"
            variants={textVariants}
          >
Building a brand is like building a house—you need a solid foundation, the right tools, and a blueprint. We realized that many budding brands have the passion but lack clarity on the how, when, what, and why. Enter Shuruwaat: a one-stop solution designed to hand-hold ambitious dreamers through the chaos of starting up. With our end-to-end services, we ensure every brand starts not just strong, but smart.           </motion.p>
</div>
      </motion.div>
    </div>
  );
};

export default HowWeWork;
