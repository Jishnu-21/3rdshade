import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { TimelineItemData, timelineData } from './timelineData';

interface TimelineItemProps {
  data: TimelineItemData;
  index: number;
  progress: MotionValue<number>;
}

export function TimelineItem({ data, index, progress }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  
  const y = useTransform(
    progress,
    [0, 1],
    [50, -50]
  );

  return (
    <motion.div
      className={`flex items-center w-full ${isEven ? 'flex-row-reverse' : ''}`}
    >
      <motion.div 
        style={{ y }}
        className={`w-[calc(50%-3rem)] ${isEven ? 'pl-8' : 'pr-8'}`}
      >
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
            <h3 className="text-2xl font-semibold text-white mb-2">{data.title}</h3>
            <p className="text-gray-400 text-base text-center">
              {data.description}
            </p>
          </div>
          <img
            src={isEven ? '/Rectangle 41984.svg' : '/Rectangle 41984.svg'}
            alt="Timeline item background"
            className={`w-full h-auto min-h-[180px] object-contain transform ${isEven ? 'scale-x-[-1]' : ''}`}
            style={{
              filter: 'brightness(0.7)'
            }}
          />
        </div>
      </motion.div>

      <div className="w-24 h-24 bg-white rounded-full z-10 flex items-center justify-center">
        {data.icon && <data.icon className="w-8 h-8 text-black transition-transform hover:scale-110" />}
      </div>
    </motion.div>
  );
}