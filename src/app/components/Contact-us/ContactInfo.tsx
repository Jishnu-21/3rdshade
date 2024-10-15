import React from 'react';
import Image from 'next/image';

const ContactCard = ({ iconSrc, title }: { iconSrc: string; title: string }) => (
  <div className="border border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center space-y-6 w-full max-w-[494px] h-[403px]">
    <div className="w-20 h-20 relative">
      <Image
        src={iconSrc}
        alt={title}
        layout="fill"
        objectFit="contain"
      />
    </div>
    <h3 className="text-white text-2xl font-medium">{title}</h3>
  </div>
);

const ContactInfo = () => {
  return (
    <div className="bg-black pt-8 pb-24 px-4">
      <div className="max-w-[1530px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        <ContactCard iconSrc="/location@4x 1.png" title="Address" />
        <ContactCard iconSrc="/mail@4x 1.png" title="Email" />
        <ContactCard iconSrc="/call@4x 1.png" title="Phone" />
      </div>
    </div>
  );
};

export default ContactInfo;
