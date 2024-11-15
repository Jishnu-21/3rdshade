"use client"
import React, { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';

interface FooterProps {
  className?: string;
  isVisible?: boolean;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className = '', isVisible = false }, ref) => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className={`transition-all duration-500 ${className}`}>
      <AnimatePresence mode="wait">
        {isLoaded ? (
          <motion.footer
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} 
              pt-16 sm:pt-24 md:pt-36 pb-8 sm:pb-12 px-4`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-16 sm:mb-24 md:mb-32 flex justify-center">
                <Image 
                  src={theme === 'dark' ? "/footer-logo.png" : "/logo png-03 1.png"}
                  alt="3RD SHADE" 
                  width={900} 
                  height={84} 
                  className="w-full h-auto max-w-full"
                  priority={isVisible}
                />
              </div>
              <div className="mx-[-1rem] sm:mx-[-2rem] md:mx-[-4rem] mb-10 sm:mb-16 md:mb-20">
                <hr className={`border-t ${theme === 'dark' ? 'border-black' : 'border-white'} w-full`} />
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start">
                <div className="flex space-x-6 sm:space-x-10 mb-8 sm:mb-10 md:mb-0 order-2 sm:order-1">
                  {[
                    { icon: FaLinkedinIn, href: "https://www.linkedin.com" },
                    { icon: FaInstagram, href: "https://www.instagram.com" },
                    { icon: FaYoutube, href: "https://www.youtube.com" },
                    { icon: FaFacebookF, href: "https://www.facebook.com" }
                  ].map((social, index) => (
                    <Link 
                      key={index}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${theme === 'dark' 
                        ? 'text-black hover:text-gray-600' 
                        : 'text-white hover:text-gray-400'} 
                        transition-colors duration-300`}
                    >
                      <social.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </Link>
                  ))}
                </div>
                <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 md:space-x-10 mb-8 sm:mb-10 md:mb-0 text-sm sm:text-base order-1 sm:order-2">
                  {[
                    { href: "/about", label: "About" },
                    { href: "/contact", label: "Contact" },
                    { href: "/case-studies", label: "Case Studies" },
                    { href: "/blog", label: "Blog" },
                    { href: "/privacy", label: "Privacy" }
                  ].map((link, index) => (
                    <Link 
                      key={index}
                      href={link.href} 
                      className={`${theme === 'dark' 
                        ? 'hover:text-gray-600' 
                        : 'hover:text-gray-400'} 
                        mb-2 sm:mb-0 transition-colors duration-300`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} 
                  text-center sm:text-right order-3`}
                >
                  <p>Proudly created in India.</p>
                  <p>All Rights Reserved, All Wrong Reversed.</p>
                </div>
              </div>
            </div>
          </motion.footer>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} w-full h-full min-h-[400px]`}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

Footer.displayName = 'Footer';

export default Footer;