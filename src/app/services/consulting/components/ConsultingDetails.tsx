'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { FaBrain, FaHandshake, FaPuzzlePiece, FaUsers, FaMagic } from "react-icons/fa";

const ConsultingDetails: React.FC = () => {
  const { theme } = useTheme();
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      title: "The Secret Sauce",
      description: "Marketing today is the secret sauce of the virality of every popular brand. But what’s the secret to perfect marketing? It’s strategies and the knowledge to deliver the right emotion, to the right audience, at the right time.",
      Icon: FaMagic
    },
    {
      title: "Our Expertise: Deep Market Knowledge",
      description: "Our founders are market mavericks. With an ability to grasp market trends, they craft strategies that set brands apart. Their deep-rooted understanding of consumer behavior and industry dynamics ensures your brand stays ahead of the curve.",
      Icon: FaBrain
    },
    {
      title: "End-to-end, hand-in-hand",
      description: "Your Dream, Our Vision. From the very first conversation, we work with you every step of the way, from the spark of an idea to its full-fledged execution. ",
      Icon: FaHandshake
    },
    {
      title: "Solutions as unique as your Brand ",
      description: "Every business has a story. In our consulting sessions, our founders address your queries and challenges and work on strategies that align with your unique goals, ensuring every step is meaningful and impactful.",
      Icon: FaPuzzlePiece
    },
    {
      title: "We are a Team ",
      description: "We work with you, not for you. Together, we brainstorm, refine, and implement strategies that align with your goals, creating a seamless path to success.",
      Icon: FaUsers
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            setVisibleItems(prev => Math.max(prev, index + 1));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`services-header ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      {/* Title and Subheading */}
      <div className="container pt-10 px-4 md:px-[122px] mb-16">
        <h2 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Collaborative <br></br>
          Excellence
        </h2>
        <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Together, we bring your vision to life with innovative strategies and seamless <br></br> execution for lasting success.
        </p>
      </div>

      {/* Scrolling Items Section */}
      <div className="container px-4 md:px-[122px] py-16">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => { if (el) itemRefs.current[index] = el; }}
            className={`transform transition-all duration-700 ${
              index < visibleItems
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
            } mb-32 flex justify-${index % 2 === 0 ? 'start' : 'end'} w-full`}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <service.Icon
                className={`w-12 h-12 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {service.title}
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultingDetails;
