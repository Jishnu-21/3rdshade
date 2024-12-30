import React from 'react';
import Image from 'next/image';

const FullWidthImage: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative">
      <Image
        src="/services-reactangle.png"
        alt="Design tools and book on yellow background"
        fill
        className="object-cover"
        quality={100}
        priority
      />
    </div>
  );
};

export default FullWidthImage;