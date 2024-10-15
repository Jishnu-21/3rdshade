"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SpinningStar from './SpinningStar';

interface ImageProps {
  url: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  description: string
}

const images: ImageProps[] = [
  { url: '/images (1).jpeg', position: { x: 5, y: 5 }, width: 300, height: 300, description: "A retro-styled Game Boy console with a glowing screen" },
  { url: '/images.jpeg', position: { x: 25, y: 10 }, width: 360, height: 260, description: "Another interesting image description" },
  { url: '/images (1).jpeg', position: { x: 45, y: 5 }, width: 280, height: 280, description: "Third image description" },
  { url: '/images (1).jpeg', position: { x: 65, y: 15 }, width: 320, height: 320, description: "Fourth image description" },
  { url: '/images.jpeg', position: { x: 85, y: 10 }, width: 340, height: 340, description: "Fifth image description" },
  { url: '/images (1).jpeg', position: { x: 10, y: 30 }, width: 380, height: 180, description: "Sixth image description" },
  { url: '/images.jpeg', position: { x: 30, y: 35 }, width: 260, height: 260, description: "Seventh image description" },
  { url: '/images (1).jpeg', position: { x: 50, y: 40 }, width: 400, height: 200, description: "Eighth image description" },
  { url: '/images (1).jpeg', position: { x: 70, y: 35 }, width: 300, height: 300, description: "Ninth image description" },
  { url: '/images.jpeg', position: { x: 90, y: 45 }, width: 360, height: 360, description: "Tenth image description" },
  { url: '/images (1).jpeg', position: { x: 15, y: 60 }, width: 320, height: 320, description: "Eleventh image description" },
  { url: '/images.jpeg', position: { x: 35, y: 65 }, width: 280, height: 280, description: "Twelfth image description" },
  { url: '/images (1).jpeg', position: { x: 55, y: 70 }, width: 340, height: 340, description: "Thirteenth image description" },
  { url: '/images (1).jpeg', position: { x: 75, y: 75 }, width: 380, height: 180, description: "Fourteenth image description" },
  { url: '/images.jpeg', position: { x: 95, y: 80 }, width: 300, height: 300, description: "Fifteenth image description" },
];

const ImageGallery: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [draggedImage, setDraggedImage] = useState<ImageProps | null>(null);
  const [dragPositions, setDragPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition({
          x: scrollContainerRef.current.scrollLeft,
          y: scrollContainerRef.current.scrollTop,
        });
      }
    };

    const handleInfiniteScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = scrollContainerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollContainerRef.current.scrollLeft = 1;
        } else if (scrollLeft <= 0) {
          scrollContainerRef.current.scrollLeft = scrollWidth - clientWidth - 1;
        }

        if (scrollTop + clientHeight >= scrollHeight - 1) {
          scrollContainerRef.current.scrollTop = 1;
        } else if (scrollTop <= 0) {
          scrollContainerRef.current.scrollTop = scrollHeight - clientHeight - 1;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    scrollContainerRef.current?.addEventListener('scroll', handleScroll);
    scrollContainerRef.current?.addEventListener('scroll', handleInfiniteScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
      scrollContainerRef.current?.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, image: ImageProps) => {
    setIsDragging(true);
    setDraggedImage(image);
    setDragPositions([{ x: e.clientX, y: e.clientY }]);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedImage(null);
    setDragPositions([]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= e.movementX;
      scrollContainerRef.current.scrollTop -= e.movementY;

      if (draggedImage) {
        setDragPositions(prev => [...prev, { x: e.clientX, y: e.clientY }].slice(-10));
      }
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

  const renderImages = () => {
    const repeatedImages = [...images, ...images, ...images, ...images]; // Repeat images 4 times
    return repeatedImages.map((img, index) => (
      <motion.div
        key={index}
        className="absolute cursor-pointer"
        style={{
          left: `${img.position.x}%`,
          top: `${img.position.y}%`,
          width: `${img.width}px`,
          height: `${img.height}px`,
          transition: 'filter 0.1s ease-out',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        onMouseDown={(e) => handleMouseDown(e, img)}
        onClick={(e) => handleImageClick(img, e)}
      >
        <Image
          src={img.url}
          alt={`Image ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          draggable={false}
        />
      </motion.div>
    ));
  };

  const renderDragEffect = () => {
    if (!draggedImage || dragPositions.length < 2) return null;

    return dragPositions.map((pos, index) => (
      <motion.div
        key={index}
        className="absolute pointer-events-none"
        style={{
          left: pos.x - draggedImage.width / 2,
          top: pos.y - draggedImage.height / 2,
          width: draggedImage.width,
          height: draggedImage.height,
          opacity: (index + 1) / dragPositions.length * 0.5,
        }}
      >
        <Image
          src={draggedImage.url}
          alt="Dragged image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </motion.div>
    ));
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* SpinningStar Background */}
      <div className="absolute inset-0">
        <SpinningStar />
      </div>

      {/* Scrollable Content */}
      <div 
        className="absolute inset-0 overflow-auto scrollbar-hide"
        ref={scrollContainerRef}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="relative" style={{ width: '400%', height: '400%' }}>
          {renderImages()}
        </div>
      </div>

      {/* Drag Effect */}
      {renderDragEffect()}

      {/* Image Description Modal */}
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