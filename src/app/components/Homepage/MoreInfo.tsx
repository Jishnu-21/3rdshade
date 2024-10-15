import React from 'react';
import Link from 'next/link';

const MoreInfo = () => (
  <div className="bg-white rounded-lg py-20 px-8 text-center mb-16">
    <h2 className="text-5xl text-black font-bold mb-14">For more information</h2>
    <Link href="/contact" className="inline-block">
      <button className="bg-black text-white text-lg px-24 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(0,255,255,0.6)] focus:outline-none">
        Contact us
      </button>
    </Link>
  </div>
);

export default MoreInfo;