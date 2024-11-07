import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-black py-3">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-[70px] px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/unnati logo 1.png"
            alt="Unnati Logo"
            width={100}
            height={32}
            className="cursor-pointer"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center">
          <nav className="flex items-center gap-8 mr-8">
            <Link href="/process" className="text-white hover:text-gray-300 text-[15px] font-light">
              Process
            </Link>
            <Link href="/benefits" className="text-white hover:text-gray-300 text-[15px] font-light">
              Benefits
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300 text-[15px] font-light">
              Services
            </Link>
            <Link href="/portfolio" className="text-white hover:text-gray-300 text-[15px] font-light">
              Portfolio
            </Link>
            <Link href="/faq" className="text-white hover:text-gray-300 text-[15px] font-light">
              FAQ
            </Link>
          </nav>
          
          <Link 
            href="/get-started" 
            className="bg-[#AAFF00] text-black px-6 py-2.5 rounded-[6px] hover:bg-[#95E600] transition-colors text-[15px] font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;