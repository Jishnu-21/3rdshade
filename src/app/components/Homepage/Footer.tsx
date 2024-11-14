import React, { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {
  className?: string;
  isVisible?: boolean;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className = '', isVisible = false }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className={`transition-all duration-500 ${className}`}>
      <AnimatePresence>
        {isLoaded ? (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-black pt-16 sm:pt-24 md:pt-36 pb-8 sm:pb-12 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-16 sm:mb-24 md:mb-32 flex justify-center">
                <Image 
                  src="/footer-logo.png" 
                  alt="3RD SHADE" 
                  width={900} 
                  height={84} 
                  className="w-full h-auto max-w-full"
                  priority={isVisible}
                />
              </div>
              <div className="mx-[-1rem] sm:mx-[-2rem] md:mx-[-4rem] mb-10 sm:mb-16 md:mb-20">
                <hr className="border-t border-black w-full" />
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start">
                <div className="flex space-x-6 sm:space-x-10 mb-8 sm:mb-10 md:mb-0 order-2 sm:order-1">
                  <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    <FaLinkedinIn size={24} />
                  </Link>
                  <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    <FaInstagram size={24} />
                  </Link>
                  <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    <FaYoutube size={24} />
                  </Link>
                  <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
                    <FaFacebookF size={24} />
                  </Link>
                </div>
                <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 md:space-x-10 mb-8 sm:mb-10 md:mb-0 text-sm sm:text-base order-1 sm:order-2">
                  <Link href="/about" className="hover:text-gray-600 mb-2 sm:mb-0">About</Link>
                  <Link href="/contact" className="hover:text-gray-600 mb-2 sm:mb-0">Contact</Link>
                  <Link href="/case-studies" className="hover:text-gray-600 mb-2 sm:mb-0">Case Studies</Link>
                  <Link href="/blog" className="hover:text-gray-600 mb-2 sm:mb-0">Blog</Link>
                  <Link href="/privacy" className="hover:text-gray-600 mb-2 sm:mb-0">Privacy</Link>
                </nav>
                <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right order-3">
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
            className="bg-black w-full h-full min-h-[400px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

Footer.displayName = 'Footer';

export default Footer;