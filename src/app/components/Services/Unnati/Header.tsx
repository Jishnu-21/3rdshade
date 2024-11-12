import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-black py-3">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center h-[70px] px-6">
        <Link href="/">
          <Image
            src="/unnatilogo.png"
            alt="Unnati Logo"
            width={200}
            height={64}
            className="cursor-pointer transition-transform hover:scale-105"
            priority
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;