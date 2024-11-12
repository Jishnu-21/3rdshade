'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How can we start a project together?",
    answer: "Answer to the first question goes here."
  },
  {
    question: "How can we start a project together?",
    answer: "Answer to the second question goes here."
  },
  {
    question: "How can we start a project together?",
    answer: "Answer to the third question goes here."
  },
  {
    question: "How can we start a project together?",
    answer: "Answer to the fourth question goes here."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold mb-4">Frequently Asked<br />Questions</h2>
            <p className="mb-12">If you have questions that are not listed here send them to us via email.</p>
            <div className="relative aspect-[4/3]">
              <Image
                src="/faq.jpg"
                alt="FAQ illustration"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="md:w-1/2 pt-40">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left py-4 cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-xl">{item.question}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-6 h-6 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="py-4">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;