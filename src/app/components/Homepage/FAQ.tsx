"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Where does Char Befikar provide property management services?",
    answer: "We manage property within Pune and parts of PCMC. Our endeavor is to expand our reach to serve you better. Currently, we manage properties in Wakad, Hinjewadi, Pimple Saudagar, Pimple Gurav, Pundit, Baner, Balewadi, Mahalunge, SusGaon, Bavdhan, Bhugaon, Sakal Nagar, Katraj, Ambegaon, NIBM, Kondhwa, Wagnoli, Bhugaon, Sinhagad Road, Kothrud, Hadapsar, Kharadi, Kalyani Nagar, and Keshav Nagar, etc. Please check with us if the area of your interest is not covered above."
  },
  { question: "How can I start the service?", answer: "" },
  { question: "What is the enrolment process?", answer: "" },
  { question: "How do I hand over the keys to Char Befikar?", answer: "" },
  { question: "What is a 'First Time Inspection Report'?", answer: "" },
  { question: "How soon will you be able to rent out my property ?", answer: "" },
  { question: "What happens if my tenant leaves in the middle of the agreement?", answer: "" },
  { question: "Who will be the point of contact in case my tenant needs any help?", answer: "" },
  { question: "What kind of inspections do you perform as part of the full property management service?", answer: "" },
];

interface FAQItemProps {
  question: string;
  answer: string;
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
      <span className={`text-sm ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
        group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`}
      >
        {question}
      </span>
      {isOpen ? (
        <Minus className={`w-5 h-5 ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
          group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} 
        />
      ) : (
        <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
          group-hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors duration-200`} 
        />
      )}
    </button>
    {isOpen && (
      <p className={`pt-2 text-sm ${theme === 'dark' ? 'text-[#ABABAB]' : 'text-gray-600'} 
        transition-colors duration-200`}
      >
        {answer}
      </p>
    )}
  </div>
);

const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      ${theme === 'dark' ? 'text-white' : 'text-black'} 
      pt-16 pb-10 sm:pb-24 flex flex-col items-center justify-center px-4 -mt-16 relative z-20`}
    >
      <div className="max-w-3xl w-full">
        <h2 className={`text-2xl font-normal mb-6 text-center 
          ${theme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          The Most Frequently Asked Questions.
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
