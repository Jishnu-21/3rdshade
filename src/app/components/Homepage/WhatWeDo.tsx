"use client"

import { useEffect, useRef, useState } from 'react'

type CardState = {
  isVisible: boolean;
  showBack: boolean;
};

type CardStates = {
  [key: string]: CardState;
};

export default function Component() {
  const [cardStates, setCardStates] = useState<CardStates>({
    card1: { isVisible: false, showBack: false },
    card2: { isVisible: false, showBack: false },
    card3: { isVisible: false, showBack: false },
  });

  const containerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lastScrollY = window.pageYOffset
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.id;
          const index = parseInt(cardId.replace('card', '')) - 1;

          if (entry.isIntersecting) {
            // Card is visible
            setTimeout(() => {
              setCardStates(prev => ({
                ...prev,
                [cardId]: { isVisible: true, showBack: false }
              }))
              setTimeout(() => {
                setCardStates(prev => ({
                  ...prev,
                  [cardId]: { isVisible: true, showBack: true }
                }))
              }, 1000)
            }, index * 500)
          } else {
            // Card is not visible
            setCardStates(prev => ({
              ...prev,
              [cardId]: { isVisible: false, showBack: false }
            }))
          }
        })
      },
      { threshold: 0.5 }
    )

    const handleScroll = () => {
      lastScrollY = window.pageYOffset
    }

    window.addEventListener('scroll', handleScroll)

    const refs = [card1Ref, card2Ref, card3Ref];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const cards = [
    { 
      ref: card1Ref, 
      id: "card1", 
      color: "bg-red-500", 
      top: "top-0", 
      left: "left-0",
      frontContent: (
        <>
          <div className="mb-6 h-36 w-36 rounded-full bg-gray-300"></div>
          <p className="text-3xl text-white">Hush Hiven</p>
        </>
      ),
      backContent: (
        <p className="text-xl text-white">
          We create unique digital experiences tailored to your brand's identity.
        </p>
      )
    },
    { 
      ref: card2Ref, 
      id: "card2", 
      color: "bg-purple-500", 
      top: "top-1/4",
      left: "left-1/3",
      frontContent: (
        <>
          <div className="mb-6 h-36 w-36 rounded-full bg-gray-300"></div>
          <p className="text-3xl text-white">Hush Hiven</p>
        </>
      ),
      backContent: (
        <p className="text-xl text-white">
          It's not just about having a website or social media presence. We understand you and your brand to market in a
          unique way.
        </p>
      )
    },
    { 
      ref: card3Ref, 
      id: "card3", 
      color: "bg-blue-500", 
      top: "top-1/2",
      left: "left-2/3",
      frontContent: (
        <>
          <div className="mb-6 h-36 w-36 rounded-full bg-gray-300"></div>
          <p className="text-3xl text-white">Hush Hiven</p>
        </>
      ),
      backContent: (
        <p className="text-xl text-white">
          We leverage cutting-edge technology to bring your vision to life.
        </p>
      )
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white p-8">
      <h1 className="mb-16 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          What do we do Differently?
        </span>
      </h1>
      <div className="relative mx-auto h-[900px] max-w-[1200px] overflow-hidden">
        {cards.map((card) => (
          <div
            key={card.id}
            ref={card.ref}
            id={card.id}
            className={`absolute h-96 w-96 ${card.top} ${card.left}
              transition-all duration-1000 ease-out perspective-1000
              ${cardStates[card.id].isVisible 
                ? 'opacity-100 translate-x-0 translate-y-0' 
                : 'opacity-0 translate-x-[25%] translate-y-[25%]'}`}
          >
            <div 
              className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${cardStates[card.id].showBack ? 'rotate-y-180' : ''}`}
            >
              <div className={`absolute w-full h-full ${card.color} p-8 shadow-lg backface-hidden`}>
                {card.frontContent}
              </div>
              <div className={`absolute w-full h-full ${card.color} p-8 shadow-lg backface-hidden rotate-y-180`}>
                {card.backContent}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}