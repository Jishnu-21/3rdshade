'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
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
    <button className="relative w-[160px] h-[57px] rounded-full text-sm font-medium text-white overflow-hidden group">
      <span className="relative z-10">Contact us</span>
      <span className="absolute inset-0 rounded-full opacity-100" style={{
        background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
        padding: '1px',
        content: "''",
        zIndex: 0,
      }}></span>
      <span className="absolute inset-[1px] bg-[#282B2C] rounded-full z-[1]"></span>
      <span className="absolute inset-0 rounded-full opacity-75 blur-[2px]" style={{
        background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
        content: "''",
        zIndex: -1,
      }}></span>
    </button>
  );

  return (
    <header className="bg-black pt-4 pb-4 px-4 md:px-[122px] flex items-center justify-between">
      <div className="flex-shrink-0">
        <Image 
          src="/logo png-01 2.png" 
          alt="3RD SHADE" 
          width={180} 
          height={57} 
          className="w-[120px] h-auto md:w-[180px]"
        />
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
              className="absolute inset-y-0 right-0 max-w-sm w-full bg-gradient-to-b from-gray-900 to-black shadow-xl"
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}