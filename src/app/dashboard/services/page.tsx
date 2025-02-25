'use client';

import { useState } from 'react';
import Modal from '@/app/components/Homepage/Modal';
import BookingForm from '@/app/components/BookingForm';
import { 
  Palette, 
  Globe, 
  TrendingUp, 
  Layers, 
  Search, 
  ShoppingBag, 
  Smartphone, 
  Users, 
  MessageSquare 
} from 'lucide-react';

const services = [
  { name: 'Branding', icon: Palette },
  { name: 'Website Development', icon: Globe },
  { name: 'Performance Marketing', icon: TrendingUp },
  { name: 'UI/UX Design', icon: Layers },
  { name: 'SEO', icon: Search },
  { name: 'E-Commerce Listing', icon: ShoppingBag },
  { name: 'App Development', icon: Smartphone },
  { name: 'Influencer Marketing', icon: Users },
  { name: 'Social Media Management', icon: MessageSquare }
];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBookNow = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className={`text-3xl font-bold mb-8 text-black`}>
        Our Services
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className={`
                bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all
                border border-[#955DDC]/20
              `}
            >
              <div className="w-12 h-12 bg-[#955DDC]/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-[#955DDC]" />
              </div>
              <h3 className={`text-xl font-semibold mb-4 text-black`}>{service.name}</h3>
              <button 
                onClick={() => handleBookNow(service.name)}
                className="bg-[#955DDC] text-white px-6 py-2 rounded-lg hover:bg-[#7a4eb8] transition-colors"
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BookingForm selectedService={selectedService} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
