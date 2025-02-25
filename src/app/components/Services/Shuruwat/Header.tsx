import Link from 'next/link';
import Image from 'next/image';
import { IoArrowBack } from "react-icons/io5";

const Header = () => {
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
          <Link href="/">
            <Image
              src="/shuruwat-logo.png"
              alt="Unnati Logo"
              width={200}
              height={64}
              className="w-[140px] sm:w-[160px] md:w-[200px] cursor-pointer transition-transform hover:scale-105"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Empty div to maintain flex spacing */}
        <div className="w-[72px] sm:w-[88px]"></div>
      </div>
    </header>
  );
};

export default Header;