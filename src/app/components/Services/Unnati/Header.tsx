import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-black py-2 sm:py-3 mt-4 sm:mt-6 md:mt-8">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center h-[50px] sm:h-[60px] md:h-[70px] px-4 sm:px-6">
        <Link href="/">
          <Image
            src="/unnatilogo.png"
            alt="Unnati Logo"
            width={200}
            height={64}
            className="w-[140px] sm:w-[160px] md:w-[200px] cursor-pointer transition-transform hover:scale-105"
            priority
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;