import React from 'react';
import Image from 'next/image';

const ProblemSolution = ({ industry, title, description, imageSrc }) => (
  <div className="flex flex-col items-center mb-12 md:mb-0">
    <div className="relative w-full md:w-4/5 aspect-[4/3] mb-6">
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="text-start w-full md:w-4/5">
      <p className="text-[#955DDC] font-medium uppercase mb-2 md:mb-4 text-sm md:text-base">{industry}</p>
      <h3 className="text-black text-xl md:text-2xl font-bold mb-3 md:mb-5">{title}</h3>
      <p className="text-black text-sm md:text-base">{description}</p>
    </div>
  </div>
);

const IndustryProblems = () => {
  return (
    <section className='py-12 md:py-16 lg:py-[120px] bg-white'>
      <div className="container px-4 md:px-[122px]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10 md:mb-16">
          Industry Specific Problems<br className="hidden sm:inline" />Solved With Design
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
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