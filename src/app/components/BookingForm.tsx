'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface BookingFormProps {
  selectedService: string;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedService, onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
        }),
      });

      if (response.ok) {
        alert('Booking request submitted successfully!');
        onClose();
      } else {
        alert('Failed to submit booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Book Service: {selectedService}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        <div>
          <label htmlFor="email" className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        <div>
          <label htmlFor="phone" className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        <div>
          <label htmlFor="message" className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 rounded-md border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#955DDC] text-white rounded-md hover:bg-[#7a4eb8] transition-colors"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
