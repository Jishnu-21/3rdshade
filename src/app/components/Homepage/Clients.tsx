'use client'

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

const clients = [
  { src: '/group-5.webp', alt: 'Client Logo 1' },
  { src: '/group-84.webp', alt: 'Client Logo 2' },
  { src: '/group-2.webp', alt: 'Client Logo 3' },
  { src: '/group-85.webp', alt: 'Client Logo 4' },
  { src: '/group-3-300x103.webp', alt: 'Client Logo 5' },
  { src: '/group-83-300x100.webp', alt: 'Client Logo 6' },
  { src: '/group-300x95.webp', alt: 'Client Logo 7' },
  { src: '/clients.png', alt: 'Client Logo 8' },
  { src: '/clients.png', alt: 'Client Logo 9' },
  { src: '/clients.png', alt: 'Client Logo 10' },
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
                      mx-4 sm:mx-6 md:mx-8 flex items-center justify-center`}
                  >
                    <div className="relative w-[100px] h-[50px] sm:w-[120px] sm:h-[60px] md:w-[140px] md:h-[70px]">
                      <Image 
                        src={client.src} 
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
                      mx-4 sm:mx-6 md:mx-8 flex items-center justify-center`}
                  >
                    <div className="relative w-[100px] h-[50px] sm:w-[120px] sm:h-[60px] md:w-[140px] md:h-[70px]">
                      <Image 
                        src={client.src} 
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