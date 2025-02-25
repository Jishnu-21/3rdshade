import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalBookings,
      totalLeads,
      todayLeads,
      todayBookings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.contact.count(),
      prisma.contact.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.booking.count({
        where: {
          date: {
            gte: today,
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalLeads,
      todayLeads,
      totalBookings,
      todayBookings,
    });
  } catch (error) {
    console.error('Error in stats route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
