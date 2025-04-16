'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [logoError, setLogoError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logoSrc = theme === 'dark' 
    ? "/logo png-01 2.png"  // dark theme logo
    : "/logo png-02 2.png" ;    // light theme logo

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
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

  useEffect(() => {
    if (isMenuOpen) {
      // Lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      setIsScrollLocked(true);
    } else {
      // Restore scroll position and unlock
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      setIsScrollLocked(false);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      setIsScrollLocked(false);
    };
  }, [isMenuOpen]);

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Close menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // If we're not already on the home page, navigate to it
    if (pathname !== '/') {
      await router.push('/');
      // Force a re-render after navigation
      router.refresh();
    } else {
      // If we're already on home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleMenuItemClick = async (path: string) => {
    setIsMenuOpen(false);
    if (path !== pathname) {
      if (path === '/work') {
        localStorage.setItem('refreshWork', 'true');
      } else if (path === '/ai-chat') {
        localStorage.setItem('refreshAiChat', 'true');
      }
      await router.push(path);
      router.refresh();
    }
  };

  const menuItems = [
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'AI Chat', path: '/ai-chat' }
  ];
  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -50 },
    open: { opacity: 1, x: 0 }
  };

  const ContactButton = () => (
    <NextLink href="/contact-us" className="group">
      <div 
        className="relative w-[160px] h-[57px] rounded-[21px] text-sm font-medium text-white overflow-hidden inline-block"
      >
        <span className="relative z-10 flex items-center justify-center w-full h-full">Contact us</span>
        <span 
          className="absolute inset-0 rounded-[21px] opacity-100"
          style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
            padding: '1px',
            content: "''",
            zIndex: 0,
          }}
        ></span>
        <span className="absolute inset-[1px] bg-[#282B2C] rounded-[21px] z-[1]"></span>
        <span 
          className="absolute inset-0 rounded-[21px] opacity-75 blur-[2px]"
          style={{
            background: 'linear-gradient(90deg, #F1967D, #C93F80, #955DDC, #7071E9, #1CB0CE)',
            content: "''",
            zIndex: -1,
          }}
        ></span>
      </div>
    </NextLink>
  );

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className={`focus:outline-none p-2 ${theme === 'dark' ? 'text-yellow-500' : 'text-gray-800'}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IoSunnyOutline className="h-5 w-5" />
      ) : (
        <IoMoonOutline className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <>
      <header 
        ref={headerRef}
        className={`py-4 px-4 sm:px-6 md:px-8 xl:px-[122px] 
          flex items-center justify-between fixed top-0 left-0 right-0 z-[99] 
          h-[70px] sm:h-[80px] md:h-[90px] xl:h-[100px]
           duration-300 ease-in-out transition-all
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled 
            ? theme === 'dark' 
              ? 'bg-black/30 backdrop-blur-sm' 
              : 'bg-white/30 backdrop-blur-sm' 
            : theme === 'dark'
              ? 'bg-black'
              : 'bg-white'
          }`}
      >
        <div className="flex-shrink-0 relative z-[100] flex items-center">
          <Link href="/" className="relative z-[100]" onClick={handleLogoClick}>
            <Image 
              src={logoSrc}
              alt="3RD SHADE" 
              width={180} 
              height={57} 
              priority
              className="w-[100px] sm:w-[120px] md:w-[150px] xl:w-[180px] h-auto"
              onError={() => setLogoError(true)}
              key={`logo-${theme}`}
            />
          </Link>
        </div>
        {!isMobile && (
          <nav className="hidden xl:flex flex-grow justify-center mx-4 relative z-[100]">
            <div className={`relative w-full max-w-[654px] h-[57px] rounded-[21px] overflow-hidden border ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
              <span className="absolute inset-0 rounded-[21px] opacity-100" style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.47) 0%, rgba(255,255,255,0) 100%)',
                content: "''",
                zIndex: 0,
              }}></span>
              <ul className="flex items-center justify-between h-full rounded-[21px] px-12 relative z-10"
                  style={{
                    background: theme === 'dark' 
                      ? 'linear-gradient(90deg, #4A4A4A 0%, #2B2B2B 50%, #1A1A1A 100%)'
                      : 'linear-gradient(90deg, #FFFFFF 0%, #F5F5F5 50%, #EEEEEE 100%)',
                    borderRadius: '21px',
                  }}>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.path}
                      onClick={(e) => {
                        if (item.path === '/work') {
                          e.preventDefault();
                          window.location.href = item.path;
                        }
                        if (item.path === '/ai-chat') {
                          e.preventDefault();
                          window.location.href = item.path;
                        }
                        handleMenuItemClick(item.path);
                      }}
                      className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'} transition-colors text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
        <div className="flex items-center">
          <div className="block xl:hidden relative z-[9999] mr-2">
            <ThemeToggle />
          </div>
          <div className="block xl:hidden relative z-[9999]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none p-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="relative w-8 h-8"
              >
                {isMenuOpen ? (
                  <svg 
                    className="w-full h-full" 
                    fill="none" 
                    stroke={theme === 'dark' ? 'white' : 'black'} 
                    viewBox="0 0 24 24"
                    style={{ zIndex: 9999 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-full h-full" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16m-7 6h7" 
                    />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
          {!isMobile && (
            <div className="hidden xl:flex items-center gap-6">
              <ContactButton />
              <ThemeToggle />
            </div>
          )}
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[98] xl:hidden"
            style={{
              top: '0',
              height: '100vh',
              width: '100vw',
              overflow: 'hidden',
              position: 'fixed'
            }}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed right-0 w-full h-full flex flex-col"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, #00000C 0%, #1A1A1A 100%)'
                  : 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
                paddingTop: '100px',
                top: 0,
                zIndex: 99,
                position: 'fixed',
                overflow: 'hidden'
              }}
            >
              <div className="relative z-[999] h-full flex flex-col justify-between px-6">
                <nav className="max-w-md mx-auto w-full">
                  <ul className="space-y-8">
                    {menuItems.map((item) => (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-center"
                      >
                        <Link 
                          href={item.path}
                          onClick={(e) => {
                            if (item.path === '/work') {
                              e.preventDefault();
                              window.location.href = item.path;
                            }
                            handleMenuItemClick(item.path);
                          }}
                          className={`${theme === 'dark' ? 'text-white' : 'text-black'} 
                            text-3xl font-medium flex items-center justify-center`}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="pb-20 flex justify-center">
                  <ContactButton />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}