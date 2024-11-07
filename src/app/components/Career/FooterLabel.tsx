import React from 'react';
import TimeDisplay from './TimeDisplay';

const FooterLabel = () => {
  return (
    <div className="bg-white pt-16 px-4 pb-32 rounded-b-[40px] mb-[-40x]">
      <div className="max-w-5xl mx-auto">
        <TimeDisplay />
      </div>
    </div>
  );
};

export default FooterLabel;