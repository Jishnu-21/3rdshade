"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SpinningStar from './SpinningStar';
import { useWindowSize } from '@/hooks/useWindowSize'

interface ImageProps {
  url: string;
  width: number;
  height: number;
  description: string;
  mobileWidth: number;
  mobileHeight: number;
}

const images: ImageProps[] = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', width: 300, height: 300, description: "Minimalist workspace design", mobileWidth: 160, mobileHeight: 160 },
  { url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80', width: 320, height: 240, description: "Creative studio setup", mobileWidth: 160, mobileHeight: 120 },
  { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', width: 280, height: 280, description: "Modern design workspace", mobileWidth: 160, mobileHeight: 160 },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', width: 290, height: 290, description: "Clean desk setup", mobileWidth: 135, mobileHeight: 135 },
  { url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80', width: 310, height: 310, description: "Professional workspace", mobileWidth: 145, mobileHeight: 145 },
  { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', width: 300, height: 250, description: "Team collaboration", mobileWidth: 140, mobileHeight: 115 },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', width: 280, height: 260, description: "Creative brainstorming", mobileWidth: 130, mobileHeight: 120 },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', width: 270, height: 270, description: "Modern office space", mobileWidth: 125, mobileHeight: 125 },
];

const ImageGallery: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [renderedImages, setRenderedImages] = useState<JSX.Element[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [containerSize, _setContainerSize] = useState({ width: 2000, height: 2000 });

  const windowSize = useWindowSize()

  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width <= 1024 && windowSize.width > 768;

  const GRID_GAP = isMobile ? 10 : isTablet ? 150 : 200;

  const createImageElements = useCallback((positions: { x: number; y: number }[]) => {
    return images.map((image, index) => {
      const pos = positions[index];
      
      return (
        <motion.div
          key={`image-${index}`}
          className="absolute cursor-pointer bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${isMobile ? image.mobileWidth : image.width}px`,
            height: `${isMobile ? image.mobileHeight : image.height}px`,
          }}
          whileHover={{ 
            scale: isMobile ? 1.01 : 1.05,
            zIndex: 10,
            rotate: isMobile ? [-0.5, 0.5] : [-1, 1],
            transition: {
              rotate: {
                repeat: Infinity,
                duration: isMobile ? 1.5 : 1,
                repeatType: "reverse"
              }
            }
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [-0.5, 0.5, -0.5],
            transition: {
              y: {
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                ease: "easeInOut"
              },
              rotate: {
                repeat: Infinity,
                duration: 4 + Math.random() * 2,
                ease: "easeInOut"
              }
            }
          }}
          drag={!isMobile}
          dragConstraints={!isMobile ? {
            left: -50,
            right: 50,
            top: -50,
            bottom: 50
          } : undefined}
          dragElastic={0.05}
          onClick={(e) => handleImageClick(image, e)}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
          
          {/* Floating particles */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={false}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
          <Image
            src={image.url}
            alt={image.description}
            width={isMobile ? image.mobileWidth : image.width}
            height={isMobile ? image.mobileHeight : image.height}
            className="w-full h-full object-cover rounded-lg"
            priority={index < 4}
            quality={85}
            sizes={`(max-width: 768px) ${image.mobileWidth}px, ${image.width}px`}
          />
        </motion.div>
      );
    });
  }, [isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = containerSize.width * 0.5;
        scrollContainerRef.current.scrollTop = containerSize.height * 0.5;
      }

      const positions = calculateImagePositions(viewportWidth, viewportHeight);
      const imageElements = createImageElements(positions);
      setRenderedImages(imageElements);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createImageElements]);

  const calculateImagePositions = useCallback((width: number, height: number) => {
    const positions = [];
    const gridColumns = isMobile ? 2 : isTablet ? 2 : 3;
    const gridRows = Math.ceil(images.length / gridColumns);
    
    const cellWidth = isMobile ? 
      Math.min(width / gridColumns - GRID_GAP, 140) :
      Math.max(width / gridColumns, 400);
    const cellHeight = isMobile ? 
      Math.min(height / gridRows - GRID_GAP, 140) :
      Math.max(height / gridRows, 400);

    for (let i = 0; i < images.length; i++) {
      const col = i % gridColumns;
      const row = Math.floor(i / gridColumns);
      
      const x = col * (cellWidth + GRID_GAP);
      const y = row * (cellHeight + GRID_GAP);
      
      const randomOffset = isMobile ? 2 : 20;
      const randomX = Math.random() * randomOffset - randomOffset/2;
      const randomY = Math.random() * randomOffset - randomOffset/2;
      
      positions.push({ 
        x: x + randomX, 
        y: y + randomY 
      });
    }

    return positions;
  }, [GRID_GAP, isMobile, isTablet]);

  const handleInfiniteScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollTop } = scrollContainerRef.current;
    const containerWidth = containerSize.width;
    const containerHeight = containerSize.height;

    if (scrollLeft >= containerWidth * 0.9) {
      scrollContainerRef.current.scrollLeft = containerWidth * 0.1;
    } else if (scrollLeft <= containerWidth * 0.1) {
      scrollContainerRef.current.scrollLeft = containerWidth * 0.9;
    }

    if (scrollTop >= containerHeight * 0.9) {
      scrollContainerRef.current.scrollTop = containerHeight * 0.1;
    } else if (scrollTop <= containerHeight * 0.1) {
      scrollContainerRef.current.scrollTop = containerHeight * 0.9;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    if (isDragging && scrollContainerRef.current) {
      const sensitivity = 1.2;
      const deltaX = e.movementX * sensitivity;
      const deltaY = e.movementY * sensitivity;

      scrollContainerRef.current.scrollBy({
        left: -deltaX,
        top: -deltaY,
        behavior: 'auto'
      });

      handleInfiniteScroll();
    }
  }, [isDragging]);

  const handleImageClick = (image: ImageProps, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollContainerRef.current) {
        const sensitivity = 0.8;
        
        scrollContainerRef.current.scrollBy({
          left: e.deltaX * sensitivity,
          top: e.deltaY * sensitivity,
          behavior: 'auto'
        });
        
        handleInfiniteScroll();
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (scrollContainerRef.current && e.touches[0]) {
      const touch = e.touches[0];
      const sensitivity = isMobile ? 1.5 : 1.2;
      const deltaX = (mousePositionRef.current.x - touch.clientX) * sensitivity;
      const deltaY = (mousePositionRef.current.y - touch.clientY) * sensitivity;

      scrollContainerRef.current.scrollBy({
        left: deltaX,
        top: deltaY,
        behavior: 'auto'
      });

      mousePositionRef.current = { x: touch.clientX, y: touch.clientY };
      handleInfiniteScroll();
    }
  }, [isMobile]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0">
        <SpinningStar />
      </div>

      <div 
        className="absolute inset-0 overflow-auto scrollbar-hide"
        ref={scrollContainerRef}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onScroll={handleInfiniteScroll}
      >
        <div 
          className="relative" 
          style={{ 
            width: `${containerSize.width}px`, 
            height: `${containerSize.height}px`,
          }}
        >
          {/* Center set */}
          <div className="absolute inset-0">
            {renderedImages}
          </div>
          
          {/* All 8 surrounding sets */}
          <div className="absolute" style={{ transform: `translate(${-containerSize.width}px, ${-containerSize.height}px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(0px, ${-containerSize.height}px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(${containerSize.width}px, ${-containerSize.height}px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(${-containerSize.width}px, 0px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(${containerSize.width}px, 0px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(${-containerSize.width}px, ${containerSize.height}px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(0px, ${containerSize.height}px)` }}>
            {renderedImages}
          </div>
          <div className="absolute" style={{ transform: `translate(${containerSize.width}px, ${containerSize.height}px)` }}>
            {renderedImages}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && windowSize.width > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
                y: 50
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                y: 50
              }}
              transition={{ 
                type: "spring",
                duration: 0.5,
                bounce: 0.3
              }}
              className="relative w-[90vw] h-[80vh] max-w-7xl rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Add overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              <Image
                src={selectedImage.url}
                alt={selectedImage.description}
                layout="fill"
                objectFit="contain"
                className="rounded-xl"
                quality={100}
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
              >
                <h2 className="text-white text-3xl font-bold mb-2">
                  {selectedImage.description}
                </h2>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md 
                           rounded-full flex items-center justify-center z-30
                           hover:bg-white/20 transition-colors"
                onClick={closeModal}
              >
                <span className="text-white text-xl">×</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center text-white z-10">
        <Link href="/" className={`h-${isMobile ? '8' : '12'} w-auto cursor-pointer`}>
          <Image
            src="/logo png-01 2@2x.png"
            alt="3RD SHADE Logo"
            width={isMobile ? 100 : 150}
            height={isMobile ? 32 : 48}
            objectFit="contain"
          />
        </Link>
      </header>

      <footer className="fixed bottom-4 right-4 text-white text-sm z-10">
        2024
      </footer>
    </div>
  );
};

export default ImageGallery;