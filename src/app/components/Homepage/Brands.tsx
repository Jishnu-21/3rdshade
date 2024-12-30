'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Montserrat, Parisienne } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'], // 600 is SemiBold
});

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
});

const brands = [
  { name: "Hush Hiven", image: "/brand1.jpg" },
  { name: "Pallid Blue Studio", image: "/brand2.jpg" },
  { name: "A Dash of me", image: "/brand3.jpg" },
  { name: "Poochyx", image: "/brand1.jpg" },
  { name: "Elite Pack", image: "/brand2.jpg" }
];

const ShootingStar: React.FC<{ 
  delay: number, 
  top: number, 
  left: number, 
  direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}> = ({ delay, top, left, direction }) => {
  const getDirectionStyles = () => {
    switch(direction) {
      case 'topLeft':
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: 'rotate(45deg)'
        };
      case 'topRight':
        return {
          top: `${top}%`,
          right: `${left}%`,
          transform: 'rotate(-45deg)'
        };
      case 'bottomLeft':
        return {
          bottom: `${top}%`,
          left: `${left}%`,
          transform: 'rotate(-45deg)'
        };
      case 'bottomRight':
        return {
          bottom: `${top}%`,
          right: `${left}%`,
          transform: 'rotate(45deg)'
        };
    }
  };

  return (
    <div 
      className={`shooting-star shooting-star-${direction}`}
      style={{ 
        animationDelay: `${delay}s`,
        ...getDirectionStyles()
      }}
    ></div>
  );
};

const BrandsWeBuilt: React.FC = () => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [stars, setStars] = useState<Array<{
    delay: number,
    top: number,
    left: number,
    direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  }>>([]);

  useEffect(() => {
    const directions: Array<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'> = 
      ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    
    const newStars = Array(12).fill(null).map(() => ({
      delay: Math.random() * 8,
      top: Math.random() * 100,
      left: Math.random() * 100,
      direction: directions[Math.floor(Math.random() * directions.length)]
    }));
    setStars(newStars);
  }, []);

  return (
    <div id="brands" className="bg-gray-700 text-black min-h-screen py-8 sm:py-12 md:py-16 lg:py-20
      relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-20">
        {stars.map((star, i) => (
          <ShootingStar 
            key={i} 
            delay={star.delay} 
            top={star.top} 
            left={star.left}
            direction={star.direction}
          />
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {hoveredBrand && (
          <motion.div
            key={hoveredBrand}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={brands.find(brand => brand.name === hoveredBrand)?.image || ''}
              alt={hoveredBrand}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-lg lg:max-w-xl xl:max-w-2xl 
        2xl:max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto relative z-30 
        flex flex-col items-center justify-center"
      >
        <div className="bg-white/20 text-black rounded-3xl px-6 sm:px-8 md:px-10 border border-black
          py-2 sm:py-2.5 inline-block mb-8 sm:mb-10 md:mb-12 
          min-w-[240px] sm:min-w-[260px] md:min-w-[280px]"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 
            font-bold leading-none text-center"
          >
            Brand we have build
          </h2>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 w-full">
          {brands.map((brand, index) => (
            <motion.div 
              key={index}
              className={`${parisienne.className} text-[32px] sm:text-[36px] md:text-[42px] 
                lg:text-[48px] xl:text-[56px] 2xl:text-[64px] 3xl:text-[72px] 4xl:text-[84px]
                leading-[1.1] cursor-pointer text-center
                ${hoveredBrand === brand.name ? 'text-white' : 'text-white/80'}`}
              style={{ letterSpacing: '-2%' }}
              onMouseEnter={() => setHoveredBrand(brand.name)}
              onMouseLeave={() => setHoveredBrand(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {brand.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = `
@keyframes shooting-star-topLeft {
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px) translateY(1000px) rotate(45deg);
    opacity: 0;
  }
}

@keyframes shooting-star-topRight {
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px) translateY(1000px) rotate(-45deg);
    opacity: 0;
  }
}

@keyframes shooting-star-bottomLeft {
  0% {
    transform: translateX(0) translateY(0) rotate(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px) translateY(-1000px) rotate(-45deg);
    opacity: 0;
  }
}

@keyframes shooting-star-bottomRight {
  0% {
    transform: translateX(0) translateY(0) rotate(45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px) translateY(-1000px) rotate(45deg);
    opacity: 0;
  }
}

.shooting-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  z-index: 20;
}

.shooting-star::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, white, transparent);
  transform-origin: left;
}

.shooting-star-topLeft {
  animation: shooting-star-topLeft 5s linear infinite;
}

.shooting-star-topRight {
  animation: shooting-star-topRight 5s linear infinite;
}

.shooting-star-bottomLeft {
  animation: shooting-star-bottomLeft 5s linear infinite;
}

.shooting-star-bottomRight {
  animation: shooting-star-bottomRight 5s linear infinite;
}
`;

export default BrandsWeBuilt;