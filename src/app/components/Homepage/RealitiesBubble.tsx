'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';
import { motion } from 'framer-motion';
import { FaBuilding } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const RealitiesBubble = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(pathname === '/');
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Link href="/services/realty">
        <motion.div
          className={`
            cursor-pointer
            rounded-lg
            px-3 py-2 sm:px-4 sm:py-3
            backdrop-blur-lg
            shadow-lg
            border
            flex
            items-center
            gap-2 sm:gap-3
            group
            ${theme === 'dark' 
              ? 'bg-[#2A9D8F]/20 border-[#2A9D8F]/50 hover:bg-[#2A9D8F]/30' 
              : 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30 hover:bg-[#2A9D8F]/20'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`
            ${theme === 'dark' ? 'text-[#2A9D8F]' : 'text-[#2A9D8F]'}
            text-xl sm:text-2xl
          `}>
            <FaBuilding />
          </div>
          <div className="text-left">
            <h3 className={`
              font-bold
              leading-tight
              text-sm sm:text-base
              ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
            `}>
              3rdshade<br />
              <span className="text-[#2A9D8F]">Realty</span>
            </h3>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default RealitiesBubble;
