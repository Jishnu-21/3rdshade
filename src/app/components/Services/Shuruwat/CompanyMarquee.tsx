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
      y: 100,
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
      className="w-full bg-[#222222] py-10 border-y border-gray-800 mt-24 overflow-hidden"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-gray-400 mx-12"
            >
              <Image 
                src={company.icon}
                alt={company.name}
                width={40}
                height={40}
              />
              <span className="text-lg font-medium whitespace-nowrap">
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