'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    const ensureBlackBackground = () => {
      if (headerRef.current) {
        headerRef.current.style.backgroundColor = 'black';
      }
    };

    window.addEventListener('scroll', ensureBlackBackground);
    return () => window.removeEventListener('scroll', ensureBlackBackground);
  }, []);

  const menuItems = ['Home', 'Solutions', 'Work', 'About Us', 'Careers'];

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
    <header 
      ref={headerRef}
      className="pt-4 pb-4 px-4 md:px-[122px] flex items-center justify-between fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: 'black' }}
    >
      <div className="flex-shrink-0">
        <Link href="/">
          <Image 
            src="/logo png-01 2.png" 
            alt="3RD SHADE" 
            width={180} 
            height={57} 
            className="w-[120px] h-auto md:w-[180px]"
          />
        </Link>
      </div>
      {!isMobile && (
        <nav className="hidden md:flex flex-grow justify-center mx-4">
          <div className="relative w-[654px] h-[57px] rounded-full overflow-hidden border border-white">
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
      {isMobile ? (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
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
            className="fixed inset-0 bg-black bg-opacity-90 z-50"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute inset-y-0 right-0 max-w-sm w-full shadow-xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #282B2C 0%, #1A1A1A 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-50"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     backgroundSize: '30px 30px',
                   }}
              ></div>
              <div className="relative z-10">
                <div className="flex justify-end p-4">
                  <button onClick={() => setIsMenuOpen(false)} className="text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 mb-6 flex justify-center">
                  <ContactButton />
                </div>
                <nav className="px-4">
                  <ul className="space-y-6">
                    {menuItems.map((item) => (
                      <motion.li
                        key={item}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, x: 10, color: "#ffffff" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href={`/${item.toLowerCase().replace(' ', '-')}`} 
                          className="text-gray-300 transition-colors text-2xl font-medium flex items-center"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
