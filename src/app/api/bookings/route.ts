import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { serviceId, date, time } = await request.json();
    
    // Get user from session
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        user: {
          connect: {
            id: user.id
          }
        },
        service: {
          connect: {
            id: serviceId
          }
        },
        date: new Date(date),
        time: time,
        status: 'pending'
      },
      include: {
        user: true,
        service: true
      }
    });

    // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Booking Confirmation - 3rdshade',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Booking Confirmation</h1>
          <p>Dear ${user.name},</p>
          <p>Thank you for booking with 3rdshade. Here are your booking details:</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Service:</strong> ${service.name}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
          </div>
          <p>We will contact you shortly to confirm your booking.</p>
          <p style="margin-top: 30px;">Best regards,<br>3rdshade Team</p>
        </div>
      `
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const userId = (session.user as any).id;

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}
