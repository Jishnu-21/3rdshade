"use client"

import { useEffect, useRef, useState } from 'react'

export default function Component() {
  const [isVisible, setIsVisible] = useState({
    card1: false,
    card2: false,
    card3: false,
  })

  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set the current card to visible
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))

            // Delay the visibility of the next card based on the current card's visibility
            if (entry.target.id === "card1") {
              setTimeout(() => {
                setIsVisible((prev) => ({ ...prev, card2: true }));
              }, 300); // Delay for the second card
            } else if (entry.target.id === "card2") {
              setTimeout(() => {
                setIsVisible((prev) => ({ ...prev, card3: true }));
              }, 300); // Delay for the third card
            }
          } else {
            // Reset visibility when the card is not in view
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: false }));
          }
        })
      },
      { threshold: 0.3 }
    )

    if (card1Ref.current) observer.observe(card1Ref.current)
    if (card2Ref.current) observer.observe(card2Ref.current)
    if (card3Ref.current) observer.observe(card3Ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="mb-16 text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          What do we Differently?
        </span>
      </h1>
      <div className="relative mx-auto h-[700px] max-w-[900px]">
        {[
          { ref: card1Ref, id: "card1", color: "bg-red-500", top: "top-0", left: "left-0" },
          { ref: card2Ref, id: "card2", color: "bg-purple-500", top: "top-1/3", left: "left-1/3" },
          { ref: card3Ref, id: "card3", color: "bg-blue-500", top: "top-2/3", left: "left-2/3" },
        ].map((card, index) => (
          <div
            key={card.id}
            ref={card.ref}
            id={card.id}
            className={`absolute h-72 w-72 ${card.color} p-6 shadow-lg transition-all duration-1000 ease-out
              ${card.top} ${card.left}
              ${isVisible[card.id] ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-[-10px] translate-y-16 opacity-0'}`} // Adjusted translate properties
          >
            {index !== 1 && (
              <>
                <div className="mb-4 h-28 w-28 rounded-full bg-gray-300"></div>
                <p className="text-2xl text-white">Hush Hiven</p>
              </>
            )}
            {index === 1 && (
              <p className="text-lg text-white">
                It's not just about having a website or social media presence. We understand you and your brand to market in a
                unique way.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}