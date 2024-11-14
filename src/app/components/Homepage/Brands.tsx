'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'], // 600 is SemiBold
});

const brands = [
  { name: "Hush Hiven", image: "/path-to-hush-hiven-image.jpg" },
  { name: "Pallid Blue", image: "/path-to-pallid-blue-image.jpg" },
  { name: "Moemm", image: "/path-to-moemm-image.jpg" },
  { name: "Super Hoomans", image: "/path-to-super-hoomans-image.jpg" },
  { name: "Food Butti", image: "/path-to-food-buti-image.jpg" }
];

const ShootingStar: React.FC<{ delay: number, top: number, left: number }> = ({ delay, top, left }) => {
  return (
    <div 
      className="shooting-star" 
      style={{ 
        animationDelay: `${delay}s`,
        top: `${top}%`,
        left: `${left}%`
      }}
    ></div>
  );
};

const BrandsWeBuilt: React.FC = () => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [stars, setStars] = useState<{ delay: number, top: number, left: number }[]>([]);

  useEffect(() => {
    const newStars = Array(5).fill(null).map(() => ({
      delay: Math.random() * 5,
      top: Math.random() * 70,
      left: Math.random() * 70
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="bg-gray-700 text-black py-16 relative overflow-hidden">
      {stars.map((star, i) => (
        <ShootingStar key={i} delay={star.delay} top={star.top} left={star.left} />
      ))}
      {hoveredBrand && (
        <div className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out opacity-30">
          <Image
            src={brands.find(brand => brand.name === hoveredBrand)?.image || ''}
            alt={hoveredBrand}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="w-full max-w-lg mx-auto relative z-10 space-y-12 text-center">
        <div className="bg-white text-black rounded-3xl px-10 py-2.5 inline-block mb-12 min-w-[280px]">
          <h2 className="text-xl font-bold leading-none">Brand we have build</h2>
        </div>
        <div className="space-y-12">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className={`${montserrat.className} text-[48px] leading-[42px] transition-all duration-300 ease-in-out cursor-pointer
                ${hoveredBrand === brand.name ? 'text-white scale-105' : 'text-black'}`}
              style={{ letterSpacing: '-2%' }}
              onMouseEnter={() => setHoveredBrand(brand.name)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsWeBuilt;