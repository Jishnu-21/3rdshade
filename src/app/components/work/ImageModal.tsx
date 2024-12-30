 'use client'

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageProps } from './types';

interface ImageModalProps {
  selectedImage: ImageProps | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ selectedImage, onClose }) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      setScale(Math.min(Math.max(1, distance / 200), 3));
    } else {
      // Handle pan
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
      
      if (scale > 1) {
        setPosition({
          x: position.x + (e.touches[0].clientX - touchStart.x),
          y: position.y + (e.touches[0].clientY - touchStart.y)
        });
      }
    }
  };

  const handleTouchEnd = () => {
    const deltaY = touchStart.y - touchEnd.y;
    
    // If swipe down is detected and image is not zoomed
    if (deltaY < -50 && scale === 1) {
      onClose();
    }

    // Reset scale and position if below threshold
    if (scale < 1.1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  const handleDoubleTap = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white"
              onClick={onClose}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </motion.button>
          </div>

          <motion.div 
            className="w-full h-full flex items-center justify-center"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ type: "spring", damping: 20 }}
            onDoubleClick={handleDoubleTap}
          >
            <motion.div
              animate={{
                scale,
                x: position.x,
                y: position.y,
              }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.description}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 text-white text-center"
          >
            <p className="text-sm bg-black/50 backdrop-blur-md rounded-lg p-2">
              {selectedImage.description}
            </p>
          </motion.div>

          {scale === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-0 right-0 text-white/50 text-sm text-center"
            >
              Swipe down to close • Double tap to zoom
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};