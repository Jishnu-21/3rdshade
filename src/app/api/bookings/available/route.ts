import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');

    if (!dateStr) {
      return NextResponse.json(
        { message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const date = new Date(dateStr);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch bookings for the selected date
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        time: true,
      },
    });

    // Return the booked times
    return NextResponse.json({
      bookings: bookings.map(booking => booking.time)
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { message: 'Error fetching available slots' },
      { status: 500 }
    );
  }
}
