'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const CompanyMarquee = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const companies = [
    { name: 'Layers', icon: '/icons/layers.svg' },
    { name: 'Quotient', icon: '/icons/quotient.svg' },
    { name: 'Circooles', icon: '/icons/circooles.svg' },
    { name: 'Hourglass', icon: '/icons/hourglass.svg' },
    { name: 'Command+R', icon: '/icons/command-r.svg' },
    { name: 'Circooles', icon: '/icons/circooles.svg' },
  ];

  const duplicatedCompanies = [...companies, ...companies];

  const containerVariants = {
    hidden: { 
      y: 50,
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full bg-[#222222] py-4 sm:py-6 md:py-8 lg:py-10 border-y border-gray-800 mt-8 sm:mt-12 md:mt-16 lg:mt-24 overflow-hidden"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="relative">
        <div className="flex space-x-4 sm:space-x-8 md:space-x-12 animate-marquee whitespace-nowrap">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 text-gray-400 mx-4 sm:mx-6 md:mx-8 lg:mx-12"
            >
              <Image 
                src={company.icon}
                alt={company.name}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                priority
              />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        {/* Second marquee for smooth infinite scroll */}
        <div className="flex space-x-4 sm:space-x-8 md:space-x-12 animate-marquee2 whitespace-nowrap absolute top-0">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 md:gap-4 text-gray-400 mx-4 sm:mx-6 md:mx-8 lg:mx-12"
            >
              <Image 
                src={company.icon}
                alt={company.name}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                priority
              />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyMarquee; 