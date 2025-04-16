"use client"
import React, { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
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
              pt-16 pb-8
              px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 3xl:px-16 4xl:px-20`}
          >
            <div className="max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[2000px] mx-auto">
              <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 2xl:mb-32 3xl:mb-36 4xl:mb-40 flex justify-center">
                <Image 
                  src={theme === 'dark' ? "https://res.cloudinary.com/dkgjl08a5/image/upload/v1740833679/footer-logo-dark_t1syll.png" : "https://res.cloudinary.com/dkgjl08a5/image/upload/v1740833679/footer-logo-light_c0kjyi.png"}
                  alt="3RD SHADE" 
                  width={900} 
                  height={84} 
                  className="w-full h-auto max-w-full"
                  priority={isVisible}
                />
              </div>
              
              <div className="mx-[-1rem] sm:mx-[-2rem] md:mx-[-4rem] 
                mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-18 3xl:mb-20 4xl:mb-24"
              >
                <hr className={`border-t ${theme === 'dark' ? 'border-black' : 'border-white'} w-full`} />
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start">
                <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12 2xl:space-x-14 3xl:space-x-16 4xl:space-x-20 
                  mb-6 sm:mb-8 md:mb-0 order-2 sm:order-1"
                >
                  {[/* eslint-disable @typescript-eslint/no-unused-vars */
                    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/3rd-shade" },
                    { icon: FaInstagram, href: "https://www.instagram.com/3rdshade.in/" },
                    { icon: FaFacebookF, href: "https://www.facebook.com/people/3rd-Shade/100095235566896/" }
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
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 
                        xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 3xl:w-11 3xl:h-11 4xl:w-12 4xl:h-12" />
                    </Link>
                  ))}
                </div>

                <nav className="flex flex-wrap justify-center sm:justify-start 
                  space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12 3xl:space-x-14 4xl:space-x-16
                  mb-6 sm:mb-8 md:mb-0 
                  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 
                  order-1 sm:order-2"
                >
                  {[/* eslint-disable @typescript-eslint/no-unused-vars */
                    { href: "/about", label: "About" },
                    { href: "/contact-us", label: "Contact" },
                    { href: "/blog", label: "Blog" },
                    { href: "/services", label: "Services" }
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

                <div className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl
                  ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} 
                  text-center sm:text-right order-3`}
                >
                  <p>Proudly Made in India.</p>
                  <p>All Rights Reserved.</p>
                </div>
              </div>
            </div>
          </motion.footer>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} w-full h-full 
              min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] 
              xl:min-h-[500px] 2xl:min-h-[550px] 3xl:min-h-[600px] 4xl:min-h-[650px]`}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

Footer.displayName = 'Footer';

export default Footer;