'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';
import Calendar from 'react-calendar';
import type { MouseEvent } from 'react';
import 'react-calendar/dist/Calendar.css';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  available: boolean;
  displayTime: string;
}

// Generate time slots from 9 AM to 5 PM with 1-hour intervals
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    slots.push({
      time,
      available: true,
      displayTime: `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`
    });
  }
  return slots;
};

const predefinedTimeSlots = generateTimeSlots();

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(predefinedTimeSlots);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hasUsedFreeConsultation, setHasUsedFreeConsultation] = useState<boolean>(false);

  // Fetch available time slots when the date changes
  useEffect(() => {
    fetchAvailableSlots();
  }, [date]);

  // Fetch user stats to check if they have used the free consultation
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/dashboard/user-stats');
        if (response.ok) {
          const data = await response.json();
          setHasUsedFreeConsultation(data.freeConsultationsUsed);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bookings/available?date=${date.toISOString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      const data = await response.json();

      // Update available slots based on fetched data
      const updatedSlots = predefinedTimeSlots.map((slot: TimeSlot) => {
        const isBooked = Array.isArray(data.bookings) && data.bookings.includes(slot.time);
        return { ...slot, available: !isBooked };
      });

      setTimeSlots(updatedSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch services when component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
      if (data.length > 0) {
        setSelectedService(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setDate(value);
      setSelectedTime(null);
      setBookingStatus(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
    setBookingStatus(null);
  };

  const handleBooking = async () => {
    if (!selectedTime || !selectedService) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date.toISOString(),
          time: selectedTime,
          serviceId: selectedService,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setBookingStatus('Booking successful!');
        setSelectedTime(null);
        fetchAvailableSlots(); // Refresh available slots
      } else {
        setBookingStatus(data.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/session'); // Adjust this endpoint as necessary
      if (!response.ok) {
        // Handle unauthorized access, e.g., redirect to login
        console.error('User is not authenticated');
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl text-black font-bold mb-8">Book an Appointment</h2>
      
      {hasUsedFreeConsultation && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          You have already used your free consultation. You cannot book again.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-black font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" /> Select Date
          </h2>
          <Calendar
            onChange={(value: any, event: MouseEvent<HTMLButtonElement>) => {
              if (value instanceof Date) {
                setDate(value);
                setSelectedTime(null);
              }
            }}
            value={date}
            className={cn("w-full text-black bg-white rounded-lg")}
            minDate={new Date()}
            tileDisabled={({ date }) => date < new Date()}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-black font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" /> Available Time Slots
          </h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot: TimeSlot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  className={cn(
                    "p-3 rounded-md text-sm font-medium transition-colors",
                    slot.available
                      ? selectedTime === slot.time
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  disabled={!slot.available || hasUsedFreeConsultation}
                >
                  {slot.displayTime}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="service" className="text-sm font-medium text-gray-700">
                Select Service
              </label>
              <select
                id="service"
                value={selectedService || ''}
                onChange={(e) => setSelectedService(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedTime && (
            <div className="mt-6">
              <button
                onClick={handleBooking}
                disabled={isLoading || hasUsedFreeConsultation}
                className={cn(
                  "w-full py-2 px-4 rounded-md bg-blue-600 text-white font-medium",
                  "hover:bg-blue-700 transition-colors",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Booking...
                  </span>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>
          )}

          {bookingStatus && (
            <div className={cn(
              "mt-4 p-3 rounded-md text-sm",
              bookingStatus.includes('successful') 
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            )}>
              {bookingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
