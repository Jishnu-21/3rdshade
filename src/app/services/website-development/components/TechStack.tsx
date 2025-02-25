"use client"

import React from 'react';
import TechnologyCard from './TechnologyCard';
import { useTheme } from '@/app/context/ThemeContext';

const TechStack: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`
      relative
      ${isDark ? 'bg-black' : 'bg-white'}
      py-16
      mt-16
      px-8
    `}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <p className="text-[#7071E9]  text-sm font-medium mb-5">
            OUR TECH STACK
          </p>
          <h2 className={`
            text-2xl md:text-5xl font-bold
            ${isDark ? 'text-white' : 'text-black'}
          `}>
            Technologies we work on
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </section>
  );
};

export default TechStack;