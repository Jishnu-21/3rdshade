import React from 'react';
import Image from 'next/image';

const ProductPromoBanner = () => {
  return (
    <section className="bg-white flex justify-center items-center py-12 sm:py-16 md:py-20 lg:py-[120px] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[970px] bg-[#F1967D] flex flex-col lg:flex-row overflow-hidden rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] lg:h-[535px] relative">
          <Image
            src="/different1.jpg"
            alt="Product visual"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Check out ruttl today!
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 sm:mb-8">
            ruttl is a visual feedback and collaboration tool for all your web & mobile projects. 
            Add contextual comments on websites & web apps, track bugs, make changes 
            (edits) and invite clients to review.
          </p>
          <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold">
            Know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPromoBanner;