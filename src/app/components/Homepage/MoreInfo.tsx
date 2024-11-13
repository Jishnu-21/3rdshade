import React from 'react';
import Link from 'next/link';

const MoreInfo = () => (
  <div className="bg-white rounded-lg py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 text-center 
    mb-8 sm:mb-10 md:mb-12 lg:mb-16 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-6xl">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold 
      mb-6 sm:mb-8 md:mb-10 lg:mb-14">
      For more information
    </h2>
    <Link href="/contact" className="inline-block">
      <button className="bg-black text-white text-base sm:text-lg 
        px-8 sm:px-12 md:px-16 lg:px-24 
        py-2 sm:py-2.5 md:py-3 
        rounded-full font-medium 
        transition-all duration-300 
        hover:shadow-[0_0_10px_3px_rgba(0,255,255,0.6)] 
        focus:outline-none
        active:scale-95">
        Contact us
      </button>
    </Link>
  </div>
);

export default MoreInfo;