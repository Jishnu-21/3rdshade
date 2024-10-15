import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

interface FooterProps {
  className?: string;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className = '' }, ref) => {
  return (
    <footer ref={ref} className={`bg-white text-black mt-36 pt-24 pb-12 px-4 ${className}`}> {/* Increased mt-36 and pt-24 */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-32 flex justify-center">
          <Image 
            src="/footer-logo.png" 
            alt="3RD SHADE" 
            width={900} 
            height={84} 
            className="w-full h-auto max-w-full"
          />
        </div>
        <div className="mx-[-4rem] mb-20">
          <hr className="border-t border-black w-full" />
        </div>
        <div className="flex flex-wrap justify-between items-start">
          <div className="flex space-x-10 mb-10 md:mb-0">
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaLinkedinIn size={28} />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaInstagram size={28} />
            </Link>
            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaYoutube size={28} />
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
              <FaFacebookF size={28} />
            </Link>
          </div>
          <nav className="flex flex-wrap space-x-10 mb-10 md:mb-0 text-base">
            <Link href="/about" className="hover:text-gray-600">About</Link>
            <Link href="/contact" className="hover:text-gray-600">Contact</Link>
            <Link href="/case-studies" className="hover:text-gray-600">Case Studies</Link>
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
          </nav>
          <div className="text-sm text-gray-600 text-right">
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