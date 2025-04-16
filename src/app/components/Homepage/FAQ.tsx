"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface FAQ {
  question: string;
  answer: string | JSX.Element;
}

const faqs: FAQ[] = [
  {
    question: "What are the Digital Marketing services you cater to?",
    answer: <>
      We cover 360-degree marketing services that includes:<br/>
      • Branding<br/>
      • Social Media Management<br/>
      • Performance marketing<br/>
      • Website Development<br/>
      • App Development<br/>
      • Influencer Marketing<br/>
      • E-Commerce Listing<br/>
      • SEO
    </>
  },
  {
    question: "Why Do We Need Digital Marketing?",
    answer: <>
      In the fast-growing technological world, business has gone all digital, in fact, our lives too. It has become the fastest means to reach your customer. Not having a digital presence in the 21st century, is losing on the main hook point of your business.
    </>
  },
  {
    question: "Why should I opt for your services?",
    answer: <>
      At 3rd Shade, our results speak for us. We have a track record of driving enormous sales and growth for our clients. We serve customized solutions to every brand and provide them with the necessary guidance at every step. In addition, our all-in-one digital marketing services cater to every sector of digital platforms, helping you create your niche in the industry.
    </>
  },
  {
    question: "I have a well-established offline business, so why must I go digital?",
    answer: <>
      Having a successful business running in an offline market is great, but today, the scenario has completely changed. Day by Day, the world is getting digitalized, and people prefer shopping online. Not having your business online, is like staying behind the trend, and not reaching a new audience, which in a result means losing your business.
    </>
  },
  {
    question: "What kind of Industries do you work with?",
    answer: <>
      We work with all kinds of Businesses spread across various industries. From Clothing, Lifestyle, Furniture, Culinary, we have an experience with businesses from all sectors.
    </>
  },
  {
    question: "Are your services only limited to India?",
    answer: <>
      No, our work travels all around the world. We have collaborated with clients from Dubai, Canada, the USA, and many others.
    </>
  },
  {
    question: "What are your Prices for different services?",
    answer: <>
      We have customized packages for brands at different stages of their businesses. Our products Shuruwaat and Unnati cover all the services that your brand might need with different price models aligned for you. To learn more about the product click on the page (Shuruwaat and Unnati)
    </>
  },
  {
    question: "Do you help Offline businesses too?",
    answer: <>
      Absolutely! Once you join us, our years of experience will help you strategize your Business offline and online.
    </>
  },
  {
    question: "I am a retail store owner. How can you help me?",
    answer: <>
      We can help you expand your Business by helping you reach a larger audience, increasing your brand awareness, measuring ROI, and driving sales.
    </>
  }
];

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
  isOpen: boolean;
  toggleOpen: () => void;
  theme: 'dark' | 'light';
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen, theme }) => (
  <div className={`border-b ${theme === 'dark' ? 'border-[#1E1E1E]' : 'border-gray-200'} py-4`}>
    <button
      className="flex justify-between items-center w-full text-left group"
      onClick={toggleOpen}
    >
      <span className={`text-lg md:text-xl font-medium ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
        group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`}
      >
        {question}
      </span>
      <div className="transform transition-transform duration-200">
        {isOpen ? (
          <Minus className={`w-5 h-5 ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
            group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} 
          />
        ) : (
          <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
            group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} 
          />
        )}
      </div>
    </button>
    <div 
      className={`grid transition-all duration-200 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className={`pt-2 text-sm ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
          transition-colors duration-200`}
        >
          {answer}
        </div>
      </div>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      ${theme === 'dark' ? 'text-white' : 'text-black'} 
      py-16 flex flex-col items-center justify-center px-4 relative z-20`}
    >
      <div className="max-w-5xl w-full">
        <h2 className={`text-4xl font-bold mb-6 text-center 
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
        Frequently Asked Questions
        </h2>
        <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-lg p-6 
          border-x border-t ${theme === 'dark' ? 'border-[#1E1E1E]' : 'border-gray-200'}
          ${theme === 'dark' ? 'shadow-lg' : 'shadow-md'}`}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
