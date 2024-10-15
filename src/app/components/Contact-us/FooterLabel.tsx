import React from 'react';
import ContactInfo from './ContactInfo';
import TimeDisplay from '../Homepage/TimeDisplay';

const FooterLabel = () => {
  return (
    <div className="bg-black pt-16 px-4 pb-32 rounded-b-[40px] mb-[-40px]">
      <div className="max-w-5xl mx-auto">
        <ContactInfo />
        <TimeDisplay />
      </div>
    </div>
  );
};

export default FooterLabel;