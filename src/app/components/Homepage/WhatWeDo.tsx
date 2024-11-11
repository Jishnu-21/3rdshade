"use client"

import { useEffect, useRef, useState } from 'react'

type CardState = {
  isVisible: boolean;
  showBack: boolean;
  progress: number;
  isHovered: boolean;
};

type CardStates = {
  [key: string]: CardState;
};

export default function Component() {
  const [cardStates, setCardStates] = useState<CardStates>({
    card1: { isVisible: false, showBack: false, progress: 0, isHovered: false },
    card2: { isVisible: false, showBack: false, progress: 0, isHovered: false },
    card3: { isVisible: false, showBack: false, progress: 0, isHovered: false },
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const ANIMATION_DELAY = 400;
    const FLIP_DURATION = 800;

    const updateCardProgress = (scrollY: number) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const triggerOffset = window.innerHeight * 0.7;
      const scrollingDown = scrollY > lastScrollY;

      const calculateProgress = (trigger: number): number => {
        const distance = triggerOffset - trigger;
        return Math.max(0, Math.min(1, distance / (window.innerHeight * 0.3)));
      };

      const card1Trigger = containerRect.top + 0;
      const card2Trigger = containerRect.top + 200;
      const card3Trigger = containerRect.top + 400;

      setCardStates(prev => ({
        card1: {
          ...prev.card1,
          isVisible: card1Trigger <= triggerOffset,
          progress: calculateProgress(card1Trigger)
        },
        card2: {
          ...prev.card2,
          isVisible: card2Trigger <= triggerOffset,
          progress: calculateProgress(card2Trigger)
        },
        card3: {
          ...prev.card3,
          isVisible: card3Trigger <= triggerOffset,
          progress: calculateProgress(card3Trigger)
        }
      }));

      if (scrollingDown) {
        if (card1Trigger <= triggerOffset) {
          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card1: { ...prev.card1, showBack: !prev.card1.isHovered }
            }));
          }, FLIP_DURATION);
        }

        if (card2Trigger <= triggerOffset) {
          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card2: { ...prev.card2, showBack: !prev.card2.isHovered }
            }));
          }, FLIP_DURATION + ANIMATION_DELAY);
        }

        if (card3Trigger <= triggerOffset) {
          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card3: { ...prev.card3, showBack: !prev.card3.isHovered }
            }));
          }, FLIP_DURATION + (ANIMATION_DELAY * 2));
        }
      }
    };

    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setLastScrollY(scrollY);
        updateCardProgress(scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lastScrollY]);

  const handleMouseEnter = (cardId: string) => {
    setCardStates(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], isHovered: true, showBack: !prev[cardId].showBack }
    }));
  };

  const handleMouseLeave = (cardId: string) => {
    setCardStates(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], isHovered: false, showBack: !prev[cardId].showBack }
    }));
  };

  const cards = [
    {
      id: "card1",
      color: "bg-red-500",
      position: "left-4 top-0",
      frontContent: (
        <div className="flex flex-col items-start p-12">
          <div className="mb-auto h-20 w-20 rounded-full bg-gray-200/20"></div>
          <p className="text-2xl font-light text-white mt-auto">Hush Hiven</p>
        </div>
      ),
      backContent: (
        <div className="text-xl font-light text-white p-12 text-left leading-relaxed">
          It&apos;s not just about having a website or social media presence, we understand you and your brand to market in a unique way.
        </div>
      )
    },
    {
      id: "card2",
      color: "bg-purple-500",
      position: "left-1/3 top-1/4",
      frontContent: (
        <div className="flex flex-col items-start p-12">
          <div className="mb-auto h-20 w-20 rounded-full bg-gray-200/20"></div>
          <p className="text-2xl font-light text-white mt-auto">Hush Hiven</p>
        </div>
      ),
      backContent: (
        <div className="text-xl font-light text-white p-12 text-left leading-relaxed">
          It&apos;s not just about having a website or social media presence, we understand you and your brand to market in a unique way.
        </div>
      )
    },
    {
      id: "card3",
      color: "bg-blue-600",
      position: "left-2/3 top-2/4",
      frontContent: (
        <div className="flex flex-col items-start p-12">
          <div className="mb-auto h-20 w-20 rounded-full bg-gray-200/20"></div>
          <p className="text-2xl font-light text-white mt-auto">Hush Hiven</p>
        </div>
      ),
      backContent: (
        <div className="text-xl font-light text-white p-12 text-left leading-relaxed">
          We leverage cutting-edge technology to bring your vision to life.
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <h1 className="mb-8 md:mb-16 text-center text-3xl md:text-5xl font-bold">
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          What do we do Differently?
        </span>
      </h1>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4 px-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-full aspect-square max-w-[280px] mx-auto"
            onClick={() => handleMouseEnter(card.id)}
          >
            <div 
              className={`relative w-full h-full transition-all duration-700 transform-style-3d
                ${cardStates[card.id].showBack ? 'rotate-y-180' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1500px'
              }}
            >
              <div className={`absolute w-full h-full ${card.color} flex flex-col
                shadow-lg backface-hidden rounded-sm`}>
                <div className="flex flex-col items-start p-6">
                  <div className="mb-auto h-12 w-12 rounded-full bg-gray-200/20"></div>
                  <p className="text-lg font-light text-white mt-auto">Hush Hiven</p>
                </div>
              </div>
              <div className={`absolute w-full h-full ${card.color} flex items-start
                shadow-lg backface-hidden rotate-y-180 rounded-sm`}>
                <div className="text-base font-light text-white p-6 text-left leading-relaxed">
                  {card.backContent}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div ref={containerRef} className="relative mx-auto h-[800px] max-w-[1200px]">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`absolute w-80 h-80 ${card.position}
                transition-all duration-1000 ease-out will-change-transform cursor-pointer
                hover:scale-105 group
                ${cardStates[card.id].isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-full'}`}
              style={{
                transform: `
                  translate3d(${cardStates[card.id].isVisible ? '0' : '-100%'}, 
                  ${cardStates[card.id].progress * 20}px, 0)
                  scale(${0.95 + (cardStates[card.id].progress * 0.05)})
                `,
              }}
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={() => handleMouseLeave(card.id)}
            >
              <div 
                className={`relative w-full h-full transition-all duration-700 transform-style-3d
                  group-hover:shadow-2xl
                  ${cardStates[card.id].showBack ? 'rotate-y-180' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1500px'
                }}
              >
                <div 
                  className={`absolute w-full h-full ${card.color} flex flex-col
                    shadow-lg backface-hidden rounded-sm transition-all duration-500
                    group-hover:shadow-xl`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: cardStates[card.id].isHovered ? 'scale(1.02)' : 'scale(1)'
                  }}>
                  {card.frontContent}
                </div>
                <div 
                  className={`absolute w-full h-full ${card.color} flex items-start
                    shadow-lg backface-hidden rounded-sm transition-all duration-500
                    group-hover:shadow-xl`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(180deg) ${cardStates[card.id].isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                  }}>
                  {card.backContent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}