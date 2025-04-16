'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Users, BookOpen, Clock, MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import { format } from 'date-fns';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Booking {
  id: string;
  time: string;
  userName: string;
  service: string;
  status: string;
  date?: string;
}

interface DashboardStats {
  totalUsers?: number;
  totalBookings?: number;
  totalLeads?: number;
  todayLeads?: {
    id: string;
    name: string;
    email: string;
    services: string[];
    createdAt: string;
  }[];
  freeConsultationsUsed?: boolean;
  bookingDetails?: { date: string; time: string } | null;
  todaysBookings?: Booking[];
  selectedDateBookings?: Booking[];
  upcomingBookings?: Booking[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [displayBookings, setDisplayBookings] = useState<Booking[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        if (data.authenticated) {
          setIsAdmin(data.role === UserRole.ADMIN);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats({
          ...data,
          todayLeads: data.todayLeads || [],
          totalLeads: data.totalLeads || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    if (session) {
      checkAuth();
      fetchDashboardStats();
    }
  }, [isAdmin, session]);

  const fetchBookingsForDate = async (date: Date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await fetch(`/api/dashboard/bookings/${formattedDate}`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setDisplayBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setDisplayBookings([]);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      fetchBookingsForDate(date);
    } else {
      setDisplayBookings(stats.todaysBookings || []);
    }
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to access the dashboard</h1>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-black font-bold">
        Welcome back, {session.user?.name || 'User'}
      </h1>
      
      {/* Quick Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAdmin ? (
          <>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <Users className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl text-black font-bold">{stats.totalUsers || 0}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <BookOpen className="h-10 w-10 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <h3 className="text-2xl font-bold text-black">{stats.totalBookings || 0}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <MessageSquare className="h-10 w-10 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Leads</p>
                  <h3 className="text-2xl text-black font-bold">{stats.totalLeads || 0}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <Clock className="h-10 w-10 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Today's Bookings</p>
                  <h3 className="text-2xl font-bold text-black">
                    {stats.todaysBookings?.length || 0}
                  </h3>
                </div>
              </div>
            </Card>
            <Card className="col-span-full p-6 bg-white">
              <h2 className="text-xl text-black font-bold mb-4">Today's Leads</h2>
              {stats.todayLeads && stats.todayLeads.length > 0 ? (
                <div className="space-y-4">
                  {stats.todayLeads.map((lead) => (
                    <div key={lead.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-black">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {lead.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No leads received today</p>
              )}
            </Card>
          </>
        ) : (
          <>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <CalendarIcon className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Your Booking</p>
                  {stats.bookingDetails ? (
                    <h3 className="text-2xl text-black font-bold">
                      {stats.bookingDetails.date} at {stats.bookingDetails.time}
                    </h3>
                  ) : (
                    <h3 className="text-2xl text-black font-bold">No bookings</h3>
                  )}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="flex items-center space-x-4">
                <Clock className="h-10 w-10 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Free Consultation</p>
                  <h3 className="text-2xl text-black font-bold">
                    {stats.freeConsultationsUsed ? 'Used' : 'Available'}
                  </h3>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Section */}
          <Card className="p-4 sm:p-6 bg-white">
            <h2 className="text-2xl text-gray-900 font-bold mb-4">Booking Calendar</h2>
            <div className="flex justify-center w-full">
              <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[350px] xl:max-w-[400px]">
                <Calendar
                  value={selectedDate}
                  onChange={(date) => handleDateSelect(date as Date)}
                  className="rounded-md border w-full"
                />
              </div>
            </div>
          </Card>

          {/* Bookings Display */}
          <Card className="p-4 sm:p-6 bg-white overflow-auto max-h-[600px]">
            <h2 className="text-2xl text-black font-bold mb-4">
              {selectedDate 
                ? `Bookings for ${format(selectedDate, 'MMMM d, yyyy')}`
                : "Today's Bookings"}
            </h2>
            <div className="space-y-4 text-black">
              {displayBookings.length > 0 ? (
                displayBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-black">{booking.userName}</p>
                        <p className="text-sm text-gray-500">{booking.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black">{booking.time}</p>
                        <span className={`text-sm px-2 py-1 rounded ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No bookings found for this date</p>
              )}
            </div>
          </Card>
        </div>
      ) : (
        <>
          <Card className="p-6 bg-white">
            <h2 className="text-2xl text-black font-bold mb-4">About Our Company</h2>
            <p className="text-gray-600 mb-4">
              We are committed to providing exceptional service and personalized solutions
              for all your needs. Our team of experts is here to help you achieve your goals.
            </p>
            {!stats.freeConsultationsUsed && (
              <div className="mt-4">
                <h3 className="text-xl text-black font-semibold mb-2">Free Consultation Offer!</h3>
                <p className="text-gray-600 mb-4">
                  Book your free consultation session today and let us help you get started
                  on your journey.
                </p>
                <Button asChild>
                  <Link href="/dashboard/calendar">Book Free Consultation</Link>
                </Button>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white">
              <h3 className="text-xl text-black font-bold mb-4">Special Offers</h3>
              <img
                src="/images/promo1.jpg"
                alt="Special Offer"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600">
                We are offering a free consulting call with our CEO! Book your session today and get personalized insights to help you achieve your goals.
              </p>
            </Card>
            <Card className="p-6 bg-white">
              <h3 className="text-xl text-black font-bold mb-4">Upcoming Events</h3>
              <img
                src="/images/promo2.jpg"
                alt="Upcoming Events"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600">
                Stay tuned for our upcoming events and workshops!
              </p>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
