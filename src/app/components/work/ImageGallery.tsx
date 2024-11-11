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
  { url: '/work/1.jpg', width: 250, height: 250, description: "A retro-styled Game Boy console with a glowing screen", mobileWidth: 120, mobileHeight: 120 },
  { url: '/work/2.jpg', width: 300, height: 220, description: "Another interesting image description", mobileWidth: 140, mobileHeight: 100 },
  { url: '/work/3.jpg', width: 230, height: 230, description: "Third image description", mobileWidth: 110, mobileHeight: 110 },
  { url: '/work/4.jpg', width: 270, height: 270, description: "Fourth image description", mobileWidth: 130, mobileHeight: 130 },
  { url: '/work/5.jpg', width: 280, height: 280, description: "Fifth image description", mobileWidth: 135, mobileHeight: 135 },
  { url: '/work/6.jpg', width: 250, height: 250, description: "Sixth image description", mobileWidth: 120, mobileHeight: 120 },
  { url: '/work/7.jpg', width: 300, height: 220, description: "Seventh image description", mobileWidth: 140, mobileHeight: 100 },
  { url: '/work/8.jpg', width: 230, height: 230, description: "Eighth image description", mobileWidth: 110, mobileHeight: 110 },
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

  const GRID_GAP = isMobile ? 60 : isTablet ? 150 : 200;

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
            scale: isMobile ? 1.02 : 1.05,
            zIndex: 10,
          }}
          animate={{
            x: mousePositionRef.current.x * (isMobile ? 0.01 : 0.02),
            y: mousePositionRef.current.y * (isMobile ? 0.01 : 0.02),
            scale: [1, 1.01, 1],
            transition: {
              x: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 0.5
              },
              y: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 0.5
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          drag={!isMobile}
          dragConstraints={!isMobile ? {
            left: -100,
            right: 100,
            top: -100,
            bottom: 100
          } : undefined}
          dragElastic={0.1}
          onClick={(e) => handleImageClick(image, e)}
        >
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
          <Image
            src={image.url}
            alt={image.description}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-cover rounded-lg"
            style={{
              opacity: 0.9,
              transition: 'opacity 0.3s ease-in-out'
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.opacity = '1';
            }}
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
        scrollContainerRef.current.scrollLeft = containerSize.width / 4;
        scrollContainerRef.current.scrollTop = containerSize.height / 4;
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
      Math.max(width / gridColumns, 150) :
      Math.max(width / gridColumns, 400);
    const cellHeight = isMobile ? 
      Math.max(height / gridRows, 150) :
      Math.max(height / gridRows, 400);

    for (let i = 0; i < images.length; i++) {
      const col = i % gridColumns;
      const row = Math.floor(i / gridColumns);
      
      const x = col * (cellWidth + GRID_GAP);
      const y = row * (cellHeight + GRID_GAP);
      
      const randomOffset = isMobile ? 10 : 20;
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

    if (scrollLeft > containerWidth * 0.75) {
      scrollContainerRef.current.scrollLeft = containerWidth * 0.25;
    } else if (scrollLeft < containerWidth * 0.25) {
      scrollContainerRef.current.scrollLeft = containerWidth * 0.75;
    }

    if (scrollTop > containerHeight * 0.75) {
      scrollContainerRef.current.scrollTop = containerHeight * 0.25;
    } else if (scrollTop < containerHeight * 0.25) {
      scrollContainerRef.current.scrollTop = containerHeight * 0.75;
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
    
    requestAnimationFrame(() => {
      setMousePosition(mousePositionRef.current);
    });
    
    if (isDragging && scrollContainerRef.current) {
      const sensitivity = 1.5;
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
        const sensitivity = 1.2;
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
      const sensitivity = isMobile ? 2 : 1.5;
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
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{
                x: clickPosition.x - windowSize.width / 2,
                y: clickPosition.y - windowSize.height / 2,
                width: isMobile ? selectedImage.mobileWidth : selectedImage.width,
                height: isMobile ? selectedImage.mobileHeight : selectedImage.height,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                width: isMobile ? '90vw' : '80vw',
                height: isMobile ? '60vh' : '80vh',
                opacity: 1,
              }}
              exit={{
                x: clickPosition.x - windowSize.width / 2,
                y: clickPosition.y - windowSize.height / 2,
                width: isMobile ? selectedImage.mobileWidth : selectedImage.width,
                height: isMobile ? selectedImage.mobileHeight : selectedImage.height,
                opacity: 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt="Selected image"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent"
              >
                <h2 className="text-white text-2xl font-bold">{selectedImage.description}</h2>
              </motion.div>
              <button
                className="absolute top-4 right-4 text-white text-xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
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
        ©2024
      </footer>
    </div>
  );
};

export default ImageGallery;