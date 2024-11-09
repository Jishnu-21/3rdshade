import React from 'react'
import Image from 'next/image';

const BlogImage = () => {
  return (
    <div className="w-full bg-white">
      <Image 
        src="/blog1.png" 
        alt="3rd Shade team meeting" 
        className="w-full h-auto object-cover"
        width={500}
        height={300}
      />
    </div>
  )
}

export default BlogImage