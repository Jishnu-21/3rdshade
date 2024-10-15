import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, organization, email, website, services, message } = body;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
  });

  try {
    // Send email
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

// Add this to handle OPTIONS requests (for CORS preflight)
export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}