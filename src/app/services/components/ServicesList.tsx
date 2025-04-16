'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import Link from 'next/link';
import { 
  PaintBrushIcon, 
  CodeBracketIcon, 
  ChartBarIcon, 
  SparklesIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    title: 'Branding',
    description: 'Build a powerful brand identity that resonates with your audience and creates lasting impressions.',
    Icon: PaintBrushIcon,
    color: 'from-purple-500/20'
  },
  {
    title: 'Website Development',
    description: 'Create stunning, responsive websites that drive results and engage your users.',
    Icon: CodeBracketIcon,
    color: 'from-blue-500/20'
  },
  {
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that maximize your ROI and reach your target audience.',
    Icon: ChartBarIcon,
    color: 'from-green-500/20'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric design that enhances engagement and delivers exceptional experiences.',
    Icon: SparklesIcon,
    color: 'from-yellow-500/20'
  },
  {
    title: 'SEO',
    description: 'Boost your visibility and organic traffic with proven optimization strategies.',
    Icon: MagnifyingGlassIcon,
    color: 'from-red-500/20'
  },
  {
    title: 'Consulting',
    description: 'Expert guidance for your business growth and digital transformation.',
    Icon: LightBulbIcon,
    color: 'from-orange-500/20'
  },
  {
    title: 'E-commerce Listing',
    description: 'Connect with your audience through trusted voices and authentic partnerships.',
    Icon: UserGroupIcon,
    color: 'from-indigo-500/20'
  },
  {
    title: 'Social Media Management',
    description: 'Build and engage your community across platforms with strategic content.',
    Icon: ChatBubbleBottomCenterTextIcon,
    color: 'from-teal-500/20'
  }
];

const ServicesList: React.FC = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const firstRow = services.slice(0, 4);
  const secondRow = services.slice(4);

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      py-12 sm:py-16 md:py-20
      transition-colors duration-300
      w-full mt-8 sm:mt-10 md:mt-10
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <h2 className={`
          text-3xl sm:text-4xl md:text-5xl 
          font-bold text-center mb-16
          ${theme === 'dark' ? 'text-white' : 'text-black'}
          relative
        `}>
          <span className="relative z-10">Services that Spark Magic</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl transform -skew-y-6"></div>
        </h2>
        
        <div className="space-y-8">
          {/* Desktop View */}
          <div className="hidden md:block">
            {[firstRow, secondRow].map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-between gap-4 mb-8">
                {row.map((service, index) => {
                  const actualIndex = rowIndex * 4 + index;
                  const Icon = service.Icon;
                  return (
                    <Link 
                      href={`/services/${service.title.toLowerCase().replace(/[\s/]+/g, '-')}`}
                      key={index}
                      className={`
                        group relative
                        transition-all duration-500 ease-out
                        ${actualIndex === activeIndex 
                          ? 'w-[28%] scale-100' 
                          : 'w-[22%] hover:scale-95'
                        }
                        h-[22rem]
                        rounded-2xl
                        ${theme === 'dark' 
                          ? 'bg-zinc-900/80 hover:bg-zinc-900/90' 
                          : 'bg-white hover:bg-gray-50'
                        }
                        hover:shadow-xl
                        cursor-pointer
                        backdrop-blur-sm
                        border border-transparent
                        ${theme === 'dark'
                          ? actualIndex === activeIndex 
                            ? 'hover:border-[#955DDC]/30 shadow-lg shadow-purple-500/5' 
                            : 'hover:border-gray-800 shadow-md shadow-purple-500/5'
                          : actualIndex === activeIndex
                            ? 'hover:border-[#955DDC]/30 shadow-lg shadow-purple-500/20' 
                            : 'hover:border-gray-200 shadow-md shadow-purple-500/10'
                        }
                        overflow-hidden
                        transform-gpu
                      `}
                      onMouseEnter={() => setActiveIndex(actualIndex)}
                      onMouseLeave={() => setActiveIndex(-1)}
                    >
                      <div className={`
                        absolute inset-0 p-6 md:p-8
                        flex flex-col
                        transition-all duration-500
                        ${actualIndex === activeIndex ? 'opacity-100' : 'opacity-80'}
                      `}>
                        <div className={`
                          transition-all duration-500
                          transform
                          ${actualIndex === activeIndex ? 'scale-110 translate-y-0' : 'scale-100 translate-y-4'}
                        `}>
                          <Icon className={`
                            w-12 h-12 md:w-16 md:h-16
                            ${theme === 'dark' ? 'text-white' : 'text-black'}
                            transition-all duration-500
                          `} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`
                            font-bold mb-3
                            ${theme === 'dark' ? 'text-white' : 'text-black'}
                            transition-all duration-500
                            ${actualIndex === activeIndex ? 'text-2xl md:text-3xl' : 'text-lg'}
                            break-words
                          `}>
                            {service.title}
                          </h3>
                          <p className={`
                            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                            transition-all duration-300
                            line-clamp-4
                            break-words
                            ${actualIndex === activeIndex ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                          `}>
                            {service.description}
                          </p>
                        </div>
                        <div className={`
                          mt-6
                          transform
                          ${actualIndex === activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}
                          transition-all duration-500 delay-100
                        `}>
                          <span className="text-[#955DDC] text-2xl">→</span>
                        </div>
                      </div>
                      <div className={`
                        absolute inset-0 
                        bg-gradient-to-b ${service.color}
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        rounded-2xl
                      `}/>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => {
                const Icon = service.Icon;
                return (
                  <Link 
                    href={`/services/${service.title.toLowerCase().replace(/[\s/]+/g, '-')}`}
                    key={index}
                    className={`
                      group relative
                      transition-all duration-300 ease-out
                      h-[18rem] sm:h-[20rem]
                      rounded-xl
                      ${theme === 'dark' 
                        ? 'bg-zinc-900/80' 
                        : 'bg-white'
                      }
                      shadow-md
                      cursor-pointer
                      border border-transparent
                      ${theme === 'dark'
                        ? 'hover:border-gray-800 shadow-purple-500/5'
                        : 'hover:border-gray-200 shadow-purple-500/10'
                      }
                      overflow-hidden
                      active:scale-95
                      touch-pan-y
                    `}
                  >
                    <div className="absolute inset-0 p-5 flex flex-col">
                      <div className="mb-4">
                        <Icon className={`
                          w-10 h-10
                          ${theme === 'dark' ? 'text-white' : 'text-black'}
                        `} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`
                          font-bold mb-2 text-xl
                          ${theme === 'dark' ? 'text-white' : 'text-black'}
                        `}>
                          {service.title}
                        </h3>
                        <p className={`
                          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                          text-sm
                          line-clamp-3
                        `}>
                          {service.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <span className="text-[#955DDC] text-xl">→</span>
                      </div>
                    </div>
                    <div className={`
                      absolute inset-0 
                      bg-gradient-to-b ${service.color}
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      rounded-xl
                    `}/>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;