'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down and not at top
      else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      // Set transparency
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const menuItems = ['Home', 'Work', 'About Us', 'Careers'];

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 }
  };

  const ContactButton = () => (
    <Link href="/contact-us" className="group">
      <div 
        className="relative w-[160px] h-[57px] rounded-full text-sm font-medium text-white overflow-hidden inline-block"
      >
        <span className="relative z-10 flex items-center justify-center w-full h-full">Contact us</span>
        <span 
          className="absolute inset-0 rounded-full opacity-100"
          style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
            padding: '1px',
            content: "''",
            zIndex: 0,
          }}
        ></span>
        <span className="absolute inset-[1px] bg-[#282B2C] rounded-full z-[1]"></span>
        <span 
          className="absolute inset-0 rounded-full opacity-75 blur-[2px]"
          style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
            content: "''",
            zIndex: -1,
          }}
        ></span>
      </div>
    </Link>
  );

  return (
    <>
      <header 
        ref={headerRef}
        className={`py-4 px-4 sm:px-6 md:px-8 lg:px-[122px] 
          flex items-center justify-between fixed top-0 left-0 right-0 z-[999] 
          h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px]
          transition-all duration-300
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled ? 'bg-black/30 backdrop-blur-sm' : 'bg-black'}`}
      >
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="/logo png-01 2.png" 
              alt="3RD SHADE" 
              width={180} 
              height={57} 
              className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] h-auto"
            />
          </Link>
        </div>
        {!isMobile && (
          <nav className="hidden lg:flex flex-grow justify-center mx-4">
            <div className="relative w-full max-w-[654px] h-[57px] rounded-full overflow-hidden border border-white">
              <span className="absolute inset-0 rounded-full opacity-100" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.47) 0%, rgba(255,255,255,0) 100%)',
                content: "''",
                zIndex: 0,
              }}></span>
              <ul className="flex items-center justify-between h-full rounded-full px-12 relative z-10"
                  style={{
                    background: 'linear-gradient(90deg, #4A4A4A 0%, #2B2B2B 50%, #1A1A1A 100%)'
                  }}>
                {menuItems.map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
        <div className={`${isMobile ? 'block' : 'hidden'} lg:hidden`}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-white focus:outline-none p-2 z-[1000] ${!isMobile && 'hidden'}`}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        {!isMobile && (
          <div className="flex-shrink-0">
            <ContactButton />
          </div>
        )}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-[105] lg:hidden"
              style={{ top: '70px' }}
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="absolute inset-y-0 right-0 max-w-sm w-full sm:w-[320px] md:w-[380px] shadow-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #282B2C 0%, #1A1A1A 100%)',
                }}
              >
                <div className="relative z-10 h-full">
                  <nav className="px-4 sm:px-6 pt-6">
                    <ul className="space-y-4 sm:space-y-6">
                      {menuItems.map((item) => (
                        <motion.li
                          key={item}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, x: 10, color: "#ffffff" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link 
                            href={`/${item.toLowerCase().replace(' ', '-')}`} 
                            className="text-gray-300 transition-colors text-xl sm:text-2xl font-medium flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-[250px] flex justify-center">
                    <ContactButton />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
