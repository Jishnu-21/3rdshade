'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProcessSteps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const steps = [
    {
      icon: "◆",
      title: "Building a brand for Tomorrow",
      description: "You have built a solid foundation, but does the growth seem stagnant? We focus not only on today's sales but also on building a brand for tomorrow.",
    },
    {
      icon: "◎",
      title: "Scale with Precision",
      description: "Once we've mastered strategies, we help you scale like a pro. We target new audiences, increase your ROI, and make sure your brand shines brighter than ever.",
    },
    {
      icon: "↻",
      title: "Personal Consulting for Lasting Impact",
      description: "Tracking your growth at every step of the way, our founders pitch in to serve you with tailored solutions and resolve your challenges.",
    }
  ];

  const stepVariants = (delay: number) => ({
    hidden: { 
      opacity: 0,
      x: -20,
      y: 20
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

  const verticalLineVariants = (delay: number) => ({
    hidden: { 
      scaleY: 0,
      originY: 0
    },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        delay: delay
      }
    }
  });

  return (
    <div className="bg-black text-white py-12 md:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-start relative">
          {steps.map((step, index) => (
            <>
              <motion.div 
                key={step.title}
                className="flex flex-col items-center text-center w-[300px]"
                variants={stepVariants(index * 1.5)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0066FF] flex items-center justify-center mb-6 text-xl md:text-2xl">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[250px]">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-[32px] md:top-[40px] h-[2px] flex items-center"
                  style={{ 
                    width: '400px',
                    left: index === 0 ? '200px' : 'auto',
                    right: index === 1 ? '200px' : 'auto'
                  }}
                  variants={lineVariants(index * 1.5 + 0.5)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="w-full bg-white h-[2px]" />
                  <motion.div
                    className="absolute right-[-1px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ duration: 0.1, delay: index * 1.5 + 1.4 }}
                  >
                    <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45" />
                  </motion.div>
                </motion.div>
              )}
            </>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center space-y-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={stepVariants(index * 1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="w-16 h-16 rounded-full bg-[#0066FF] flex items-center justify-center mb-4 text-xl">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[300px]">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 h-12 w-[2px] -bottom-12"
                  variants={verticalLineVariants(index * 1 + 0.5)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="w-[2px] h-full bg-white" />
                  <motion.div
                    className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ duration: 0.1, delay: index * 1 + 1.4 }}
                  >
                    <div className="w-2 h-2 border-b-2 border-r-2 border-white transform rotate-45" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;