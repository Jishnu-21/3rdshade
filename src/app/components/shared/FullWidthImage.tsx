import React from 'react';
import Image from 'next/image';

interface FullWidthImageProps {
  src: string;
  alt?: string;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ 
  src, 
  alt = "Full width image" 
}) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[609px] relative">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
      />
    </div>
  );
};

export default FullWidthImage; 