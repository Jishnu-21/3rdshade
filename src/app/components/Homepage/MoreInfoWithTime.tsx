import React from 'react';
import MoreInfo from './MoreInfo';
import TimeDisplay from './TimeDisplay';

const MoreInfoWithTime = () => {
  return (
    <div className="bg-black pt-16 px-4 pb-32 rounded-b-[40px] pb-[-40px]">
      <div className="max-w-5xl mx-auto">
        <MoreInfo />
        <TimeDisplay />
      </div>
    </div>
  );
};

export default MoreInfoWithTime;