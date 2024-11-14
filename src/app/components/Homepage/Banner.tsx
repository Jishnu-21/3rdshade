'use client';

import React, { useState, useEffect } from 'react';
import GradientButton from '../GradientButton';
import { Noto_Sans, Noto_Sans_Arabic } from 'next/font/google';

// Load fonts
const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['devanagari'],
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ['arabic'],
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

const Banner: React.FC = () => {
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
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center 
      text-center px-4 sm:px-6 md:px-8 lg:px-16 
      py-4 sm:py-12 md:py-24 relative overflow-hidden">
      {/* Main large glow effect */}
      <div 
        className="absolute top-[35%] left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(39, 153, 231, 0.08) 0%,
              rgba(39, 153, 231, 0.05) 30%,
              rgba(39, 153, 231, 0.02) 60%,
              transparent 80%
            )
          `,
          filter: 'blur(70px)',
          zIndex: 0
        }}
      />
      
      {/* Medium glow circle */}
      <div 
        className="absolute top-[35%] left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(39, 153, 231, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }}
      />
      
      {/* Center concentrated glow */}
      <div 
        className="absolute top-[35%] left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at center, rgba(39, 153, 231, 0.15) 0%, transparent 60%)',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />
      
      <div className="w-full max-w-4xl mx-auto relative z-10" style={{ bottom: '50px' }}>
      <h2 className="text-blue-300 text-sm sm:text-base md:text-lg mb-1 sm:mb-3 md:mb-4">
          Breaking the norms of Marketing Because
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-4 leading-tight">
          <span 
            className={`bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE] text-transparent bg-clip-text inline-block transition-all duration-300 ease-in-out ${translations[currentIndex].font}`}
            style={getCurrentWordStyle()}
          >
            {currentWord}
            <span 
              className={`inline-block w-[2px] h-[1em] ml-1 align-middle ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE]`}
              style={{ 
                transform: 'translateY(-0.1em)',
                transition: 'opacity 0.1s ease-in-out'
              }}
            />
          </span>
          <span className="text-white"> is the</span>
          <br className="hidden sm:block" />
          <span className="text-white">&nbsp;New Digital</span>
        </h1>
        <p className="text-blue-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto">
          It&apos;s not just about having a website or social media presence, We understand you and your
          brand to market in a unique way.
        </p>
        <GradientButton text="Let's Try Different" />
      </div>
    </div>
  );
};

export default Banner;
