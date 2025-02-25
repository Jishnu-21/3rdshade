'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const clients = [
  { src: '/clients/2.png', darkSrc: '/clients/2.png', alt: 'Client 1' },
  { src: '/clients/14.png', darkSrc: '/clients/14.png', alt: 'Client 2' },
  { src: '/clients/6.png', darkSrc: '/clients/6.png', alt: 'Client 3' },
  { src: '/clients/8.png', darkSrc: '/clients/8.png', alt: 'Client 4' },
  { src: '/clients/10.png', darkSrc: '/clients/10.png', alt: 'Client 5' },
  { src: '/clients/12.png', darkSrc: '/clients/12.png', alt: 'Client 6' },
];

const CompanyMarquee = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} py-8 px-4 relative z-10`}>
      <div className="overflow-hidden relative">
        <div className="marquee-container">
          <div className="marquee-row">
            <div className="marquee-content">
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className={`client-logo ${theme === 'dark' ? 'opacity-100' : 'opacity-90'} 
                    mx-0 flex items-center justify-center`}
                >
                  <div className="relative w-[280px] h-[140px]">
                    <Image 
                      src={theme === 'dark' ? client.darkSrc : client.src}
                      alt={client.alt} 
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-content">
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className={`client-logo ${theme === 'dark' ? 'opacity-100' : 'opacity-90'} 
                    mx-0 flex items-center justify-center`}
                >
                  <div className="relative w-[280px] h-[140px]">
                    <Image 
                      src={theme === 'dark' ? client.darkSrc : client.src}
                      alt={client.alt} 
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          background: ${theme === 'dark' ? 'black' : 'white'};
        }

        .marquee-row {
          display: flex;
          position: relative;
          background: ${theme === 'dark' ? 'black' : 'white'};
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          padding-left: 0;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyMarquee;
