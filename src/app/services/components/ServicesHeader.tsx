import React from 'react';

const ServicesHeader: React.FC = () => {
  return (
    <div className="services-header bg-white py-16 sm:py-24 md:py-32 lg:pt-[180px] lg:pb-[180px]">
      <div className="container px-4 md:px-[122px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16">
        <h1 className="text-4xl text-black sm:text-5xl md:text-6xl lg:text-[64px] font-bold">Services</h1>
        <p className="text-lg sm:text-xl text-black max-w-md">
          Interact with your users on the platform they prefer. Web and mobile - we have you covered.
        </p>
      </div>
    </div>
  );
};

export default ServicesHeader;