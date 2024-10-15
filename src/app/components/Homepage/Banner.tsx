'use client';

import React, { useState, useEffect } from 'react';

const translations = [
  { language: 'English', word: 'Different' },
  { language: 'Hindi', word: 'अलग' },
  { language: 'Marathi', word: 'वेगळे' },
  { language: 'Arabic', word: 'مختلف' },
];

const Banner = () => {
  const [currentWord, setCurrentWord] = useState(translations[0].word);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * translations.length);
      setCurrentWord(translations[randomIndex].word);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-blue-300 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">
          Breaking the norms of Marketing Because
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-[#F1967D] via-[#C93F80] to-[#1CB0CE] text-transparent bg-clip-text inline-block transition-all duration-300 ease-in-out">
            {currentWord}
          </span>
          <span className="text-white"> is the</span>
          <br className="hidden sm:block" />
          <span className="text-white">New Digital</span>
        </h1>
        <p className="text-blue-300 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
          It's not just about having a website or social media presence, We understand you and your
          brand to market in a unique way.
        </p>
        <button className="relative w-[200px] h-[50px] sm:h-[60px] rounded-full text-base sm:text-lg font-medium text-white overflow-hidden group">
          <span className="relative z-10">Let's Try Different</span>
          <span className="absolute inset-0 rounded-full opacity-100 animate-gradient-x" style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)',
            backgroundSize: '300% 100%',
            padding: '2px',
            content: "''",
            zIndex: 0,
          }}></span>
          <span className="absolute inset-[2px] bg-[#282B2C] rounded-full z-[1]"></span>
          <span className="absolute inset-0 rounded-full opacity-75 blur-[2px] animate-gradient-x" style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE, #F1967D)',
            backgroundSize: '300% 100%',
            content: "''",
            zIndex: -1,
          }}></span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
