import React from 'react';
import Image from 'next/image';

interface TechnologyCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="mb-4 h-40 relative">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TechnologyCard;