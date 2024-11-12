import Image from 'next/image'
import React from 'react'

const WebDevelopmentServices: React.FC = () => {
  return (
    <div className="relative">
      {/* Fixed white background that covers entire scrollable area */}
      <div className="fixed inset-0 bg-white" style={{ height: '400vh' }}></div>
      
      <div className="relative container px-4 md:px-[122px] py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left section - Sticky */}
          <div className="md:w-1/2 md:sticky md:top-0 md:h-screen md:flex md:flex-col">
            <div className="mb-12">
              <h1 className="text-6xl font-bold mb-8 text-black">Web <br/>Development</h1>
              <button className="bg-black text-white px-10 py-2 rounded-[21px] text-lg">
                Get in touch
              </button>
            </div>
            <div className="flex-grow flex items-center">
              <Image
                src="/service1.png"
                alt="Developer working on code"
                width={500}
                height={761}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          
          {/* Right section - Scrollable */}
          <div className="md:w-1/2">
            <p className='mb-[140px] mt-[30px] text-black'>We understand the nuances of websites and apps owing to our focus on user-centric design and development. 150+ businesses have trusted us for creating high-quality digital products.</p>
            <h2 className="text-5xl font-bold mb-[300px] text-black">Full-stack <br/>Development</h2>
            
            {[
              {
                title: "Websites",
                description: "From a static GitHub site to a dynamic WordPress site, we can do it all to present your business in the best manner possible."
              },
              {
                title: "Cloud based applications",
                description: "Choose us to design future-ready SaaS products and deploy them with our end-to-end support."
              },
              {
                title: "Enterprise applications",
                description: "Optimize workplace productivity and improve processes using custom software we would create based on your requirements."
              },
              {
                title: "SaaS applications",
                description: "Choose us to design future-ready SaaS products and deploy them with our end-to-end support."
              },
              {
                title: "Quality Assurance",
                description: "Grow your business without worrying about the quality of the products we create for you. Our engineers assure you of top-notch quality and performance."
              }
            ].map((service, index) => (
              <div key={index} className="mb-[300px]">
                <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
                <p className="text-black">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebDevelopmentServices