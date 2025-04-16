"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

const WebDevelopmentServices: React.FC = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.7; // 70% of viewport height
      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative">
      {/* Background */}
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} transition-colors duration-300`}></div>
      
      <div className="relative container px-4 md:px-[122px] py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left section - Fixed then Absolute */}
          <div className="md:w-1/2">
            <div className={`transition-all duration-500 ease-in-out ${
              isScrolled 
                ? 'md:relative md:opacity-0'
                : 'md:fixed md:w-[calc(50%-122px)] md:top-[100px] md:opacity-100'
            }`}>
              <div className="mb-12">
                <h2 className={`text-6xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Web <br/>Development
                </h2>
                <button className={`${
                  theme === 'dark' 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                } px-10 py-2 rounded-[21px] text-lg transition-all duration-300`}>
                  Get in touch
                </button>
              </div>
              <div className="flex-grow flex items-center">
                <Image
                  src="/service1.png"
                  alt="Developer working on code"
                  width={500}
                  height={761}
                  className={`rounded-lg object-cover transition-transform duration-500 ${
                    isScrolled ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                  }`}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Right section - Scrollable */}
          <div className="md:w-1/2 md:ml-auto">
            <p className={`mb-[140px] mt-[30px] ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
              We understand the nuances of websites and apps owing to our focus on user-centric design and development. 
              150+ businesses have trusted us for creating high-quality digital products.
            </p>
            
            <h2 className={`text-5xl font-bold mb-[300px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Full-stack <br/>Development
            </h2>
            
            {[
              {
                title: "Websites",
                description: "From a static GitHub site to a dynamic WordPress site, we can do it all to present your business in the best manner possible."
              },
              {
                title: "Cloud based applications",
                description: "Choose us to design future-ready SaaS products and deploy them with our end-to-end support."
              },
              {
                title: "Enterprise applications",
                description: "Optimize workplace productivity and improve processes using custom software we would create based on your requirements."
              },
              {
                title: "SaaS applications",
                description: "Choose us to design future-ready SaaS products and deploy them with our end-to-end support."
              },
              {
                title: "Quality Assurance",
                description: "Grow your business without worrying about the quality of the products we create for you. Our engineers assure you of top-notch quality and performance."
              }
            ].map((service, index) => (
              <div key={index} className={`mb-[300px] last:mb-0 transition-all duration-500 ${
                isScrolled ? 'opacity-100 translate-y-0' : 'opacity-80'
              }`}>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {service.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebDevelopmentServices