"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);

  // Replace the single mobileRef with proper useInView hook
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Add these variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cardId = entry.target.getAttribute('data-card-id');
        if (cardId) {
          if (entry.isIntersecting) {
            // When card enters viewport
            setTimeout(() => {
              setCardStates(prev => ({
                ...prev,
                [cardId]: {
                  ...prev[cardId],
                  isVisible: true
                }
              }));

              // Flip to back
              setTimeout(() => {
                setCardStates(prev => ({
                  ...prev,
                  [cardId]: {
                    ...prev[cardId],
                    showBack: true
                  }
                }));

                // Flip back to front
                setTimeout(() => {
                  setCardStates(prev => ({
                    ...prev,
                    [cardId]: {
                      ...prev[cardId],
                      showBack: false
                    }
                  }));
                }, 1000);
              }, 700);
            }, 100); // Small delay for smooth entrance
          } else {
            // When card leaves viewport
            setCardStates(prev => ({
              ...prev,
              [cardId]: {
                ...prev[cardId],
                isVisible: false,
                showBack: false
              }
            }));
          }
        }
      });
    }, options);

    // Only observe mobile cards
    if (window.innerWidth < 768) {
      const mobileCards = document.querySelectorAll('[data-card-id]');
      mobileCards.forEach(card => observer.observe(card));

      return () => {
        mobileCards.forEach(card => observer.unobserve(card));
      };
    }
  }, []);

  useEffect(() => {
    const ANIMATION_DELAY = 400;
    const FLIP_DURATION = 800;
    const RESET_DELAY = FLIP_DURATION + (ANIMATION_DELAY * 3);

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

      if (scrollingDown && !initialAnimationComplete) {
        if (card1Trigger <= triggerOffset) {
          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card1: { ...prev.card1, showBack: true }
            }));
          }, FLIP_DURATION);

          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card2: { ...prev.card2, showBack: true }
            }));
          }, FLIP_DURATION + ANIMATION_DELAY);

          setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              card3: { ...prev.card3, showBack: true }
            }));
          }, FLIP_DURATION + (ANIMATION_DELAY * 2));

          setTimeout(() => {
            setCardStates(prev => ({
              card1: { ...prev.card1, showBack: false },
              card2: { ...prev.card2, showBack: false },
              card3: { ...prev.card3, showBack: false }
            }));
            setInitialAnimationComplete(true);
          }, RESET_DELAY);
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
  }, [lastScrollY, initialAnimationComplete]);

  const handleMouseEnter = (cardId: string) => {
    if (initialAnimationComplete) {
      setCardStates(prev => ({
        ...prev,
        [cardId]: { ...prev[cardId], isHovered: true, showBack: !prev[cardId].showBack }
      }));
    }
  };

  const handleMouseLeave = (cardId: string) => {
    if (initialAnimationComplete) {
      setCardStates(prev => ({
        ...prev,
        [cardId]: { ...prev[cardId], isHovered: false, showBack: !prev[cardId].showBack }
      }));
    }
  };

  const handleMobileClick = (cardId: string) => {
    if (initialAnimationComplete) {
      handleMouseEnter(cardId);
    }
  };

  const cards = [
    {
      id: "card1",
      color: "bg-red-500",
      position: "lg:left-[5%] md:left-[10%] left-0 lg:top-[5%] md:top-[5%] top-0",
      frontContent: (
        <div className="flex flex-col items-start p-6 sm:p-8 lg:p-12">
          <div className="mb-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-200/20"></div>
          <p className="text-xl sm:text-2xl font-light text-white mt-auto">Hush Hiven</p>
        </div>
      ),
      backContent: (
        <div className="text-base sm:text-lg lg:text-xl font-light text-white p-6 sm:p-8 lg:p-12 text-left leading-relaxed">
          It&apos;s not just about having a website or social media presence, we understand you and your brand to market in a unique way.
        </div>
      )
    },
    {
      id: "card2",
      color: "bg-purple-500",
      position: "lg:left-[35%] md:left-[10%] left-0 lg:top-[25%] md:top-[40%] top-0",
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
      position: "lg:left-[65%] md:left-[10%] left-0 lg:top-[45%] md:top-[75%] top-0",
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
    <div className="bg-white p-4 md:p-8">
      <h1 className="mb-8 md:mb-12 text-center text-3xl md:text-4xl lg:text-5xl font-bold">
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          What do we do Differently?
        </span>
      </h1>

      {/* Mobile View - Updated ref implementation */}
      <motion.div 
        ref={ref}
        className="md:hidden flex flex-col gap-8 sm:gap-12 px-2"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            data-card-id={card.id}
            className="w-full aspect-square max-w-[280px] mx-auto"
            variants={cardVariants}
            onClick={() => handleMobileClick(card.id)}
          >
            <div 
              className={`relative w-full h-full transition-all duration-700 transform-style-3d
                ${cardStates[card.id].showBack ? 'rotate-y-180' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1500px'
              }}
            >
              {/* Front of card */}
              <div className={`absolute w-full h-full ${card.color} 
                shadow-lg backface-hidden rounded-sm overflow-hidden`}>
                <div className="flex flex-col items-start p-6 h-full">
                  <div className="mb-auto h-12 w-12 rounded-full bg-gray-200/20"></div>
                  <p className="text-lg font-light text-white mt-auto line-clamp-2">Hush Hiven</p>
                </div>
              </div>

              {/* Back of card */}
              <div className={`absolute w-full h-full ${card.color}
                shadow-lg backface-hidden rotate-y-180 rounded-sm overflow-hidden`}>
                <div className="h-full p-6 flex items-center justify-center">
                  <p className="text-base font-light text-white leading-relaxed break-words w-full">
                    {typeof card.backContent === 'string' 
                      ? card.backContent 
                      : "It's not just about having a website or social media presence, we understand you and your brand to market in a unique way."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div 
          ref={containerRef} 
          className="relative mx-auto h-[1000px] md:h-[1200px] lg:h-[800px] max-w-[1200px] px-4"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`absolute 
                w-[280px] md:w-[80%] lg:w-[300px] 
                h-[280px] md:h-[250px] lg:h-[300px] 
                ${card.position}
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