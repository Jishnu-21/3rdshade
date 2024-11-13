"use client"
import React, { useEffect, useState, useRef } from 'react';
import Footer from './DarkFooter';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
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
  const contentHeight = contentRef.current?.offsetHeight || 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const maxScrollPosition = contentHeight - windowHeight + footerHeight/1.3;
  const translateY = Math.max(0, Math.min(scrollPosition, footerHeight/1.3));

  return (
    <div className="relative">
      <div 
        ref={contentRef} 
        className="relative z-10 transition-transform duration-300 ease-in-out pt-[80px] pb-[20px]"
        style={{ transform: `translateY(-${translateY}px)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index}>
            {child}
          </div>
        ))}
      </div>
      <Footer ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0" />
    </div>
  );
};

export default Layout;
