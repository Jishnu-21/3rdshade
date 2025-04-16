import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const position = formData.get('position') as string;
    const resume = formData.get('resume') as File;

    // Convert File to Buffer for email attachment
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@3rdshade.in',
      subject: `New Job Application: ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Job Application Received</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-top: 0;">Position Details</h3>
            <p><strong>Role:</strong> ${position}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-top: 0;">Cover Letter</h3>
            <p style="white-space: pre-line;">${coverLetter}</p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Please find the applicant's resume attached to this email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    });
  } catch (error) {
    console.error('Error sending application:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit application' 
      },
      { status: 500 }
    );
  }
}
