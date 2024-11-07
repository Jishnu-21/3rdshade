import React from "react";
import Image from 'next/image';

const CareerDifference = () => {
  return (
    <div className="w-full pt-[30px] sm:pt-[50px] md:pt-[75px] lg:pt-[100px] pb-[30px] sm:pb-[50px] min-h-screen overflow-x-hidden bg-white">
      <div className="max-w-[1175px] mx-auto flex-grow">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-black">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold pb-[50px] sm:pb-[75px] md:pb-[100px] lg:pb-[200px] text-black leading-tight">
              What<br />makes us<br />different?
            </h1>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold pb-4 sm:pb-6 text-black">
                Family, not company
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 pb-6 sm:pb-8 text-black max-w-md">
                Like our design, the qualities that sets us apart are
                simple and yet amazing. We won&apos;t promise you the
                world when you come to work with us, but we will
                commit to uphold the values that make 3rd shade a
                great place to work at.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 pb-[50px] sm:pb-[75px] md:pb-[100px] lg:pb-[150px] text-black">
              Like our design, the qualities that sets us apart are
              simple and yet amazing. We won&apos;t promise you the
              world when you come to work with us, but we will
              commit to uphold the values that make 3rd shade a
              great place to work at.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="aspect-square">
                <Image
                  src="/different1.jpg"
                  alt="Career hero image 1"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
              <div className="row-span-2">
                <Image
                  src="/different3.jpg"
                  alt="Career hero image 2"
                  width={500}
                  height={1000}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
              <div className="aspect-square">
                <Image
                  src="/different2.jpg"
                  alt="Career hero image 3"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDifference;
