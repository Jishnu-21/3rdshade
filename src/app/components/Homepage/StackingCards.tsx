'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

const cards = [
  {
    title: "Digital Innovation",
    description: "Transforming ideas into cutting-edge digital solutions that drive business growth.",
    image: "/images/innovation.jpg",
  },
  {
    title: "Creative Design",
    description: "Crafting beautiful, intuitive interfaces that captivate users and elevate brands.",
    image: "/images/design.jpg",
  },
  {
    title: "Technical Excellence",
    description: "Building robust, scalable solutions with cutting-edge technology.",
    image: "/images/tech.jpg",
  }
];

const StackingCards = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerTop, setContainerTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculatePositions = () => {
      const rect = container.getBoundingClientRect();
      setContainerTop(window.scrollY + rect.top);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
        calculatePositions(); // Recalculate on scroll
      });
    };

    // Calculate initial positions
    calculatePositions();
    setScrollPosition(window.scrollY); // Set initial scroll position

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  const getCardStyle = (index) => {
    const startOffset = 500; // Distance to scroll before next card appears
    const scrollStart = containerTop + (index * startOffset);
    
    let progress = (scrollPosition - scrollStart) / 300;
    progress = Math.min(Math.max(progress, 0), 1);
    
    // Initial state (before scroll)
    const initialY = 100; // Start below
    const initialScale = 0.8;
    const initialOpacity = 0;
    
    // Final state (after scroll)
    const finalY = 0;
    const finalScale = 1;
    const finalOpacity = 1;
    
    // Interpolate between initial and final states
    const translateY = initialY + (finalY - initialY) * progress;
    const scale = initialScale + (finalScale - initialScale) * progress;
    const opacity = initialOpacity + (finalOpacity - initialOpacity) * progress;
    
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: index, // Earlier cards appear below
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, opacity'
    };
  };

  return (
    <section className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
      py-20 md:py-32 relative overflow-hidden
      transition-colors duration-300
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <h2 className={`
          text-3xl sm:text-4xl md:text-5xl 
          font-bold text-center mb-16
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          relative
        `}>
          <span className="relative z-10">Our Expertise</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl transform -skew-y-6"></div>
        </h2>

        <div 
          ref={containerRef}
          className="relative min-h-[200vh]"
        >
          <div className="sticky top-[20vh] h-[70vh] flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              {cards.map((card, index) => (
                <div
                  key={card.title}
                  className="stack-card absolute inset-0"
                  style={getCardStyle(index)}
                >
                  <div className={`
                    relative overflow-hidden
                    rounded-2xl
                    ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-gray-50'}
                    backdrop-blur-sm
                    border border-transparent
                    ${theme === 'dark' ? 'hover:border-purple-500/20' : 'hover:border-purple-500/30'}
                    group
                    h-full
                    shadow-lg
                    transition-transform duration-300 ease-out
                    hover:scale-[1.02]
                    hover:shadow-xl
                  `}>
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                      <div className={`
                        absolute inset-0 z-10 
                        bg-gradient-to-b ${theme === 'dark' ? 'from-purple-500/20' : 'from-blue-500/20'} to-transparent
                        mix-blend-overlay
                      `}></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                      <h3 className={`
                        text-3xl md:text-4xl font-bold mb-4
                        ${theme === 'dark' ? 'text-white' : 'text-black'}
                      `}>
                        {card.title}
                      </h3>
                      <p className={`
                        text-lg md:text-xl
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                        max-w-2xlA
                      `}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackingCards;