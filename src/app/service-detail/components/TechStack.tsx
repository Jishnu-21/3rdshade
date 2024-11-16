"use client"

import React from 'react';
import TechnologyCard from './TechnologyCard';
import { useTheme } from '@/app/context/ThemeContext';

const TechStack: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    } py-16 px-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#7071E9] text-lg font-semibold mb-2">OUR TECH STACK</h2>
        <h3 className={`text-5xl font-bold mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Technologies we work on
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TechnologyCard
            name="Node.js"
            description="Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine."
            imageUrl="/tech1.jpg"
          />
          <TechnologyCard
            name="React"
            description="A JavaScript library for building user interfaces"
            imageUrl="/tech2.jpg"
          />
          <TechnologyCard
            name="TypeScript"
            description="TypeScript is JavaScript with syntax for types."
            imageUrl="/tech3.jpg"
          />
          <TechnologyCard
            name="Next.js"
            description="The React Framework for Production"
            imageUrl="/tech4.jpg"
          />
          <TechnologyCard
            name="Next.js"
            description="The React Framework for Production"
            imageUrl="/tech4.jpg"
          />
          <TechnologyCard
            name="TypeScript"
            description="TypeScript is JavaScript with syntax for types."
            imageUrl="/tech3.jpg"
          />
          <TechnologyCard
            name="React"
            description="A JavaScript library for building user interfaces"
            imageUrl="/tech2.jpg"
          />
          <TechnologyCard
            name="Node.js"
            description="Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine."
            imageUrl="/tech1.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default TechStack;