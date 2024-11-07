import React from 'react';
import Image from 'next/image';

const LifeAtShade = () => {
  const images = [
    '/grid1.jpg',
    '/grid2.jpg',
    '/grid3.jpg',
    '/grid4.jpg',
    '/grid5.jpg',
    '/grid6.jpg',
    '/grid7.jpg',
    '/grid8.jpg',
    '/grid9.jpg',
    '/grid10.jpg',
  ];

  return (
    <section className="life-at-shade bg-white py-20"> {/* Set background to white */}
      <div className="container mx-auto px-4">
        <div className="relative text-center pb-16">
          <h3 className="text-black text-4xl font-cursive absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-4">Life at</h3>
          <h2 className="text-8xl font-bold text-gray-200 mt-8">3RD SHADE</h2>
        </div>
        
        <div className="grid grid-cols-6 gap-1">
          <div className="col-span-3 row-span-3">
            <Image src={images[0]} alt="Life at 3RD SHADE" layout="responsive" width={600} height={600} objectFit="cover" />
          </div>
          <div className="col-span-3 row-span-3">
            <Image src={images[1]} alt="Life at 3RD SHADE" layout="responsive" width={600} height={600} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[2]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[3]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[4]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
          <div className="col-span-3 row-span-2">
            <Image src={images[5]} alt="Life at 3RD SHADE" layout="responsive" width={600} height={400} objectFit="cover" />
          </div>
          <div className="col-span-3 row-span-2">
            <Image src={images[6]} alt="Life at 3RD SHADE" layout="responsive" width={600} height={400} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[7]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[8]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
          <div className="col-span-2 row-span-2">
            <Image src={images[9]} alt="Life at 3RD SHADE" layout="responsive" width={400} height={400} objectFit="cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeAtShade;
