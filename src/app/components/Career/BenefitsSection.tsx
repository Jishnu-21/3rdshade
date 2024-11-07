import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="benefits-section bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-6xl font-bold leading-tight">
            We put you first.<br />Always.
          </h2>
          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-semibold rounded-full group bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
              Explore our jobs
            </span>
          </button>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {['Health Insurance', 'Hybrid culture', 'Upskill Programs'].map((benefit, index) => (
            <div key={index} className="benefit-item">
              <h3 className="text-2xl font-bold mb-4">{benefit}</h3>
              <p className="text-gray-300">
                Like our design, the qualities that sets us apart are simple
                and yet amazing. We won&apos;t promise you the world when you
                come to work with us, but we will commit to uphold the
                values that make 3rd shade a great place to work at.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
