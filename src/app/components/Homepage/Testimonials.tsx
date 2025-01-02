"use client"

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '@/app/context/ThemeContext'

const testimonials = [
    {
      content: "Have taken services from them, their team is highly supportive and understood the requirements perfectly. We received the deliverables within the promised timeframe, and the quality exceeded our expectations. Highly recommended!",
      author: "John Mikias",
    },
    {
      content: "They are truly professional and creative in their approach. The team brought our vision to life with fresh ideas and a seamless execution process. It was a pleasure collaborating with them!.",
      author: "Sarah Johnson",
    },
    {
      content: "Working with 3rd Shade was a fantastic experience! Their attention to detail, commitment to deadlines, and ability to turn concepts into reality is unmatched. The results speak for themselves!.",
      author: "Michael Chen",
    },
    {
      content: "The team at 3rd Shade is incredible! They ensured that the whole experience was easy, cooperative, and worry-free. The outcomes surpassed what we had hoped for, and we’ve received so much positive feedback on their work.",
      author: "Emily Rodriguez",
    },
    {
      content: "I am thoroughly impressed with 3rd Shade’s dedication and expertise. They understood our brand and crafted solutions that were impactful. I would recommend them to anyone looking for top-notch service!",
      author: "David Thompson",
    }
  ]
  
export default function Component() {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const checkScroll = () => {
    const { current } = scrollRef
    if (current) {
      setCanScrollLeft(current.scrollLeft > 0)
      setCanScrollRight(
        current.scrollLeft < current.scrollWidth - current.clientWidth
      )
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef
    if (current) {
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current!.offsetLeft)
    setScrollLeft(scrollRef.current!.scrollLeft)
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current!.offsetLeft
    const walk = (x - startX) * 2 // Adjust scrolling speed
    scrollRef.current!.scrollLeft = scrollLeft - walk
    checkScroll()
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} 
      ${theme === 'dark' ? 'text-white' : 'text-black'} 
      pt-16 pb-8 px-4 relative z-10`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-center text-sm mb-2 
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
        >
          What Client Say About Us
        </h2>
        <h1 className="text-center text-4xl font-bold mb-12">OUR TESTIMONIALS</h1>
        
        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide cursor-grab"
            onMouseDown={startDragging}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={onDrag}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center">
                <div className={`${theme === 'dark' ? 'bg-[#111]' : 'bg-gray-100'} 
                  p-6 rounded-tl-[40px] rounded-br-[40px] relative
                  ${theme === 'dark' ? 'shadow-lg' : 'shadow-md'}`}
                >
                  <div className="text-yellow-500 text-4xl absolute top-4 left-4">"</div>
                  <p className={`mb-4 mt-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      </p>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-4xl absolute bottom-4 right-4">"</div>
                </div>
              </div>
            ))}
          </div>
          
          {canScrollLeft && (
            <button 
              onClick={() => scroll('left')} 
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 
                ${theme === 'dark' ? 'bg-black/50' : 'bg-gray-800/50'} 
                p-2 rounded-full hover:bg-opacity-70 transition-all duration-300`}
              aria-label="Scroll left"
            >
              <ChevronLeft className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-white'}`} />
            </button>
          )}
          
          {canScrollRight && (
            <button 
              onClick={() => scroll('right')} 
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 
                ${theme === 'dark' ? 'bg-black/50' : 'bg-gray-800/50'} 
                p-2 rounded-full hover:bg-opacity-70 transition-all duration-300`}
              aria-label="Scroll right"
            >
              <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-white'}`} />
            </button>
          )}
        </div>
      </div>
      <div className={`h-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}></div>
    </div>
  )
}
