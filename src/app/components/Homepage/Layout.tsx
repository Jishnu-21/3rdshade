"use client"
import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
      if (window.pageYOffset > window.innerHeight * 0.6) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (footerRef.current) {
      const footerHeight = footerRef.current.offsetHeight;
      document.body.style.minHeight = `calc(100vh + ${footerHeight}px)`;
    }
  }, []);

  const footerHeight = footerRef.current?.offsetHeight || 0;

  const translateY = Math.max(0, Math.min(scrollPosition / 1.5, footerHeight));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div 
          ref={contentRef} 
          className="relative z-10 transition-transform duration-300 ease-in-out"
          style={{ 
            transform: footerVisible ? `translateY(-${translateY}px)` : 'none'
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index}>
              {child}
            </div>
          ))}
        </div>
      </main>
      <Footer 
        ref={footerRef} 
        isVisible={footerVisible}
        className={`fixed bottom-0 left-0 right-0 z-0 transition-all duration-500
          ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`} 
      />
    </div>
  );
};

export default Layout;