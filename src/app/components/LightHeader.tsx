'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LightHeader() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
    const initialIsMobile = window.innerWidth < 768;
    setIsMobile(initialIsMobile);
  }, []);

  // Handle resize
  useEffect(() => {
    if (!mounted) return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mounted]);

  // Handle scroll
  useEffect(() => {
    if (!mounted) return;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, mounted]);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  // Rest of your component remains the same
  const menuItems = ['Home', 'About Us', 'Solutions', 'Work', 'Careers'];

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 }
  };

  const ContactButton = () => (
    <Link href="/contact-us" className="group block">
      <motion.div 
        className="relative h-[40px] sm:h-[45px] md:h-[50px] lg:h-[57px] rounded-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="absolute inset-0 bg-black rounded-full"></span>
        <span className="relative z-10 flex items-center justify-center w-full h-full text-white text-xs sm:text-sm md:text-base font-medium px-4 sm:px-6">
          Contact us
        </span>
      </motion.div>
    </Link>
  );

  return (
    <header 
      ref={headerRef}
      className={`
        bg-white 
        py-2 sm:py-3 md:py-4 
        px-4 sm:px-6 md:px-8 lg:px-[122px] 
        flex items-center justify-between 
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 
        shadow-sm
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image 
            src="/logo png-02 2.png" 
            alt="3RD SHADE" 
            width={180} 
            height={57} 
            className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] h-auto"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="hidden md:flex flex-grow justify-center mx-2 lg:mx-4">
          <div className="relative w-full max-w-[654px] h-[45px] md:h-[50px] lg:h-[57px] rounded-full overflow-hidden border border-gray-200">
            <ul className="flex items-center justify-between h-full rounded-full px-4 sm:px-8 lg:px-12 relative z-10 bg-white bg-opacity-50">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-800 hover:text-gray-600 transition-colors text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* Mobile Menu Button */}
      {isMobile ? (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      ) : (
        <div className="flex-shrink-0">
          <ContactButton />
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute inset-y-0 right-0 max-w-[320px] w-full bg-white shadow-xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Image 
                  src="/logo png-02 2.png" 
                  alt="3RD SHADE" 
                  width={120} 
                  height={38} 
                  className="w-[100px] h-auto"
                />
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-2 text-gray-800"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="px-4 py-6">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-b border-gray-100 pb-3"
                    >
                      <Link 
                        href={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-gray-800 text-lg sm:text-xl font-medium flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Contact Button */}
              <div className="absolute bottom-8 left-0 right-0 px-4">
                <ContactButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}