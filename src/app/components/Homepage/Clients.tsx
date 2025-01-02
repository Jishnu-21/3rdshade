'use client'

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const clients = [
  { src: '/clients/1.png', darkSrc: '/clients/2.png', alt: 'Client Logo 1' },
  { src: '/clients/5.png', darkSrc: '/clients/6.png', alt: 'Client Logo 3' },
  { src: '/clients/7.png', darkSrc: '/clients/8.png', alt: 'Client Logo 4' },
  { src: '/clients/11.png', darkSrc: '/clients/12.png', alt: 'Client Logo 6' },
  { src: '/clients/13.png', darkSrc: '/clients/14.png', alt: 'Client Logo 7' },
  { src: '/clients/15.png', darkSrc: '/clients/16.png', alt: 'Client Logo 8' },
  { src: '/clients/17.png', darkSrc: '/clients/18.png', alt: 'Client Logo 9' },
  { src: '/clients/19.png', darkSrc: '/clients/20.png', alt: 'Client Logo 10' },
  { src: '/clients/21.png', darkSrc: '/clients/22.png', alt: 'Client Logo 11' },
  { src: '/clients/23.png', darkSrc: '/clients/24.png', alt: 'Client Logo 12' },
  { src: '/clients/25.png', darkSrc: '/clients/26.png', alt: 'Client Logo 13' },
];

const ClientsMarquee = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} py-16 px-4 -mt-1 relative z-10`}>
      <h2 className="text-center text-4xl font-bold mb-12">
        <span className="bg-gradient-to-r from-red-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Clients we have worked with
        </span>
      </h2>
      <div className="overflow-hidden relative">
        <div className="marquee-container">
          {[0, 1].map((row) => (
            <div key={row} className="marquee-row">
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
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
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

        .marquee-row:nth-child(2) .marquee-content {
          animation-direction: reverse;
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

export default ClientsMarquee;