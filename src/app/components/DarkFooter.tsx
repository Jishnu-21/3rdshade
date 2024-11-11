import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

interface FooterProps {
  className?: string;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className = '' }, ref) => {
  return (
    <footer ref={ref} className={`bg-black text-white mt-16 sm:mt-24 md:mt-36 pt-16 sm:pt-24 md:pt-36 pb-8 sm:pb-12 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 sm:mb-24 md:mb-32 flex justify-center">
          <Image 
            src="/logo png-03 1.png" 
            alt="3RD SHADE" 
            width={900} 
            height={84} 
            className="w-full h-auto max-w-full"
          />
        </div>
        <div className="mx-[-1rem] sm:mx-[-2rem] md:mx-[-4rem] mb-10 sm:mb-16 md:mb-20">
          <hr className="border-t border-white w-full" />
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start">
          <div className="flex space-x-6 sm:space-x-10 mb-8 sm:mb-10 md:mb-0 order-2 sm:order-1">
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedinIn className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaYoutube className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaFacebookF className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 md:space-x-10 mb-8 sm:mb-10 md:mb-0 text-sm sm:text-base order-1 sm:order-2">
            <Link href="/about" className="hover:text-gray-400 mb-2 sm:mb-0">About</Link>
            <Link href="/contact" className="hover:text-gray-400 mb-2 sm:mb-0">Contact</Link>
            <Link href="/case-studies" className="hover:text-gray-400 mb-2 sm:mb-0">Case Studies</Link>
            <Link href="/blog" className="hover:text-gray-400 mb-2 sm:mb-0">Blog</Link>
            <Link href="/privacy" className="hover:text-gray-400 mb-2 sm:mb-0">Privacy</Link>
          </nav>
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right order-3">
            <p>Proudly created in India.</p>
            <p>All Rights Reserved, All Wrong Reversed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;