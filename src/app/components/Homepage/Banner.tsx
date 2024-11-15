'use client';

import React, { useState, useEffect } from 'react';
import GradientButton from '../GradientButton';
import { Noto_Sans, Noto_Sans_Arabic, Montserrat } from 'next/font/google';
import { useTheme } from '@/app/context/ThemeContext';

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
  { language: 'English', word: 'Different', font: '' },
  { 
    language: 'Hindi', 
    word: 'अलग', 
    font: notoSans.className 
  },
  { 
    language: 'Marathi', 
    word: 'वेगळे', 
    font: notoSans.className 
  },
  { 
    language: 'Arabic', 
    word: 'مختلف', 
    font: notoSansArabic.className,
    direction: 'rtl'
  },
];

const Banner: React.FC<{ scrollProgress?: number }> = ({ scrollProgress = 0 }) => {
  const { theme } = useTheme();
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const targetWord = translations[currentIndex].word;
    const typingSpeed = isDeleting ? 100 : 150;

    const handleTyping = () => {
      setCurrentWord((prev) => {
        if (!isDeleting) {
          if (prev.length < targetWord.length) {
            return targetWord.slice(0, prev.length + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
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

  const getCurrentWordStyle = () => ({
    fontFamily: translations[currentIndex].font,
    direction: 'ltr' as const
  });

  return (
    <div className={`fixed top-0 left-0 right-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      ${theme === 'dark' ? 'text-white' : 'text-black'} h-screen 
      flex flex-col items-center justify-center 
      text-center px-4 sm:px-6 md:px-8 xl:px-[122px] 2xl:px-[150px] 3xl:px-[180px] 4xl:px-[200px]
      overflow-hidden z-10 ${montserrat.className}`}
    >
      {/* Glow effects with fade - only show in dark theme */}
      <div 
        className="absolute top-[40%] left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
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
      
      {/* Content with fade */}
      <div 
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
          Breaking the norms of Marketing Because
        </h2>
        <h1 className="text-[56px] sm:text-[72px] md:text-[86px] lg:text-[96px] xl:text-[110px] 
          2xl:text-[130px] 3xl:text-[160px] 4xl:text-[200px]
          font-bold leading-[1.1] mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10"
        >
          <span 
            className={`bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE] text-transparent bg-clip-text inline-block transition-all duration-300 ease-in-out ${translations[currentIndex].font}`}
            style={{
              ...getCurrentWordStyle(),
              letterSpacing: '-0.02em',
            }}
          >
            {currentWord}
            <span 
              className={`inline-block w-[3px] h-[1em] ml-1 align-middle ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE]`}
              style={{ 
                transform: 'translateY(-0.1em)',
                transition: 'opacity 0.1s ease-in-out'
              }}
            />
          </span>
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}> is the</span>
          <br />
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>New Digital</span>
        </h1>
        <p className={`text-[15px] 2xl:text-[18px] 3xl:text-[22px] 4xl:text-[26px]
          leading-[1.6] ${theme === 'dark' ? 'text-[#4A9EDE]' : 'text-[#2779BD]'} 
          mx-auto mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12
          max-w-[600px] 2xl:max-w-[700px] 3xl:max-w-[800px] 4xl:max-w-[1000px] font-normal`}
        >
          It&apos;s not just about having a website or social media presence. We understand you and your
          brand to market in a unique way.
        </p>
        <GradientButton text="Let's Try Different" />
      </div>
    </div>
  );
};

export default Banner;
