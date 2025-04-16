'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const SocialLinks = () => {
  const [visible, setVisible] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/3rdshade.in/',
      icon: FaInstagram,
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/3rd-shade',
      icon: FaLinkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100095235566896',
      icon: FaFacebook,
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className={`flex flex-col gap-4 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full shadow-lg backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-300 ${social.color} hover:scale-110`}
            aria-label={`Follow us on ${social.name}`}
          >
            <social.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
