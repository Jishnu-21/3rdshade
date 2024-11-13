"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const TimelineItem = ({ index, y, scrollY }: { index: number; y: number; scrollY: number }) => {
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

  // Alternate between images based on index
  const getImageSrc = (index: number) => {
    if (index === 0) return "/Rectangle 5.svg"
    if (index === 1) return "/Rectangle 41984.svg"
    if (index === 2) return "/Rectangle 5.svg"
    if (index === 3) return "/Rectangle 41984.svg"
    if (index === 4) return "/Rectangle 5.svg"
    return "/Rectangle 41984.png"
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
        <Image
          src={getImageSrc(index)}
          alt={`Timeline item ${index + 1}`}
          width={200}
          height={60}
          className="w-full h-auto"
        />
      </motion.div>
      <motion.div 
        className={`w-16 h-16 bg-white rounded-full z-10 flex items-center justify-center relative`}
        style={{ opacity: leftSideOpacity }}
      >
      </motion.div>
    </motion.div>
  )
}

// Shared getImageSrc function
const getImageSrc = (index: number) => {
  if (index === 0) return "/Rectangle 5.svg"
  if (index === 1) return "/Rectangle 41984.svg"
  if (index === 2) return "/Rectangle 5.svg"
  if (index === 3) return "/Rectangle 41984.svg"
  if (index === 4) return "/Rectangle 5.svg"
  return "/Rectangle 41984.png"
}

const MobileTimelineItem = ({ index, isVisible }: { index: number; isVisible: boolean }) => {
  // Determine if this item should be on the right
  const isRight = index % 2 !== 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
        display: isVisible ? 'flex' : 'none'
      }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-4 relative ${isRight ? 'flex-row-reverse' : ''}`}
    >
      {/* Timeline dot and line */}
      <div 
        className={`absolute ${isRight ? 'right-[15px]' : 'left-[15px]'} 
          top-0 w-[2px] h-[120px] bg-white opacity-20`}
      />
      <div className="w-8 h-8 bg-white rounded-full z-10 shrink-0" />
      
      {/* Content */}
      <div className={`flex-1 ${isRight ? 'mr-4' : 'ml-4'}`}>
        <div className="relative w-full h-[120px] overflow-hidden rounded-lg">
          <Image
            src={getImageSrc(index)}
            alt={`Timeline item ${index + 1}`}
            width={200}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const itemHeight = 240
  const totalItems = 6

  // Handle mobile scroll
  useEffect(() => {
    const handleMobileScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const newIndex = Math.min(
        Math.floor(scrollPosition / (viewportHeight * 0.3)),
        totalItems - 1
      )
      setCurrentMobileIndex(newIndex)
    }

    window.addEventListener('scroll', handleMobileScroll)
    return () => window.removeEventListener('scroll', handleMobileScroll)
  }, [totalItems])

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
    <div ref={componentRef} className="bg-black text-white px-4 md:px-[122px] py-8 flex flex-col relative
      md:h-screen h-[70vh]">
      {/* Title section */}
      <div className="md:absolute md:top-8 md:left-4 md:left-[122px] w-full md:w-1/3 z-10 mb-8 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-left">
          What we do ?
        </h2>
        <p className="text-blue-400 text-lg md:text-xl text-left">
          It's not just about having a website or social media presence. We understand you and your brand to market in a unique way.
        </p>
      </div>

      {/* Desktop Timeline View */}
      <div className="hidden md:block relative flex-grow overflow-hidden">
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 h-full"
          style={{
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'repeating-linear-gradient(to bottom, white 0, white 20px, transparent 20px, transparent 40px)',
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

      {/* Updated Mobile Timeline View */}
      <div className="md:hidden relative flex-1">
        {/* Single timeline item container */}
        <div className="w-full px-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <MobileTimelineItem 
              key={index} 
              index={index}
              isVisible={index === currentMobileIndex}
            />
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(totalItems)].map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === currentMobileIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}