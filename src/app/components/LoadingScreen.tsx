"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false);
      const timer2 = setTimeout(() => {
        setShowContent(true);
        // Enable scrolling after content is shown
        document.body.style.overflow = 'auto';
      }, 800);
      return () => clearTimeout(timer2);
    }, 2500);

    // Disable scrolling during loading
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer1);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ 
              y: '-100%',
              transition: {
                duration: 1,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2
                }
              }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-white mb-8">
                welcome
              </h2>
              <motion.div 
                className="h-[2px] bg-white w-[100px] mx-auto mt-4"
                initial={{ width: 0 }}
                animate={{ 
                  width: 100,
                  transition: {
                    duration: 1,
                    delay: 0.5
                  }
                }}
              />
              
              <motion.div 
                className="mt-8 flex gap-2 justify-center"
                initial="initial"
                animate="animate"
              >
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Always render content div, but control visibility with opacity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          transition: {
            duration: 0.5
          }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
};

export default LoadingScreen;