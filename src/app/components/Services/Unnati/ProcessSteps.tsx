'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProcessSteps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.5
  });

  const steps = [
    {
      icon: "◆",
      title: "Subscribe & get started",
      description: "Submit as many design tasks as you need without worrying about individual project fees.",
    },
    {
      icon: "◎",
      title: "Polished designs - on time",
      description: "Our designers get to work to deliver your request. Receive your design within a few days.",
    },
    {
      icon: "↻",
      title: "Revisions made simple",
      description: "Custom designs, prompt replies and as many revisions as you need.",
    }
  ];

  // Animation variants for steps
  const stepVariants = (delay: number) => ({
    hidden: { 
      opacity: 0,
      x: -50, // Reduced movement for mobile
      y: 20 // Added vertical movement for mobile
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay
      }
    }
  });

  // Animation variants for lines
  const lineVariants = (delay: number) => ({
    hidden: { 
      scaleX: 0,
      originX: 0
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        delay: delay
      }
    }
  });

  return (
    <div className="bg-black text-white py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-start relative">
          {/* First step */}
          <motion.div 
            className="flex flex-col items-center text-center w-[300px]"
            variants={stepVariants(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-[#0066FF] flex items-center justify-center mb-6 text-2xl">
              {steps[0].icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{steps[0].title}</h3>
            <p className="text-gray-400 text-base leading-relaxed max-w-[250px]">{steps[0].description}</p>
          </motion.div>

          {/* First line */}
          <motion.div
            className="absolute top-[40px] left-[200px] h-[2px] flex items-center"
            style={{ width: '400px' }}
            variants={lineVariants(0.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-full bg-white h-[2px]" />
            <motion.div
              className="absolute right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.1, delay: 1.4 }}
            >
              <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 translate-x-[1px]" />
            </motion.div>
          </motion.div>

          {/* Second step */}
          <motion.div 
            className="flex flex-col items-center text-center w-[300px]"
            variants={stepVariants(1.5)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-[#0066FF] flex items-center justify-center mb-6 text-2xl">
              {steps[1].icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{steps[1].title}</h3>
            <p className="text-gray-400 text-base leading-relaxed max-w-[250px]">{steps[1].description}</p>
          </motion.div>

          {/* Second line */}
          <motion.div
            className="absolute top-[40px] right-[200px] h-[2px] flex items-center"
            style={{ width: '400px' }}
            variants={lineVariants(2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-full bg-white h-[2px]" />
            <motion.div
              className="absolute right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.1, delay: 2.9 }}
            >
              <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 translate-x-[1px]" />
            </motion.div>
          </motion.div>

          {/* Third step */}
          <motion.div 
            className="flex flex-col items-center text-center w-[300px]"
            variants={stepVariants(3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-[#0066FF] flex items-center justify-center mb-6 text-2xl">
              {steps[2].icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{steps[2].title}</h3>
            <p className="text-gray-400 text-base leading-relaxed max-w-[250px]">{steps[2].description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;