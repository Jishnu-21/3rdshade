"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-gradient-to-b from-black to-neutral-900">
      <h2 className="max-w-7xl mx-auto text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-sans mb-8 text-center px-4">
        One Brand, Many Dimensions.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 md:p-14 rounded-3xl mb-4 shadow-xl border border-neutral-700"
          >
            <p className="text-neutral-300 text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-white mb-4 block text-3xl">
                Innovate. Create. Transform.
              </span>
              Experience the future of digital services with 3rdshade. Our cutting-edge solutions are designed to revolutionize how you interact with technology, making every moment seamless and intuitive.
            </p>
            <Image
              src={`/images/service-${index + 1}.jpg`}
              alt="3rdshade service illustration"
              height="600"
              width="800"
              className="w-full h-[400px] mt-8 rounded-xl object-cover shadow-lg"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Realty",
    title: "3rdshade Realty",
    src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Live",
    title: "3rdshade Live",
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Finance",
    title: "3rdshade Finance",
    src: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071&auto=format&fit=crop",
    content: <DummyContent />,
  }
];
