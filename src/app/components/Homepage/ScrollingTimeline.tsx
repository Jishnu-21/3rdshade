"use client"

import { useEffect, useRef, useState } from 'react'
import { motion} from 'framer-motion'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTheme } from '@/app/context/ThemeContext'
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

  // Make first three items visible initially
  const isVisible = index <= 2 || (y - (windowHeight/2 || 0) <= scrollY && y + (windowHeight/2 || 0) >= scrollY)
  const opacity = isVisible ? 1 : 0

  // Calculate opacity for the left side elements (keeping original logic)
  const leftSideOpacity = index % 2 === 0 ? 1 : Math.max(0, 1 - (scrollY - y + 200) / 200)

  // Updated getImageSrc function to handle theme-specific images
  const getImageSrc = (index: number, theme: 'dark' | 'light') => {
    const baseImage = index % 2 === 0 ? "Rectangle 5" : "Rectangle 41984";
    return theme === 'dark' 
      ? `/${baseImage}.svg`
      : `/${baseImage}-light.svg`; // Add light theme versions of SVGs
  }

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
          <Image
            src={getImageSrc(index, theme)}
            alt={`Timeline item ${index + 1}`}
            width={200}
            height={60}
            className="w-full h-auto"
            style={{
              opacity: 1,
              filter: 'none' // Remove the invert filter
            }}
          />
        </div>
      </motion.div>
      <motion.div 
        className={`w-16 h-16 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full z-10 flex items-center justify-center relative`}
        style={{ opacity: leftSideOpacity }}
      >
      </motion.div>
    </motion.div>
  )
}

// Update the shared getImageSrc function as well
const getImageSrc = (index: number) => {
  const { theme } = useTheme();
  const baseImage = index % 2 === 0 ? "Rectangle 5" : "Rectangle 41984";
  return theme === 'dark' 
    ? `/${baseImage}.svg`
    : `/${baseImage}-.svg`; // Add light theme versions of SVGs
}

const MobileTimelineItem = ({ index }: { index: number }) => {
  
  return (
    <div className="w-full px-2">
      <div className="relative w-full aspect-[3/1] overflow-hidden rounded-[4px]">
        <div className="absolute left-1/2 -translate-x-1/2 w-[75%] h-full">
          <Image
            src={getImageSrc(index)}
            alt={`Timeline item ${index + 1}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            style={{ filter: 'none' }} // Remove any filters
          />
        </div>
      </div>
    </div>
  );
};

export default function Component() {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const itemHeight = 240
  const totalItems = 6

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const newScrollY = scrollRef.current.scrollTop
        setScrollY(newScrollY)

        if (newScrollY >= itemHeight * (totalItems - 1)) {
          scrollRef.current.style.overflowY = 'hidden'
          
          if (componentRef.current) {
            const nextComponent = componentRef.current.nextElementSibling as HTMLElement
            if (nextComponent) {
              nextComponent.scrollIntoView({ behavior: 'smooth' })
            }
          }
        }
      }
    }

    const currentScrollRef = scrollRef.current
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll)
      return () => currentScrollRef.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      ref={componentRef} 
      className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} 
        px-4 md:px-[122px] mt-[200px] py-8 flex flex-col relative
        sm:h-[55vh]    /* Tablet (640px and up) */
        xl:h-screen    /* Desktop (1280px and up) */
      `}
    >
      {/* Title section */}
      <div className="md:absolute md:top-8 md:left-4 md:left-[122px] w-full md:w-1/3 z-10 mb-4 md:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-left">
          What we do ?
        </h2>
        <p className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} text-base md:text-xl text-left`}>
          It's not just about having a website or social media presence. We understand you and your brand to market in a unique way.
        </p>
      </div>

      {/* Desktop/Tablet Timeline View */}
      <div className="hidden sm:block relative flex-grow overflow-hidden">
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 h-full"
          style={{
            top: '0',
            bottom: '0',
            width: '2px',
            background: theme === 'dark'
              ? 'repeating-linear-gradient(to bottom, white 0, white 20px, transparent 20px, transparent 40px)'
              : 'repeating-linear-gradient(to bottom, black 0, black 20px, transparent 20px, transparent 40px)',
            zIndex: 15
          }}
        ></div>
        <div 
          ref={scrollRef}
          className="h-full overflow-y-auto scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          <div style={{ height: `${itemHeight * totalItems}px`, position: 'relative' }}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
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

      {/* Mobile Timeline View */}
      <div className="sm:hidden relative flex-1 mt-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: `swiper-pagination-bullet !${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`,
            bulletActiveClass: `swiper-pagination-bullet-active !${theme === 'dark' ? 'bg-white' : 'bg-black'}`,
          }}
          className="h-full !pb-12"
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <SwiperSlide key={index} className="pb-2">
              <MobileTimelineItem index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}