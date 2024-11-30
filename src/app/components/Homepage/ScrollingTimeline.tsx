"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTheme } from '@/app/context/ThemeContext'
import { BsBrush, BsCode, BsMegaphone, BsLayers, BsCamera, BsGraphUp } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const TimelineItem = ({ index, y, scrollY }: { index: number; y: number; scrollY: number }) => {
  const { theme } = useTheme();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemPosition = y - scrollY;
  const isVisible = itemPosition >= 0 && itemPosition <= windowHeight;
  const opacity = isVisible ? 1 : 0;
  const leftSideOpacity = 1;

  const timelineContent = [
    { 
      title: "Brand Strategy", 
      description: "Crafting unique brand identities",
      icon: BsBrush
    },
    { 
      title: "Web Development", 
      description: "Building modern web experiences",
      icon: BsCode
    },
    { 
      title: "Digital Marketing", 
      description: "Reaching your target audience",
      icon: BsMegaphone
    },
    { 
      title: "UI/UX Design", 
      description: "Creating intuitive interfaces",
      icon: BsLayers
    },
    { 
      title: "Content Creation", 
      description: "Engaging your audience",
      icon: BsCamera
    },
    { 
      title: "Analytics", 
      description: "Data-driven decisions",
      icon: BsGraphUp
    }
  ];

  const currentContent = timelineContent[index];
  const IconComponent = currentContent.icon;

  return (
    <motion.div
      style={{ 
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: y,
        opacity,
        transition: 'opacity 0.3s ease-in-out, top 0.5s ease-out',
        zIndex: 20
      }}
      className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
    >
      <motion.div 
        className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'pl-4' : 'pr-4'}`}
        style={{ opacity: leftSideOpacity }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
            <h3 className="text-xl font-bold mb-2 text-center">{currentContent.title}</h3>
            <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentContent.description}
            </p>
          </div>
          <Image
            src={getImageSrc(index, theme)}
            alt={`Timeline item ${index + 1}`}
            width={200}
            height={60}
            className="w-full h-auto relative"
            style={{
              opacity: 1,
              filter: theme === 'light' ? 'invert(1)' : 'none'
            }}
          />
        </div>
      </motion.div>
      <motion.div 
        className={`w-16 h-16 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full z-10 flex items-center justify-center relative`}
        style={{ opacity: leftSideOpacity }}
      >
        <IconComponent 
          size={24} 
          color={theme === 'dark' ? 'black' : 'white'} 
          className="transition-transform hover:scale-110"
        />
      </motion.div>
    </motion.div>
  )
}

const getImageSrc = (index: number, theme: 'dark' | 'light') => {
  const baseImage = index % 2 === 0 ? "Rectangle 5" : "Rectangle 41984"
  return `/${baseImage}.svg`
}

const MobileTimelineItem = ({ index }: { index: number }) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full px-2">
      <div className="relative w-full aspect-[3/1] overflow-hidden rounded-[4px]">
        <div className="absolute left-1/2 -translate-x-1/2 w-[75%] h-full">
          <Image
            src={getImageSrc(index, theme)}
            alt={`Timeline item ${index + 1}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            style={{ 
              filter: theme === 'light' ? 'invert(1)' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ScrollIndicator = ({ isAtBottom }: { isAtBottom: boolean }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className={`fixed bottom-8 right-8 flex flex-col items-center gap-2 z-30
        ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p 
        className="text-sm font-medium"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        {isAtBottom ? 'Scroll Up' : 'Scroll Down'}
      </motion.p>
      <motion.div
        className={`w-6 h-6 border-2 ${theme === 'dark' ? 'border-white' : 'border-black'} 
          border-b-0 border-r-0 transform ${isAtBottom ? '-rotate-135' : 'rotate-45'}`}
        animate={{
          y: isAtBottom ? [0, -5, 0] : [0, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default function Component() {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const isInView = useInView(componentRef, {
    once: false,
    amount: 0.1
  });

  const itemHeight = 240
  const totalItems = 6

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const newScrollY = scrollTop;
        setScrollY(newScrollY);
        
        // Check if we're at the bottom
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 50);

        if (newScrollY >= itemHeight * (totalItems - 1)) {
          scrollRef.current.style.overflowY = 'hidden';
          
          if (componentRef.current) {
            const nextComponent = componentRef.current.nextElementSibling as HTMLElement;
            if (nextComponent) {
              nextComponent.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
      return () => currentScrollRef.removeEventListener('scroll', handleScroll);
    }
  }, [itemHeight, totalItems]);

  return (
    <div ref={componentRef}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} 
          px-4 sm:px-6 md:px-8 xl:px-[122px]
          mt-[40vh]
          py-8 flex flex-col relative
          sm:h-[55vh]
          xl:h-screen
        `}
      >
        {/* Title section */}
        <div className="md:absolute md:top-8 w-full md:w-1/3 z-10 mb-4 md:mb-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-left">
            What we do ?
          </h2>
          <p className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} text-base md:text-xl text-left`}>
            It's not just about having a website or social media presence. We understand you and your brand to market in a unique way.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative flex-grow overflow-hidden">
          {/* Timeline vertical line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full"
            style={{
              width: '2px',
              background: theme === 'dark'
                ? 'repeating-linear-gradient(to bottom, white 0, white 20px, transparent 20px, transparent 40px)'
                : 'repeating-linear-gradient(to bottom, black 0, black 20px, transparent 20px, transparent 40px)',
              zIndex: 15
            }}
          />
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              scrollSnapType: 'y mandatory'
            }}
          >
            <div style={{ height: `${itemHeight * totalItems}px` }} className="relative">
              {Array.from({ length: totalItems }).map((_, index) => (
                <TimelineItem
                  key={index}
                  index={index}
                  y={index * itemHeight}
                  scrollY={scrollY}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              bulletClass: `swiper-pagination-bullet !${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`,
              bulletActiveClass: `swiper-pagination-bullet-active !${theme === 'dark' ? 'bg-white' : 'bg-black'}`,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-full !pb-12"
          >
            {Array.from({ length: totalItems }).map((_, index) => (
              <SwiperSlide key={index} className="pb-2">
                <MobileTimelineItem index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Add ScrollIndicator component */}
        <div className="hidden md:block">
          <ScrollIndicator isAtBottom={isAtBottom} />
        </div>
      </motion.div>
    </div>
  );
}