'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function LightHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY === 0) {
          setIsVisible(true);
        } else if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

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
    <Link href="/contact-us" className="group">
      <motion.div 
        className="relative w-[160px] h-[57px] rounded-full text-sm font-medium text-white overflow-hidden inline-block"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="relative z-10 flex items-center justify-center w-full h-full text-white">Contact us</span>
        <span className="absolute inset-0 bg-black rounded-full"></span>
      </motion.div>
    </Link>
  );

  return (
    <header 
      ref={headerRef}
      className={`bg-white pt-4 pb-4 px-4 md:px-[122px] flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex-shrink-0">
        <Link href="/">
          <Image 
            src="/logo png-02 2.png" 
            alt="3RD SHADE" 
            width={180} 
            height={57} 
            className="w-[120px] h-auto md:w-[180px]"
          />
        </Link>
      </div>
      {!isMobile && (
        <nav className="hidden md:flex flex-grow justify-center mx-4">
          <div className="relative w-[654px] h-[57px] rounded-full overflow-hidden border border-gray-200">
            <ul className="flex items-center justify-between h-full rounded-full px-12 relative z-10 bg-white bg-opacity-50">
              {menuItems.map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
      {isMobile ? (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      ) : (
        <div className="flex-shrink-0">
          <ContactButton />
        </div>
      )}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white bg-opacity-90 z-50"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute inset-y-0 right-0 max-w-sm w-full bg-gradient-to-b from-gray-100 to-white shadow-xl"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-4 pb-6 flex justify-center">
                <ContactButton />
              </div>
              <nav className="px-4">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 10, color: "#000000" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-gray-600 transition-colors text-2xl font-medium flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}