"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTheme } from '@/app/context/ThemeContext'
import { BsBookHalf, BsPalette, BsBuilding, BsTrophy, BsGear, BsLightbulb } from 'react-icons/bs'
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
  
  // Calculate opacity based on position
  const opacity = isVisible ? 1 : 0;
  
  // Calculate opacity only for the left side
  const titleAreaHeight = 280; // Approximate height of title section
  const leftSideOpacity = itemPosition < titleAreaHeight 
    ? Math.max(0.1, (itemPosition / titleAreaHeight)) 
    : 1;

  const timelineContent = [
    { 
      title: "Narrate Compelling Stories", 
      description: "Crafting stories that resonate and inspire",
      icon: BsBookHalf
    },
    { 
      title: "Craft Visual Narratives", 
      description: "Creating impactful visual experiences",
      icon: BsPalette
    },
    { 
      title: "Build Brands that Make a Difference", 
      description: "Developing meaningful brand identities",
      icon: BsBuilding
    },
    { 
      title: "Write Success Stories", 
      description: "Turning visions into achievements",
      icon: BsTrophy
    },
    { 
      title: "Serve End-to-End Solutions", 
      description: "Comprehensive business solutions",
      icon: BsGear
    },
    { 
      title: "Strategic Business Consulting", 
      description: "Expert guidance for growth",
      icon: BsLightbulb
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
        className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'pl-4' : 'pr-4'} md:w-[calc(50%-1.5rem)]`}
        style={{ 
          opacity: index % 2 === 0 ? 1 : leftSideOpacity,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">{currentContent.title}</h3>
            <p className={`text-center md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
        className={`w-16 h-16 md:w-20 md:h-20 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full z-10 flex items-center justify-center relative`}
        style={{ opacity: 1 }}
      >
        <IconComponent 
          size={24} 
          className="transition-transform hover:scale-110 md:scale-125"
          color={theme === 'dark' ? 'black' : 'white'} 
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
  const timelineContent = [
    { 
      title: "Narrate Compelling Stories", 
      description: "Crafting stories that resonate and inspire",
      icon: BsBookHalf
    },
    { 
      title: "Craft Visual Narratives", 
      description: "Creating impactful visual experiences",
      icon: BsPalette
    },
    { 
      title: "Build Brands that Make a Difference", 
      description: "Developing meaningful brand identities",
      icon: BsBuilding
    },
    { 
      title: "Create Success Stories", 
      description: "Turning visions into achievements",
      icon: BsTrophy
    },
    { 
      title: "Serve End-to-End Solutions", 
      description: "Comprehensive business solutions",
      icon: BsGear
    },
    { 
      title: "Strategic Business Consulting", 
      description: "Expert guidance for growth",
      icon: BsLightbulb
    }
  ];

  const currentContent = timelineContent[index];
  const IconComponent = currentContent.icon;
  
  return (
    <div className="w-full px-2 py-4 md:px-4 md:py-6">
      <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden
        ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}
        backdrop-blur-sm
      `}>
        <Image
          src={getImageSrc(index, theme)}
          alt={`Timeline item ${index + 1}`}
          fill
          className="object-cover object-center opacity-20"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 md:p-8">
          <div className={`flex items-center gap-3 mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
            <h3 className="text-xl md:text-2xl font-bold">{currentContent.title}</h3>
          </div>
          <p className={`text-base md:text-lg text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentContent.description}
          </p>
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
  const [titleOpacity, setTitleOpacity] = useState(1);
  
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
        
        // Calculate title opacity based on scroll position
        const fadeOutThreshold = 100; // Adjust this value to control when the fade starts
        const opacity = Math.max(0, 1 - (scrollTop / fadeOutThreshold));
        setTitleOpacity(opacity);
        
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
          mt-[10vh] sm:mt-[15vh] md:mt-[40vh]
          py-4 sm:py-6 md:py-8 flex flex-col relative
          min-h-[80vh] md:min-h-0
          sm:h-auto md:h-[55vh]
          xl:h-screen
          z-10
        `}
      >
        {/* Title section */}
        <div 
          className="md:absolute md:top-8 w-full md:w-1/3 z-10 mb-4 sm:mb-6 md:mb-0 transition-opacity duration-300"
          style={{ opacity: titleOpacity }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-left">
            Beyond the Ordinary. What Do We Do?
          </h2>
          <p className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} text-sm sm:text-base md:text-xl text-left`}>
            With stories that spark emotions and visuals that grab attention, we build brands that truly connect, people remember, love, and trust 
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
        <div className="md:hidden mt-4 sm:mt-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ 
              clickable: true
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className={`h-full !pb-8 ${theme === 'dark' ? '[&_.swiper-pagination-bullet]:!bg-white/50 [&_.swiper-pagination-bullet-active]:!bg-white' : '[&_.swiper-pagination-bullet]:!bg-black/50 [&_.swiper-pagination-bullet-active]:!bg-black'}`}
          >
            {Array.from({ length: totalItems }).map((_, index) => (
              <SwiperSlide key={index} className="pb-6">
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