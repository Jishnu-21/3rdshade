import React from 'react';
import ClientCard from './ClientCard';

const TopClients = () => {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 ]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-white text-center mb-8 sm:mb-10 md:mb-12">Top Clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
          <ClientCard
            logoSrc="/client1.png"
            name="Indian Food Box"
            description="Interact with your users on the platform they prefer."
          />
        </div>
      </div>
    </section>
  );
};

export default TopClients;