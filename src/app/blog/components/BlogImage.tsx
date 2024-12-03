import React from 'react'
import Image from 'next/image';

const BlogImage = () => {
  return (
    <div className="w-full relative">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        <Image 
          src="/blog1.png" 
          alt="3rd Shade team meeting" 
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      </div>
    </div>
  )
}

export default BlogImage