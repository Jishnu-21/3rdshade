"use client"
import React, { useEffect, useState, useRef } from 'react';
import Footer from './DarkFooter';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setScrollPosition(window.pageYOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (footerRef.current && !isMobile) {
      const footerHeight = footerRef.current.offsetHeight;
      document.body.style.minHeight = `calc(100vh + ${footerHeight}px)`;
    } else {
      document.body.style.minHeight = '100vh';
    }
  }, [isMobile]);

  // Calculate dimensions and translations only for non-mobile
  const footerHeight = footerRef.current?.offsetHeight || 0;
  const contentHeight = contentRef.current?.offsetHeight || 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const maxScrollPosition = contentHeight - windowHeight + footerHeight/1.3;
  const translateY = !isMobile ? Math.max(0, Math.min(scrollPosition, footerHeight/1.3)) : 0;

  return (
    <div className="relative min-h-screen">
      <div 
        ref={contentRef} 
        className={`relative z-10 transition-transform duration-300 ease-in-out
          ${isMobile ? 'pt-[60px] pb-[0px]' : 'pt-[80px] pb-[20px]'}`}
        style={{ 
          transform: `translateY(-${translateY}px)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={isMobile ? 'mb-4' : ''}>
            {child}
          </div>
        ))}
      </div>
      
      <Footer 
        ref={footerRef} 
        className={`${isMobile ? 'relative' : 'fixed bottom-0 left-0 right-0'} z-0`} 
      />
    </div>
  );
};

export default Layout;
