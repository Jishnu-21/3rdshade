'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FullWidthImageProps {
  src: string;
  alt?: string;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ 
  src, 
  alt = "Full width image" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <motion.div 
      ref={containerRef}
      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[609px] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          scale,
          opacity
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          className="transition-transform duration-1000 ease-out"
        />
      </motion.div>
    </motion.div>
  );
};

export default FullWidthImage;