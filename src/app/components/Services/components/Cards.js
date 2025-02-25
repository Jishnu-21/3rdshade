"use client";
import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Cards = ({ i, title, description, src, url, color }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Parallax effect for image scaling
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  // Card position for stacking effect
  const y = useTransform(scrollYProgress, [0, 1], [i * 100, 0]);
  // Slight scaling for depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <div
      ref={container}
      className="relative w-11/12 mx-auto mb-[-30%] transform-gpu"
    >
      <motion.div
        style={{
          backgroundColor: color,
          y,
          scale,
          zIndex: 20 - i, // Higher z-index for cards lower in the stack
        }}
        className="absolute rounded-3xl shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="flex flex-col md:flex-row h-[400px] md:h-[300px] w-full">
          {/* Text Content */}
          <div className="p-6 md:p-8 flex-1 bg-opacity-90 text-black">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-base mb-4 leading-relaxed">{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:text-gray-700"
            >
              See more →
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          {/* Image */}
          <div className="relative flex-1 h-full">
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full"
            >
              <Image
                src={`/images/${src}`}
                alt={title}
                fill
                className="object-cover rounded-r-3xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cards;