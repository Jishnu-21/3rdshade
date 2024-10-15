'use client'

import React from 'react';
import Image from 'next/image';

const clients = Array(20).fill({ src: '/path/to/client-logo.png', alt: 'Client Logo' });

const ClientsMarquee = () => {
  return (
    <div className="bg-white py-16 px-4 -mt-1"> {/* Added -mt-1 to remove the gap */}
      <h2 className="text-center text-4xl font-bold mb-12">
        <span className="bg-gradient-to-r from-red-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Clients we have worked with
        </span>
      </h2>
      <div className="overflow-hidden">
        <div className="marquee-container">
          {[0, 1].map((row) => (
            <div key={row} className="marquee-row">
              <div className="marquee-content">
                {clients.map((client, index) => (
                  <div key={index} className="client-logo">
                    <Image src={client.src} alt={client.alt} width={80} height={40} />
                  </div>
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {clients.map((client, index) => (
                  <div key={index} className="client-logo">
                    <Image src={client.src} alt={client.alt} width={80} height={40} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsMarquee;