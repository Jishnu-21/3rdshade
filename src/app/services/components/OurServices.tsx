"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import { FiArrowUpRight } from 'react-icons/fi';

const services = [
  {
    name: 'Unnati',
    logo: '/unnati-logo.png',
    darkLogo: '/unnati-logo.png',
    alt: 'Unnati Service',
    path: '/services/unnati'
  },
  {
    name: 'Shuruwat',
    logo: '/shuruwat-logo.png',
    darkLogo: '/shuruwat-logo.png',
    alt: 'Shuruwat Service',
    path: '/services/shuruwat'
  },
];

const OurServices = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`w-full ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto flex flex-col">
          <div className="h-16 md:h-24" />
          
          <h2 className={`
            text-3xl sm:text-4xl md:text-5xl 
            font-bold text-center
            ${isDark ? 'text-white' : 'text-black'}
          `}>
            Our services bundled into<br />
            Two Power Products
          </h2>

          <div className="h-24 md:h-32" />

          <motion.div 
            className="flex justify-between items-center px-4 md:px-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {services.map((service, index) => (
              <Link 
                key={service.name}
                href={service.path}
                className="group relative cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 
                  }}
                  className="relative w-[280px] h-[80px] transition-transform duration-300 group-hover:scale-105"
                >
                  <Image
                    src={isDark ? service.darkLogo : service.logo}
                    alt={service.alt}
                    fill
                    className="object-contain"
                    sizes="280px"
                    priority
                  />
                  
                  <div className={`
                    absolute -top-4 -right-4 
                    w-8 h-8 rounded-full 
                    ${isDark ? 'bg-white/10' : 'bg-black/10'} 
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    group-hover:translate-x-1 group-hover:-translate-y-1
                  `}>
                    <FiArrowUpRight 
                      className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`}
                    />
                  </div>

                  <div className={`
                    absolute inset-0
                    border-2 border-transparent
                    group-hover:border-[#0066FF]
                    rounded-lg
                    transition-all duration-300
                    opacity-0 group-hover:opacity-100
                  `} />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <div className="h-24 md:h-32" />
        </div>
      </div>
    </section>
  );
};

export default OurServices; 