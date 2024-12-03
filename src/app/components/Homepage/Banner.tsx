'use client';

import React, { useState, useEffect } from 'react';
import GradientButton from '../GradientButton';
import { Noto_Sans, Noto_Sans_Arabic, Montserrat } from 'next/font/google';
import { useTheme } from '@/app/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Load fonts
const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['devanagari'],
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
});

// Load Montserrat font with only regular and bold weights
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const translations = [
  { language: 'Marketing', word: 'Marketing', font: '' },
  { language: 'Marketing', word: 'Consulting', font: '' },
  { language: 'Marketing', word: 'Designing', font: '' },
  { language: 'Marketing', word: 'Storytelling', font: '' },
  { language: 'Marketing', word: 'Likes', font: '' },
  { language: 'Marketing', word: 'Reach', font: '' },
  { language: 'Marketing', word: 'Engagement', font: '' },
  { language: 'Marketing', word: 'Campaigns', font: '' },
  { language: 'Marketing', word: 'Advertising', font: '' },
  { language: 'Marketing', word: 'Influencers', font: '' }
];

const Banner: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showColorSplash, setShowColorSplash] = useState(false);
  const [splashPosition, setSplashPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length);
        setIsAnimating(false);
      }, 500); // Half of the animation duration
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const flipVariants = {
    initial: {
      rotateX: 0,
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      rotateX: -180,
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { 
        duration: 0.4,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    },
    enter: {
      rotateX: 0,
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };

  const glowVariants = {
    initial: {
      opacity: 0.5,
      scale: 1
    },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    setSplashPosition({ x, y });
    setShowColorSplash(true);

    // Create multiple ripple effects
    const createRipple = (delay: number, scale: number) => {
      setTimeout(() => {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = `conic-gradient(from ${Math.random() * 360}deg, 
          #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)`;
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = `ripple 1.5s ease-out forwards`;
        ripple.style.zIndex = '100';
        ripple.style.mixBlendMode = 'overlay';
        ripple.style.pointerEvents = 'none';
        const bannerElement = document.querySelector('.banner-container');
        if (bannerElement) {
          bannerElement.appendChild(ripple);
        }

        setTimeout(() => ripple.remove(), 1500);
      }, delay);
    };

    // Create multiple ripples with different delays and scales
    for (let i = 0; i < 5; i++) {
      createRipple(i * 100, 10 + i * 2);
    }

    // Reset main splash after animation
    setTimeout(() => {
      setShowColorSplash(false);
    }, 1500);
  };

  const getCurrentWordStyle = () => ({
    fontFamily: translations[currentIndex].font,
    direction: 'ltr' as const
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`fixed top-0 left-0 right-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
        ${theme === 'dark' ? 'text-white' : 'text-black'} h-screen 
        flex flex-col items-center justify-center 
        text-center px-4 sm:px-6 md:px-8 xl:px-[122px] 2xl:px-[150px] 3xl:px-[180px] 4xl:px-[200px]
        overflow-hidden z-10 ${montserrat.className} banner-container`}
    >
      {/* Glow effects with fade - only show in dark theme */}
      <div 
        className="absolute top-[40%] left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
        style={{
          background: theme === 'dark' 
            ? `radial-gradient(
                circle at center,
                rgba(39, 153, 231, 0.08) 0%,
                rgba(39, 153, 231, 0.05) 30%,
                rgba(39, 153, 231, 0.02) 60%,
                transparent 80%
              )`
            : 'none',
          filter: theme === 'dark' ? 'blur(70px)' : 'none',
          zIndex: 0,
          opacity: theme === 'dark' ? Math.max(0, 1 - (scrollProgress * 2)) : 0
        }}
      />
      
      <div 
        className="absolute top-[40%] left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, rgba(39, 153, 231, 0.1) 0%, transparent 70%)'
            : 'none',
          filter: theme === 'dark' ? 'blur(60px)' : 'none',
          zIndex: 0,
          opacity: theme === 'dark' ? Math.max(0, 1 - (scrollProgress * 2)) : 0
        }}
      />
      
      <div 
        className="absolute top-[40%] left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at center, rgba(39, 153, 231, 0.15) 0%, transparent 60%)'
            : 'none',
          filter: theme === 'dark' ? 'blur(50px)' : 'none',
          zIndex: 0,
          opacity: theme === 'dark' ? Math.max(0, 1 - (scrollProgress * 2)) : 0
        }}
      />
      
      {/* Color splash overlay */}
      <AnimatePresence>
        {showColorSplash && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 15],
                opacity: [1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
              style={{
                position: 'fixed',
                left: splashPosition.x,
                top: splashPosition.y,
                width: '100px',
                height: '100px',
                background: 'conic-gradient(from 0deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)',
                borderRadius: '50%',
                zIndex: 100,
                transformOrigin: 'center center',
                pointerEvents: 'none',
                mixBlendMode: 'overlay'
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                zIndex: 99,
                pointerEvents: 'none'
              }}
            />
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
          }
        }
      `}</style>

      {/* Content with fade */}
      <motion.div 
        variants={itemVariants} 
        className="w-full relative z-10 max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px] mx-auto"
        style={{ 
          opacity: Math.max(0, 1 - (scrollProgress * 2)),
          visibility: scrollProgress >= 0.5 ? 'hidden' : 'visible'
        }}
      >
        <h2 className={`text-[13px] 2xl:text-[16px] 3xl:text-[20px] 4xl:text-[24px]
          ${theme === 'dark' ? 'text-[#4A9EDE]' : 'text-[#2779BD]'} 
          tracking-[0.15em] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6 font-normal`}
        >
        Welcome to the Digital Universe of 3rd Shade
        </h2>
        <h1 className="text-[50px] sm:text-[65px] md:text-[85px] lg:text-[110px] xl:text-[130px] 
          2xl:text-[150px] 3xl:text-[170px] 4xl:text-[190px]
          font-bold leading-[1.1] mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10 max-w-[1400px] mx-auto"
        >
          <span className={`${theme === 'dark' ? 'text-white' : 'text-black'} block mb-2`}>A Relm of</span>
          <motion.div
            style={{ 
              perspective: 2000,
              transformStyle: 'preserve-3d'
            }}
            className="inline-block"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                variants={flipVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className={`bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE] 
                  text-transparent bg-clip-text inline-block transition-all duration-300 
                  ease-in-out ${translations[currentIndex].font}`}
                style={{
                  ...getCurrentWordStyle(),
                  letterSpacing: '-0.02em',
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              >
                {translations[currentIndex].word}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>
        <p className={`text-[15px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[26px]
          leading-[2] ${theme === 'dark' ? 'text-[#4A9EDE]' : 'text-[#2779BD]'} 
          mx-auto mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12
          max-w-[800px] 2xl:max-w-[900px] 3xl:max-w-[1000px] 4xl:max-w-[1200px] font-normal
          tracking-wide`}
        >
          &apos;Beauty lies in the eyes of the Be-holder&apos;
          The success of your Business lies in how your audience perceives it, not how you do it.
          &apos;It all lies in the Perspective&apos;. We stand for &apos;Where Marketing Meets Perspective&apos;.
        </p>
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingVariants}
          className="relative"
        >
          <motion.div
            variants={glowVariants}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, 
                ${theme === 'dark' ? 'rgba(74, 158, 222, 0.3)' : 'rgba(39, 121, 189, 0.2)'} 0%, 
                transparent 70%)`,
              filter: 'blur(15px)',
              transform: 'scale(1.2)'
            }}
          />
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <GradientButton text="Let's Try Different" onClick={handleButtonClick} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
