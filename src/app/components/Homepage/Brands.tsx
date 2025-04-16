'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Montserrat, Parisienne, Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'], 
});

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const brands = [
  { name: "Hush Hiven", image: "/brand1.jpg", mobileImage: "/1.jpg" },
  { name: "Pallid Blue Studio", image: "/brand2.jpg", mobileImage: "/2.jpg" },
  { name: "A Dash of me", image: "/brand3.jpg", mobileImage: "/3.jpg" },
  { name: "Poochyx", image: "/brand4.jpg", mobileImage: "/4.jpg" },
  { name: "Elite Pack", image: "/brand5.jpg", mobileImage: "/5.jpg" },
  // Additional brands
  { name: "Grandma Cookies", image: "/brand6.jpg", mobileImage: "/6.jpg" },
  { name: "System X", image: "/brand7.jpg", mobileImage: "/7.jpg" },
  { name: "Lace & Beads", image: "/brand8.jpg", mobileImage: "/8.jpg" },
  { name: "Commix", image: "/brand9.jpg", mobileImage: "/9.jpg" },
  { name: "Sole Mates", image: "/brand10.jpg", mobileImage: "/10.jpg" }
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [stars, setStars] = useState<Array<{
    delay: number,
    top: number,
    left: number,
    direction: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  }>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const brandsPerPage = 5;
  const totalPages = Math.ceil(brands.length / brandsPerPage);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const currentBrands = brands.slice(
    currentPage * brandsPerPage,
    (currentPage + 1) * brandsPerPage
  );

  const nextPage = () => {
    setSlideDirection('right');
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setSlideDirection('left');
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

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
    <div id="brands" className="bg-black text-black min-h-screen py-8 sm:py-12 md:py-16 lg:py-20
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
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0 bg-black/60 z-10" /> {/* Increased overlay opacity */}
            <Image
              src={isMobile ? brands.find(brand => brand.name === hoveredBrand)?.mobileImage || '' : brands.find(brand => brand.name === hoveredBrand)?.image || ''}
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
        <div className={`${playfair.className} bg-white/20 text-white rounded-3xl px-6 sm:px-8 md:px-10 border border-white/20
          py-2 sm:py-2.5 inline-block mb-8 sm:mb-10 md:mb-12 
          min-w-[240px] sm:min-w-[260px] md:min-w-[280px]`}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 
            font-semibold leading-none text-center"
          >
            Brands We Have Built
          </h2>
        </div>

        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: slideDirection === 'right' ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === 'right' ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className={`${playfair.className} space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 w-full`}
            >
              {currentBrands.map((brand, index) => (
                <motion.div 
                  key={brand.name}
                  className={`text-[32px] sm:text-[36px] md:text-[42px] 
                    lg:text-[48px] xl:text-[56px] 2xl:text-[64px] 3xl:text-[72px] 4xl:text-[84px]
                    leading-[1.1] cursor-pointer text-center font-normal
                    text-white transition-all duration-300
                    ${hoveredBrand === brand.name ? 'text-white scale-110' : 'text-white/90'}`}
                  onMouseEnter={() => setHoveredBrand(brand.name)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  whileHover={{ scale: 1.15 }} // Increased scale value
                  transition={{ duration: 0.4, ease: "easeOut" }} // Slightly longer duration
                >
                  {brand.name}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <motion.button
            onClick={prevPage}
            className={`w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 
              flex items-center justify-center backdrop-blur-sm
              border border-white/20 transition-all duration-300
              ${currentPage === 0 ? 'opacity-50 hover:bg-white/10' : 'hover:bg-white/20'}`}
            whileHover={currentPage > 0 ? { scale: 1.1 } : undefined}
            whileTap={currentPage > 0 ? { scale: 0.95 } : undefined}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextPage}
            className={`w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 
              flex items-center justify-center backdrop-blur-sm
              border border-white/20 transition-all duration-300
              ${currentPage === totalPages - 1 ? 'opacity-50 hover:bg-white/10' : 'hover:bg-white/20'}`}
            whileHover={currentPage < totalPages - 1 ? { scale: 1.1 } : undefined}
            whileTap={currentPage < totalPages - 1 ? { scale: 0.95 } : undefined}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
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