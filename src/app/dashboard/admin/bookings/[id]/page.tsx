'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
}

export default function BookingManagementPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/admin/bookings/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking');
        }
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        setError('Error fetching booking details');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/bookings/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      const updatedBooking = await response.json();
      setBooking(updatedBooking);
    } catch (error) {
      setError('Error updating booking status');
      console.error('Error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error || 'Booking not found'}</p>
        <Button onClick={() => router.push('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-black font-bold">Manage Booking</h2>
        <Button 
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="text-black"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Booking Details */}
        <Card className="p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-black">{new Date(booking.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium text-black">{booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full 
                ${booking.status === 'confirmed' ? 'bg-green-100 text-black' : 
                  booking.status === 'pending' ? 'bg-yellow-100 text-black' : 
                  booking.status === 'cancelled' ? 'bg-red-100 text-black' : 
                  'bg-gray-100 text-black'}`}>
                {booking.status}
              </span>
            </div>
          </div>
        </Card>

        {/* User Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-black mb-4">User Details</h2>
          <div className="space-y-2">
            <p><span className="text-gray-500">Name:</span> <span className="text-black">{booking.user.name}</span></p>
            <p><span className="text-gray-500">Email:</span> <span className="text-black">{booking.user.email}</span></p>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Service Details</h2>
          <div className="space-y-2">
            <p><span className="text-gray-500">Service:</span> <span className="text-black">{booking.service.name}</span></p>
            <p><span className="text-gray-500">Duration:</span> <span className="text-black">{booking.service.duration} minutes</span></p>
            <p><span className="text-gray-500">Price:</span> <span className="text-black">${booking.service.price}</span></p>
          </div>
        </Card>

        {/* Status Management */}
        <Card className="p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Update Status</h2>
          <div className="flex gap-4">
            <Button
              variant={booking.status === 'pending' ? 'default' : 'outline'}
              onClick={() => handleStatusUpdate('pending')}
              disabled={isUpdating || booking.status === 'pending'}
              className="text-black"
            >
              Mark as Pending
            </Button>
            <Button
              variant={booking.status === 'confirmed' ? 'default' : 'outline'}
              onClick={() => handleStatusUpdate('confirmed')}
              disabled={isUpdating || booking.status === 'confirmed'}
              className="text-black"
            >
              Confirm
            </Button>
            <Button
              variant={booking.status === 'completed' ? 'default' : 'outline'}
              onClick={() => handleStatusUpdate('completed')}
              disabled={isUpdating || booking.status === 'completed'}
              className="text-black"
            >
              Complete
            </Button>
            <Button
              variant={booking.status === 'cancelled' ? 'destructive' : 'outline'}
              onClick={() => handleStatusUpdate('cancelled')}
              disabled={isUpdating || booking.status === 'cancelled'}
              className="text-black"
            >
              Cancel
            </Button>
          </div>
          {isUpdating && (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Updating status...</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
