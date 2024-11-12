import React from 'react';
import Link from 'next/link';

const ValueProposition: React.FC = () => {
  return (
    <>
      <div className="bg-white h-[300px]"></div>
      
      <div className="bg-black text-white px-4 md:px-[122px] py-16 relative z-10">
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Values that<br />
              Makes 3RD SHADE<br />
              #1
            </h2>
            <button className="relative bg-transparent text-white px-14 py-3 rounded-[21px] transition-colors overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#F1967D] via-[#955DDC] to-[#1CB0CE] rounded-[21px]"></span>
              <span className="absolute inset-[1px] bg-black rounded-[21px]"></span>
              <span className="relative z-10">Get in touch</span>
            </button>
          </div>
          
          <div className="h-2 bg-gradient-to-r from-[#F1967D] via-[#955DDC] to-[#1CB0CE] mb-20"></div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-semibold mb-4">100% In-House Developers</h3>
              <p className="text-gray-400">With 30+ dedicated In-House team, we make sure to deliver top-notch quality output</p>
            </div>
            <div className="md:w-1/3">
              <h3 className="text-2xl font-semibold mb-4">Dedicated Project Manager</h3>
              <p className="text-gray-400">Communication is essential to success, we'll assign you with a dedicated project manager.</p>
            </div>
            <div className="md:w-1/3">
              <h3 className="text-2xl font-semibold mb-4">Award-Winning Team</h3>
              <p className="text-gray-400">
                Our passionate team has been acclaimed by global clients for creating out-of-the-box digital products. 
                <Link href="/portfolio" className="text-[#1CB0CE] hover:underline ml-1">
                  Take a look here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValueProposition;