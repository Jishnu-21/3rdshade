"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useTheme } from '@/app/context/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { theme } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      setViewportHeight(window.innerHeight);
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    };
  }, [isOpen, scrollPosition]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            onClick={onClose}
            style={{ 
              top: scrollPosition,
              height: `${Math.max(document.body.scrollHeight, viewportHeight)}px`
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`
              fixed
              w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] 
              max-w-3xl 
              ${theme === 'dark' ? 'bg-black' : 'bg-white'}
              ${theme === 'dark' ? 'text-white' : 'text-black'}
              rounded-2xl shadow-xl z-[1000]
              scrollbar-hide
              overflow-y-auto
              max-h-[90vh] sm:max-h-[80vh]
            `}
            style={{ 
              top: window.innerWidth >= 640 
                ? `${scrollPosition + (viewportHeight * 0.2)}px`
                : `${scrollPosition + 20}px`,
              left: window.innerWidth >= 640 
                ? '25%' 
                : '10px',
              transform: window.innerWidth >= 640 
                ? 'translateX(-50%)' 
                : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className={`
                sticky top-4 float-right mr-4 p-2 rounded-full 
                ${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'}
                transition-colors z-[1001]
              `}
            >
              <IoClose size={24} />
            </button>

            <div className="relative clear-both">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;