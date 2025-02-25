import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/db';

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
});

export async function POST(request: Request) {
  try {
    const { email, action } = await request.json();
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Store OTP in database
    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt,
        action // 'register' or 'login'
      }
    });

    // Send OTP email
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your OTP for ${action === 'register' ? 'Registration' : 'Login'}`,
      html: `
        <h2>Verification Code</h2>
        <p>Your OTP for ${action} is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp, action } = await request.json();

    // Verify OTP
    const storedOTP = await prisma.oTP.findFirst({
      where: {
        email,
        otp,
        action,
        expiresAt: {
          gt: new Date()
        },
        used: false
      }
    });

    if (!storedOTP) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: storedOTP.id },
      data: { used: true }
    });

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
} 