"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SpinningStar from './SpinningStar';
import gsap from 'gsap';

interface ImageProps {
  url: string;
  width: number;
  height: number;
  description: string;
}

const images: ImageProps[] = [
  { url: '/images (1).jpeg', width: 250, height: 250, description: "A retro-styled Game Boy console with a glowing screen" },
  { url: '/images.jpeg', width: 300, height: 220, description: "Another interesting image description" },
  { url: '/images (1).jpeg', width: 230, height: 230, description: "Third image description" },
  { url: '/images (1).jpeg', width: 270, height: 270, description: "Fourth image description" },
  { url: '/images.jpeg', width: 280, height: 280, description: "Fifth image description" },
  { url: '/images (1).jpeg', width: 250, height: 250, description: "Sixth image description" },
  { url: '/images.jpeg', width: 300, height: 220, description: "Seventh image description" },
  { url: '/images (1).jpeg', width: 230, height: 230, description: "Eighth image description" },
];

const ImageGallery: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [renderedImages, setRenderedImages] = useState<JSX.Element[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 6000, height: 6000 });
  const cellSize = 500; // Size of each cell in the grid

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    generateImages(0, 0, containerSize.width, containerSize.height);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateImages = (startX: number, startY: number, width: number, height: number) => {
    const newImages: JSX.Element[] = [];
    const grid: boolean[][] = Array(Math.ceil(height / cellSize))
      .fill(null)
      .map(() => Array(Math.ceil(width / cellSize)).fill(false));

    const placeImage = (x: number, y: number, w: number, h: number) => {
      const startCol = Math.floor(x / cellSize);
      const endCol = Math.ceil((x + w) / cellSize);
      const startRow = Math.floor(y / cellSize);
      const endRow = Math.ceil((y + h) / cellSize);

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          if (grid[row] && grid[row][col]) return false;
        }
      }

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          if (!grid[row]) grid[row] = [];
          grid[row][col] = true;
        }
      }
      return true;
    };

    for (let i = 0; i < 30; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      let x, y;
      let placed = false;

      for (let attempts = 0; attempts < 100 && !placed; attempts++) {
        x = startX + Math.random() * (width - randomImage.width);
        y = startY + Math.random() * (height - randomImage.height);
        placed = placeImage(x, y, randomImage.width, randomImage.height);
      }

      if (placed) {
        newImages.push(
          <motion.div
            key={`${x}-${y}`}
            className="absolute cursor-pointer"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${randomImage.width}px`,
              height: `${randomImage.height}px`,
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onClick={(e) => handleImageClick(randomImage, e)}
          >
            <Image
              src={randomImage.url}
              alt={`Image ${i}`}
              layout="fill"
              objectFit="cover"
              draggable={false}
            />
          </motion.div>
        );
      }
    }

    setRenderedImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleInfiniteScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = scrollContainerRef.current;
      const threshold = 1000; // Increased threshold for earlier generation

      let newWidth = containerSize.width;
      let newHeight = containerSize.height;

      if (scrollLeft + clientWidth >= scrollWidth - threshold) {
        generateImages(containerSize.width, 0, 3000, containerSize.height);
        newWidth += 3000;
      }
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        generateImages(0, containerSize.height, containerSize.width, 3000);
        newHeight += 3000;
      }

      if (newWidth !== containerSize.width || newHeight !== containerSize.height) {
        setContainerSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scrollContainerRef.current) {
      const newX = scrollPosition.x - e.movementX * 0.02;
      const newY = scrollPosition.y - e.movementY * 0.02;

      gsap.to(scrollContainerRef.current, {
        scrollLeft: newX,
        scrollTop: newY,
        duration: 3,
        ease: "power1.out",
        onUpdate: () => {
          if (scrollContainerRef.current) {
            setScrollPosition({
              x: scrollContainerRef.current.scrollLeft,
              y: scrollContainerRef.current.scrollTop
            });
          }
        },
        onComplete: handleInfiniteScroll
      });
    }
  };

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

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <SpinningStar />
      </div>

      <div 
        className="absolute inset-0 overflow-auto scrollbar-hide"
        ref={scrollContainerRef}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onScroll={handleInfiniteScroll}
      >
        <div className="relative" style={{ width: `${containerSize.width}px`, height: `${containerSize.height}px` }}>
          {renderedImages}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && windowSize.width > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{
                x: clickPosition.x - windowSize.width / 2,
                y: clickPosition.y - windowSize.height / 2,
                width: selectedImage.width,
                height: selectedImage.height,
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                width: '80vw',
                height: '80vh',
                opacity: 1,
              }}
              exit={{
                x: clickPosition.x - windowSize.width / 2,
                y: clickPosition.y - windowSize.height / 2,
                width: selectedImage.width,
                height: selectedImage.height,
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
                className="rounded-lg"
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
        <Link href="/" className="h-12 w-auto cursor-pointer">
          <Image
            src="/logo png-01 2@2x.png"
            alt="3RD SHADE Logo"
            width={150}
            height={48}
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
