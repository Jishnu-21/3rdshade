"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="border-b border-[#1E1E1E] py-4">
    <button
      className="flex justify-between items-center w-full text-left"
      onClick={toggleOpen}
    >
      <span className="text-sm text-[#ABABAB]">{question}</span>
      {isOpen ? (
        <Minus className="w-5 h-5 text-[#ABABAB]" />
      ) : (
        <Plus className="w-5 h-5 text-[#ABABAB]" />
      )}
    </button>
    {isOpen && <p className="pt-2 text-sm text-[#ABABAB]">{answer}</p>}
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="bg-black text-white pt-16 pb-32 flex flex-col items-center justify-center px-4 -mt-16 relative z-20">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-normal mb-6 text-center">
          The Most Frequently Asked Questions.
        </h2>
        <div className="bg-black rounded-lg p-6 border-x border-t border-[#1E1E1E]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
