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

// New component for mobile view with scroll-based animation
const MobileTimelineItem = ({ index }: { index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        delay: 0.1 // Small delay for smoother appearance
      }}
      className="mb-8 w-full aspect-square bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg"
    />
  )
}

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const itemHeight = 260
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
    <div ref={componentRef} className="min-h-screen h-auto md:h-screen bg-black text-white px-4 md:px-[122px] py-8 flex flex-col relative">
      {/* Title section - adjusted for better mobile layout */}
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

      {/* Mobile Stacked View */}
      <div className="md:hidden mt-8 px-4 grid grid-cols-2 gap-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <MobileTimelineItem key={index} index={index} />
        ))}
      </div>
    </div>
  )
}