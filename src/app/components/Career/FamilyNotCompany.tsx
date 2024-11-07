import Image from 'next/image'

export default function FamilyNotCompany() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-black text-white">
      <div className="w-full md:w-1/2 lg:w-[467px] h-[300px] md:h-auto md:pl-[30px] lg:pl-[60px] xl:pl-[125px] mx-auto md:mx-0">
        <Image
          src="/familynot.webp"
          alt="Plate with two slices of toast topped with kiwi fruit, nuts, and other ingredients"
          width={467}
          height={537}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-16 py-8 md:py-12">
        <div className="flex flex-col max-w-[500px]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold pb-4 md:pb-4 lg:pb-6">Family, not company</h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-[18px] leading-relaxed">
            Like our design, the qualities that sets us apart are simple and yet amazing. 
            We won&apos;t promise you the world when you come to work with us, but we will 
            commit to uphold the values that make 3rd shade a great place to work at.
          </p>
        </div>
      </div>
    </div>
  )
}
