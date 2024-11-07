"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ContactCard = ({ iconSrc, title }: { iconSrc: string; title: string }) => (
  <div className="border border-gray-800 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center space-y-4 sm:space-y-6 w-full max-w-[494px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[403px]">
    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative">
      <Image
        src={iconSrc}
        alt={title}
        layout="fill"
        objectFit="contain"
      />
    </div>
    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-medium text-center">{title}</h3>
  </div>
);

const ContactInfo = () => {
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
    { iconSrc: "/location@4x 1.png", title: "Address" },
    { iconSrc: "/mail@4x 1.png", title: "Email" },
    { iconSrc: "/call@4x 1.png", title: "Phone" },
  ];

  return (
    <div className="bg-black pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4">
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
              <ContactCard iconSrc={card.iconSrc} title={card.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="max-w-[1530px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center">
          {cards.map((card, index) => (
            <ContactCard key={index} iconSrc={card.iconSrc} title={card.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactInfo;