import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Add GET handler to show running message
export async function GET() {
  return NextResponse.json({ 
    message: 'Email service is running on Next.js default port (3000)',
    status: 'active'
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, organization, email, website, services, message } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
  });

  try {
    await transporter.sendMail({
      from: `"Your Website" <${process.env.GMAIL_USER}>`,
      to: "jpjishnu21@gmail.com",
      subject: "New Support Form Submission",
      text: `
        Name: ${name}
        Organization: ${organization}
        Email: ${email}
        Website: ${website}
        Services: ${services.join(', ')}
        Message: ${message}
      `,
      html: `
        <h2>New Support Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}