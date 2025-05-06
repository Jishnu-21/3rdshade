"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useTheme } from '@/app/context/ThemeContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ContactCard = ({ iconSrc, lightIconSrc, title, link }: { iconSrc: string; lightIconSrc: string; title: string; link: string }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`border ${theme === 'dark' ? 'border-gray-200 bg-black' : 'border-gray-200 bg-white'} rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center space-y-4 sm:space-y-6 w-full max-w-[300px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${theme === 'dark' ? 'hover:shadow-blue-500/20' : 'hover:shadow-gray-400/30'}`}>
      <div className="w-10 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 relative">
        <Image
          src={theme === 'dark' ? iconSrc : lightIconSrc}
          alt={title}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-lg sm:text-xl md:text-2xl font-medium text-center`}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {title}
        </a>
      </h3>
    </div>
  );
};

const ContactInfo = () => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cards = [
    { 
      iconSrc: "/location@4x 1.png", // Dark theme image
      lightIconSrc: "/location-light.png", // Light theme image
      title: "Address",
      link: "https://maps.app.goo.gl/qhR5tSf5L5MhVkRK6" // Link for Address
    },
    { 
      iconSrc: "/mail@4x 1.png", // Dark theme image
      lightIconSrc: "/mail-light.png", // Light theme image
      title: "Email",
      link: "mailto:info@3rshade.in" // Link for Email
    },
    { 
      iconSrc: "/call@4x 1.png", // Dark theme image
      lightIconSrc: "/call-light.png", // Light theme image
      title: "Phone",
      link: "tel:+918600181189" // Link for Phone
    },
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-50'} pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4`}>
      {isMobile ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="max-w-[494px] mx-auto"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <ContactCard 
                iconSrc={card.iconSrc} 
                lightIconSrc={card.lightIconSrc}
                title={card.title} 
                link={card.link} // Pass the link to ContactCard
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="max-w-[1530px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center">
          {cards.map((card, index) => (
            <ContactCard 
              key={index} 
              iconSrc={card.iconSrc} 
              lightIconSrc={card.lightIconSrc}
              title={card.title} 
              link={card.link} // Pass the link to ContactCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;