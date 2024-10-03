"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

const TimelineItem = ({ index, y, scrollY }: { index: number; y: number; scrollY: number }) => {
  const isVisible = y >= 0 && y <= window.innerHeight
  const opacity = isVisible ? 1 : 0

  // Calculate opacity for the left side elements
  const leftSideOpacity = index % 2 === 0 ? 1 : Math.max(0, 1 - (scrollY - y + 200) / 200)

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
          src={index % 2 === 0 ? "/Rectangle 5.png" : "/Rectangle 41984.png"}
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

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const componentRef = useRef<HTMLDivElement>(null)
  const itemHeight = 240
  const totalItems = 5

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const newScrollY = scrollRef.current.scrollTop
        setScrollY(newScrollY)

        // Check if we've reached the last placeholder
        if (newScrollY >= itemHeight * (totalItems - 1)) {
          // Disable further scrolling within the timeline
          scrollRef.current.style.overflowY = 'hidden'
          
          // Scroll to the next component
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
    <div ref={componentRef} className="h-screen bg-black text-white px-4 md:px-[122px] py-8 flex flex-col relative">
      <div className="absolute top-8 left-4 md:left-[122px] w-1/3 z-10">
        <h2 className="text-5xl font-bold mb-4 text-left">
          What we do ?
        </h2>
        <p className="text-blue-400 text-xl text-left">
          It's not just about having a website or social media presence. We understand you and your brand to market in a unique way.
        </p>
      </div>
      <div className="relative flex-grow overflow-hidden">
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
            {[0, 1, 2, 3, 4].map((index) => (
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
    </div>
  )
}