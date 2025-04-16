'use client';

import React, { useState, useEffect } from 'react';
import GradientButton from '../GradientButton';
import { Noto_Sans, Noto_Sans_Arabic, Montserrat } from 'next/font/google';
import { useTheme } from '@/app/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

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
  { language: 'en', word: 'Marketing', font: '' },
  { language: 'en', word: 'Consulting', font: '' },
  { language: 'en', word: 'Designing', font: '' },
  { language: 'en', word: 'Storytelling', font: '' },
  { language: 'en', word: 'Likes', font: '' },
  { language: 'en', word: 'Reach', font: '' },
  { language: 'en', word: 'Engagement', font: '' },
  { language: 'en', word: 'Campaigns', font: '' },
  { language: 'en', word: 'Advertising', font: '' },
  { language: 'en', word: 'Influencers', font: '' }
];

const Banner: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const { theme } = useTheme();
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showColorSplash, setShowColorSplash] = useState(false);
  const [splashPosition, setSplashPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 300); // Faster cursor blink

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const targetWord = translations[currentIndex].word;
    const typingSpeed = isDeleting ? 50 : 70; // Faster typing and deleting

    const handleTyping = () => {
      setCurrentWord((prev) => {
        if (!isDeleting) {
          if (prev.length < targetWord.length) {
            return targetWord.slice(0, prev.length + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1000); // Shorter pause before deleting
            return prev;
          }
        } else {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length);
            return prev;
          }
        }
      });
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [currentWord, isDeleting, currentIndex]);

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
        // Adjusted gradient for blue tones in dark theme
        ripple.style.background = theme === 'dark' 
          ? `conic-gradient(from ${Math.random() * 360}deg, #1E3A8A, #2563EB, #3B82F6, #60A5FA, #1E3A8A)`
          : `conic-gradient(from ${Math.random() * 360}deg, #FF4E50, #FC913A, #F9D423, #EDE574, #FF4E50)`;
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = `ripple 1.5s ease-out forwards`;
        ripple.style.zIndex = '100';
        ripple.style.mixBlendMode = theme === 'dark' ? 'overlay' : 'soft-light';
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

    // Add smooth scroll to Brands section with offset
    const brandsSection = document.getElementById('brands');
    if (brandsSection) {
      const headerOffset = 0; // Adjust this value if you have a fixed header
      const offsetPosition = brandsSection.getBoundingClientRect().top + window.pageYOffset - headerOffset+1250;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    
      });
    }

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
        text-center px-3 xs:px-4 sm:px-6 md:px-8 xl:px-[122px] 2xl:px-[150px] 3xl:px-[180px] 4xl:px-[200px]
        overflow-hidden z-10 ${montserrat.className} banner-container`}
    >
      {/* Glow effects with fade - only show in dark theme */}
      <div 
        className="absolute top-[40%] left-1/2 w-[300px] xs:w-[400px] sm:w-[600px] md:w-[800px] lg:w-[900px] h-[300px] xs:h-[400px] sm:h-[600px] md:h-[800px] lg:h-[900px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
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
        className="absolute top-[40%] left-1/2 w-[200px] xs:w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
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
        className="absolute top-[40%] left-1/2 w-[150px] xs:w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] h-[150px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
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
                opacity: [0.8, 0]
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
                background: theme === 'dark'
                  ? 'conic-gradient(from 0deg, #1E3A8A, #2563EB, #3B82F6, #60A5FA, #1E3A8A)'
                  : 'conic-gradient(from 0deg, #FF4E50, #FC913A, #F9D423, #EDE574, #FF4E50)',
                borderRadius: '50%',
                zIndex: 100,
                transformOrigin: 'center center',
                pointerEvents: 'none',
                mixBlendMode: theme === 'dark' ? 'overlay' : 'soft-light'
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: theme === 'dark'
                  ? 'radial-gradient(circle at center, rgba(30, 58, 138, 0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(255,0,0,0.08) 0%, transparent 70%)',
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
        className="w-full relative z-10 max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px] mx-auto pt-[60px] xs:pt-[70px] sm:pt-[80px] md:pt-[90px] lg:pt-[100px]"
        style={{ 
          opacity: window.innerWidth <= 768 
            ? Math.max(0, 1 - (scrollProgress * 3)) // Faster fade on mobile
            : Math.max(0, 1 - (scrollProgress * 2)),
          visibility: scrollProgress >= (window.innerWidth <= 768 ? 0.4 : 0.5) ? 'hidden' : 'visible'
        }}
      >
        <h1 className={`text-[10px] xxs:text-[11px] xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[20px] 3xl:text-[22px] 4xl:text-[24px]
          ${theme === 'dark' ? 'text-white' : 'text-black'} 
          tracking-[0.15em] mb-1 xs:mb-2 sm:mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6 font-normal`}
        >
        Welcome to the Digital Universe of 3rd Shade
        </h1>
        <h2 className="text-[42px] xxs:text-[56px] xs:text-[60px] sm:text-[70px] md:text-[80px] lg:text-[80px] xl:text-[100px] 
          2xl:text-[120px] 3xl:text-[140px] 4xl:text-[160px]
          font-bold leading-[1.1] mb-2 xs:mb-3 sm:mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10 max-w-[1400px] mx-auto"
        >
          <span className={`${theme === 'dark' ? 'text-white' : 'text-black'} block mb-0 xs:mb-1 sm:mb-2`}>A Realm of</span>
          <span 
            className={`bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE] text-transparent bg-clip-text inline-block transition-all duration-300 ease-in-out ${translations[currentIndex].font}`}
            style={{
              ...getCurrentWordStyle(),
              letterSpacing: '-0.02em',
            }}
          >
            {currentWord}
            <span 
              className={`inline-block w-[2px] xs:w-[3px] h-[1em] ml-1 align-middle ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE]`}
              style={{ 
                transform: 'translateY(-0.1em)',
                transition: 'opacity 0.1s ease-in-out'
              }}
            />
          </span>
        </h2>
        <p className={`text-[12px] xxs:text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[19px] 3xl:text-[20px]
          leading-[1.6] xs:leading-[1.7] sm:leading-[1.8] ${theme === 'dark' ? 'text-white/90' : 'text-black/90'} 
          mx-[10px] xxs:mx-[15px] xs:mx-[20px] sm:mx-[40px] md:mx-[60px] lg:mx-[100px] xl:mx-[120px] 2xl:mx-[140px] 3xl:mx-[160px] 
          mb-3 xs:mb-4 sm:mb-5 md:mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12
          font-normal tracking-wide max-w-[800px] sm:max-w-[1000px] md:max-w-[1200px] lg:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1600px] 4xl:max-w-[1800px]`}
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