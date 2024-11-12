import React from 'react';
import Image from 'next/image';

const ProblemSolution = ({ industry, title, description, imageSrc }) => (
  <div className="flex flex-col items-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 rounded-xl">
    <div className="relative w-full aspect-[4/3] mb-4 sm:mb-6 overflow-hidden rounded-lg group">
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority
      />
    </div>
    <div className="text-start w-full">
      <p className="text-[#955DDC] font-medium uppercase mb-2 sm:mb-3 
        text-xs sm:text-sm md:text-base tracking-wider">
        {industry}
      </p>
      <h3 className="text-black text-lg sm:text-xl md:text-2xl font-bold 
        mb-2 sm:mb-3 md:mb-4 line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg 
        leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>
  </div>
);

const IndustryProblems = () => {
  return (
    <section className='py-8 sm:py-12 md:py-16 lg:py-[120px] bg-white'>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[122px]">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-bold text-center text-black 
          mb-6 sm:mb-8 md:mb-12 lg:mb-16 
          px-4 sm:px-8 md:px-16">
          <span className="block sm:hidden">Industry Problems Solved</span>
          <span className="hidden sm:block">
            Industry Specific Problems<br />
            Solved With Design
          </span>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-6 sm:gap-8 md:gap-10 lg:gap-12
          max-w-[1200px] mx-auto">
          <ProblemSolution
            industry="ARTIFICIAL INTELLIGENCE"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem1.png"
          />
          <ProblemSolution
            industry="CAR POOLING"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem2.png"
          />
          <ProblemSolution
            industry="3D PRINTING"
            title="UX & UI Design for Kyte App"
            description="Interact with your users on the platform they prefer. Web and mobile - we have you covered."
            imageSrc="/problem3.png"
          />
        </div>
      </div>
    </section>
  );
};

export default IndustryProblems;