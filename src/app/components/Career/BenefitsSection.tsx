"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { useInView } from 'react-intersection-observer';

const BenefitsSection = () => {
  const { theme } = useTheme();
  const [gradientWidth, setGradientWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);

  // Create refs for each benefit item with triggerOnce: false to allow reverse animation
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Adjusted calculation to show all benefits within the section
        const visiblePercentage = Math.max(
          0,
          Math.min(
            100,
            ((windowHeight - rect.top) / (windowHeight * 0.8)) * 100 // Reduced scroll area
          )
        );
        
        setGradientWidth(visiblePercentage);

        // Show benefits more quickly
        const newVisibleBenefits = [];
        const threshold = visiblePercentage / 20; // Reduced from 33.33 to show benefits faster

        if (threshold >= 1) newVisibleBenefits.push(0);
        if (threshold >= 1.5) newVisibleBenefits.push(1);
        if (threshold >= 2) newVisibleBenefits.push(2);

        setVisibleBenefits(newVisibleBenefits);
      }
    };

    // Throttle scroll handler for smoother animations
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  const scrollToOpenings = () => {
    const openingsSection = document.getElementById('current-openings');
    if (openingsSection) {
      openingsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const benefits = [
    { title: 'Health Insurance', ref: ref1, inView: inView1 },
    { title: 'Hybrid culture', ref: ref2, inView: inView2 },
    { title: 'Upskill Programs', ref: ref3, inView: inView3 }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`benefits-section ${theme === 'light' ? 'bg-black' : 'bg-white'} 
        ${theme === 'dark' ? 'text-black' : 'text-white'} 
        py-12 sm:py-16 md:py-20 lg:py-24`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-[600px]">
            We put you first.<br />Always.
          </h2>
          <button onClick={scrollToOpenings} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden 
            text-base sm:text-lg font-semibold rounded-full group 
            bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 
            hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 
            hover:text-white focus:ring-4 focus:outline-none 
            focus:ring-purple-200 dark:focus:ring-purple-800
            w-full lg:w-auto cursor-pointer">
            <span className={`relative px-6 sm:px-8 py-2.5 sm:py-3 transition-all ease-in duration-75 
              ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full 
              group-hover:bg-opacity-0 w-full lg:w-auto text-center`}>
              Explore our jobs
            </span>
          </button>
        </div>

        {/* Gradient Divider with faster transition */}
        <div className="h-1 sm:h-1.5 md:h-2 w-full bg-gray-200 relative overflow-hidden mb-8 sm:mb-12 md:mb-16">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${gradientWidth}%` }}
          />
        </div>

        {/* Benefits Grid with adjusted timing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefit.ref}
              className={`benefit-item p-4 sm:p-6 md:p-8 transform transition-all duration-500
                ${visibleBenefits.includes(index)
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'}`}
              style={{
                transitionDelay: `${index * 150}ms` // Reduced delay between items
              }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                {benefit.title}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} 
                text-sm sm:text-base md:text-lg leading-relaxed`}
              >
                Like our design, the qualities that sets us apart are simple
                and yet amazing. We won&apos;t promise you the world when you
                come to work with us, but we will commit to uphold the
                values that make 3rd shade a great place to work at.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
