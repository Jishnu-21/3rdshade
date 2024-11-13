import React from 'react';

const BlogIntro: React.FC = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24 text-start bg-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">
        Goals, Laughter, and Teamwork: 3RD SHADE&apos;s Inogration
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
        We understand the nuances of websites and apps owing to our focus on user-centric design
      </p>
      <button className="bg-black text-white px-8 sm:px-10 md:px-12 py-2 sm:py-3 rounded-[22px] border border-red-500 text-sm sm:text-base">
        Get in touch
      </button>
    </div>
  );
};

export default BlogIntro;