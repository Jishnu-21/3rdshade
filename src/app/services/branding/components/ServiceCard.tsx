import React from 'react';
import { Rocket } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center h-auto flex flex-col">
      <div className="flex justify-center mb-4">
        <div className="bg-emerald-50 p-4 rounded-full">
          <Rocket className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
      <h3 className="text-2xl text-black font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default ServiceCard;