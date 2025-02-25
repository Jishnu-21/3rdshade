import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  organization: z.string().optional(),
  email: z.string().email('Invalid email format'),
  website: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  services: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate input data
    const validationResult = contactSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        organization: data.organization || null,
        email: data.email,
        website: data.website || null,
        message: data.message,
        services: data.services,
        status: 'pending', // Default status for new leads
      },
    });

    return NextResponse.json({
      success: true,
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        status: contact.status,
        createdAt: contact.createdAt,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Failed to save contact form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
