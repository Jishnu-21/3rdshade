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
    // Send notification email to admin
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: "info@3rdshade.in",
      subject: "New Lead Form Submission",
      text: `
        Name: ${name}
        Organization: ${organization}
        Email: ${email}
        Website: ${website}
        Services: ${services.join(', ')}
        Message: ${message}
      `,
      html: `
        <h2>Lead Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"3rdshade.in" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting 3rdshade.in",
      text: `
        Dear ${name},

        Thank you for reaching out to 3rdshade.in. We have received your inquiry and our team will get back to you shortly.

        Here's a summary of your submission:
        Organization: ${organization}
        Services Interested: ${services.join(', ')}
        
        We appreciate your interest in our services.

        Best regards,
        Team 3rdshade.in
      `,
      html: `
        <h2>Thank you for contacting 3rdshade.in</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to 3rdshade.in. We have received your inquiry and our team will get back to you shortly.</p>
        
        <h3>Your submission details:</h3>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Services Interested:</strong> ${services.join(', ')}</p>
        
        <p>We appreciate your interest in our services.</p>
        
        <p>Best regards,<br>Team 3rdshade.in</p>
      `,
    });

    return NextResponse.json({ message: 'Emails sent successfully' });
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