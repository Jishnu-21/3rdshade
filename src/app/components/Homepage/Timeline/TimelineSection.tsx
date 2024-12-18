import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { TimelineItem } from './TimelineItem';
import { timelineData } from './timelineData';

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className="relative bg-black min-h-screen"
    >
      {/* Fixed Title Section */}
      <div className="fixed left-0 top-1/4 w-full z-20">
        <div className="container mx-auto px-4 md:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-[500px]"
          >
            <h2 className="text-5xl font-bold mb-6">
              Beyond the Ordinary. What Do We Do?
            </h2>
            <p className="text-blue-400 text-xl">
              It's not just about having a website or social media presence. 
              We understand you and your brand to market in a unique way.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Timeline Content - Offset to not overlap with fixed title */}
      <div className="relative max-w-[1800px] mx-auto pl-[600px]">
        <div 
          ref={contentRef}
          className="relative min-h-screen pt-[40vh]"
        >
          {/* Timeline vertical dotted line */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-[2px]"
            style={{
              background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 8px, transparent 8px, transparent 24px)'
            }}
          />
          
          {/* Timeline Items */}
          <div className="relative z-10 space-y-32">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index}
                data={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.p 
          className="text-sm font-medium mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll Down
        </motion.p>
        <motion.div
          className="w-6 h-6 border-2 border-white border-b-0 border-r-0 transform rotate-45"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}