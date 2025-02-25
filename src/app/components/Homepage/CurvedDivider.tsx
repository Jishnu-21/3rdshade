"use client"

import React from 'react';

interface CurvedDividerProps {
  translateY: number;
}

const CurvedDivider: React.FC<CurvedDividerProps> = ({ translateY }) => {
  const curveHeight = 50; // Height of the curve
  const progress = Math.min(translateY / curveHeight, 1);
  
  // Adjust the curve based on scroll progress
  const startY = 50 * (1 - progress);
  const controlY = 25 * (1 - progress);

  return (
    <div className="overflow-hidden bg-black" style={{ height: `${curveHeight}px` }}>
      <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <path 
          fill="white" 
          d={`M0,${startY} C360,${controlY} 1080,${controlY} 1440,${startY} L1440,50 L0,50 Z`}
        ></path>
      </svg>
    </div>
  );
};

export default CurvedDivider;