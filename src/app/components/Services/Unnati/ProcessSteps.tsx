'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';


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
    <div className="bg-black text-white py-10 sm:py-16 md:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-start relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div 
                className="flex flex-col items-center text-center w-[300px]"
                variants={stepVariants(index * 1.5)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#0066FF] flex items-center justify-center mb-4 lg:mb-6 text-xl lg:text-2xl">
                  {step.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-[250px]">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-[32px] lg:top-[40px] h-[2px] flex items-center"
                  style={{ 
                    width: '25%',
                    left: index === 0 ? '22%' : '72%'
                  }}
                  variants={lineVariants(index * 1.5 + 0.5)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="w-full bg-white h-[2px]" />
                  <motion.div
                    className="absolute right-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ duration: 0.1, delay: (index + 1) * 1.4 }}
                  >
                    <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 translate-x-[1px]" />
                  </motion.div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              variants={stepVariants(index * 0.5)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="w-16 h-16 rounded-full bg-[#0066FF] flex items-center justify-center mb-4 text-xl">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="h-8 w-[2px] bg-white/20 mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;