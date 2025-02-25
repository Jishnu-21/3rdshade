import React from 'react';
import Image from 'next/image';

const FullWidthImage: React.FC = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[609px] relative">
      <Image
        src="/services/3.jpg"
        alt="Design tools and book on yellow background"
        layout="fill"
        objectFit="fit-contain"
        quality={100}
        priority
      />
    </div>
  );
};

export default FullWidthImage;