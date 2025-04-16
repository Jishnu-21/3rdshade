import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/authOptions";
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookings: true,
        consultations: {
          where: { isFree: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const latestBooking = user.bookings.length > 0 ? user.bookings[0] : null;

    return NextResponse.json({
      totalBookings: user.bookings.length,
      freeConsultationsUsed: user.bookings.length > 0,
      bookingDetails: latestBooking ? {
        date: latestBooking.date.toISOString().split('T')[0],
        time: latestBooking.time,
      } : null,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
