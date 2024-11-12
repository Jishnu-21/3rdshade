import React from 'react';

const services = [
  'Branding', 'Web Development', 'Logo Design',
  'UI/UX Design', 'Website Design', 'Packaging',
  'Mobile App Design', 'Product Feature Videos', 'Illustrations & Iconography',
  'Digital Marketing', 'Consulting Services', 'Motion Design Systems'
];

const ServicesList: React.FC = () => {
  return (
    <div className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[122px]">
        <h2 className="text-3xl text-black sm:text-4xl md:text-5xl font-bold text-center mb-16">
          Here Are Some Services<br />
          We Can Help You With
        </h2>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-start">
                <div className="w-2 h-2 bg-[#955DDC] rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-base md:text-lg text-black">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;