'use client'

import Link from 'next/link';
import Image from 'next/image';
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleWorkNavigation = () => {
    router.push('/work');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header className="w-full bg-black py-2 sm:py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[50px] sm:h-[60px] md:h-[70px] px-4 sm:px-6">
        {/* Back Button */}
        <Link 
          href="/services"
          className="inline-flex items-center gap-2 text-white hover:text-[#30D5B6] transition-colors duration-300"
        >
          <IoArrowBack className="text-xl sm:text-2xl" />
        </Link>

        {/* Logo - centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div onClick={handleWorkNavigation} className="cursor-pointer">
            <Image     
              src="/unnatilogo.png"
              alt="Unnati Logo"
              width={200}
              height={64}
              className="w-[140px] sm:w-[160px] md:w-[200px] transition-transform hover:scale-105"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Empty div for flex spacing */}
        <div className="w-8" />
      </div>
    </header>
  );
};

export default Header;
