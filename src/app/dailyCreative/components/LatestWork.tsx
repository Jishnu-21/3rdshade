'use client';

import { useState } from 'react';
import WorkItem from './WorkItem';
import { useTheme } from '@/app/context/ThemeContext';

const categories = ['Daily Creative', 'AD Copy', 'Website'];

const LatestWork: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Daily Creative');
  const { theme } = useTheme();

  const renderWorkItems = () => {
    switch (activeCategory) {
      case 'AD Copy':
        return (
          <>
            <WorkItem imageUrl="/ad1.png" alt="Sachet-Parampara Live in Concert" />
            <WorkItem imageUrl="/ad2.png" alt="Pet Grooming Services" />
            <WorkItem imageUrl="/ad3.png" alt="Apoorva Singh Musical Evening" />
            <WorkItem imageUrl="/ad1.png" alt="Sachet-Parampara Live in Concert" />
            <WorkItem imageUrl="/ad2.png" alt="Pet Grooming Services" />
            <WorkItem imageUrl="/ad3.png" alt="Apoorva Singh Musical Evening" />
            <WorkItem imageUrl="/ad1.png" alt="Sachet-Parampara Live in Concert" />
            <WorkItem imageUrl="/ad2.png" alt="Pet Grooming Services" />
            <WorkItem imageUrl="/ad3.png" alt="Apoorva Singh Musical Evening" />
            <WorkItem imageUrl="/ad1.png" alt="Sachet-Parampara Live in Concert" />
            <WorkItem imageUrl="/ad2.png" alt="Pet Grooming Services" />
            <WorkItem imageUrl="/ad3.png" alt="Apoorva Singh Musical Evening" />
            <WorkItem imageUrl="/ad1.png" alt="Sachet-Parampara Live in Concert" />
            <WorkItem imageUrl="/ad2.png" alt="Pet Grooming Services" />
            <WorkItem imageUrl="/ad3.png" alt="Apoorva Singh Musical Evening" />
          </>
        );
      case 'Website':
        return (
          <>
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
          </>
        );
      default:
        return (
          <>
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            <WorkItem imageUrl="/daily1.png" alt="Book your appointment" />
            <WorkItem imageUrl="/daily2.png" alt="The Ring" />
            <WorkItem imageUrl="/daily3.png" alt="International Women's Day" />
            {/* Repeat these WorkItems to fill the grid */}
          </>
        );
    }
  };

  return (
    <section className={`py-24 px-24 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      <h2 className={`text-5xl font-bold mb-8 pb-16 border-b-2 ${
        theme === 'dark' 
          ? 'text-white border-white' 
          : 'text-black border-black'
      }`}>
        Explore Our Latest Work
      </h2>
      <div className="flex justify-end mb-8">
        {categories.map((category, index) => (
          <div key={category} className="flex items-center">
            <button
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                activeCategory === category
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-800'
                  : theme === 'dark'
                    ? 'bg-black text-gray-400 hover:text-white'
                    : 'bg-white text-gray-600 hover:text-gray-800'
              }`}
            >
              {category}
            </button>
            {index < categories.length - 1 && (
              <div className={`h-6 border-r mx-2 ${
                theme === 'dark' ? 'border-white' : 'border-black'
              }`}></div>
            )}
          </div>
        ))}
      </div>
      <div className={`grid gap-y-24 gap-x-4 ${
        activeCategory === 'Website' ? 'grid-cols-2 auto-rows-fr' : 'grid-cols-3'
      }`}>
        {renderWorkItems()}
      </div>
    </section>
  );
};

export default LatestWork;