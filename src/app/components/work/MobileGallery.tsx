'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ImageModal } from './ImageModal';
import { galleryImages } from './types';
import SpinningStar from './SpinningStar';

const MobileGallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const sections = containerRef.current.querySelectorAll('.section');
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Split images into sections of 2 for the grid view
  const sections = galleryImages.reduce((acc, _, index) => {
    if (index % 2 === 0) {
      acc.push(galleryImages.slice(index, index + 2));
    }
    return acc;
  }, [] as typeof galleryImages[]);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Background Effect */}
      <div className="fixed inset-0 opacity-50 pointer-events-none">
        <SpinningStar />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 bg-black/30 backdrop-blur-sm">
        <Link href="/" className="h-8 w-auto cursor-pointer">
          <Image
            src="/logo png-01 2@2x.png"
            alt="3RD SHADE Logo"
            width={100}
            height={32}
            style={{ objectFit: "contain" }}
            className="brightness-200"
          />
        </Link>
      </header>

      {/* Main Content - Scrollable Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 top-16 bottom-20 overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="min-h-full pb-24">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className="section px-4 mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: sectionIndex * 0.1 
                }
              }}
              viewport={{ once: true, margin: "-20%" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {section.map((image, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative aspect-square"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw"
                        priority={sectionIndex < 2} // Prioritize loading first 4 images
                      />
                      {/* Hover Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      >
                        <p className="absolute bottom-2 left-2 right-2 text-white text-sm">
                          {image.description}
                        </p>
                      </motion.div>
                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{
                          scale: [1, 2],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-40"
      >
        {sections.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full ${
              index === activeSection ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
            }`}
            animate={{
              width: index === activeSection ? 24 : 6,
              backgroundColor: index === activeSection ? '#fff' : 'rgba(255,255,255,0.3)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ))}
      </motion.div>

      {/* Modal */}
      <ImageModal 
        selectedImage={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      {/* Footer */}
      <footer className="fixed bottom-4 right-4 text-white text-sm z-10">
        2024
      </footer>
    </div>
  );
};

export default MobileGallery;