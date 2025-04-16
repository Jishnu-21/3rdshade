'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProcessSteps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const steps = [
    {
      icon: "◆",
      title: "Idea to Identity",
      description: "Your idea is a spark. Shuruwaat refines that spark, crafting a unique brand identity with solid strategies, compelling designs, and a clear roadmap to bring your vision to life.",
    },
    {
      icon: "◎",
      title: "Launch to Impact",
      description: "With branding, website, and marketing plans in place, we create a powerful starting. Your brand doesn't just enter the market—it makes waves.",
    },
    {
      icon: "↻",
      title: "Growth to Legacy",
      description: "As your brand creates an identity, we fine-tune every strategy to sustain growth. Shuruwaat transforms your journey from a passionate idea into a thriving brand that stands out.",
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
    <div className="bg-black text-white py-12 lg:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-start relative">
          {steps.map((step, index) => (
            <>
              <motion.div 
                key={step.title}
                className="flex flex-col items-center text-center w-[300px]"
                variants={stepVariants(index * 1.5)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#30D5B6] flex items-center justify-center mb-6 text-xl lg:text-2xl">
                  {step.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-[250px]">{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="absolute top-[32px] lg:top-[40px] h-[2px] flex items-center"
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

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden flex-col items-center space-y-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative w-full max-w-2xl">
              <motion.div 
                className="flex items-center space-x-8"
                variants={stepVariants(index * 1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="w-20 h-20 rounded-full bg-[#30D5B6] flex-shrink-0 flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-10 transform -translate-x-1/2 h-16 w-[2px] -bottom-16"
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