import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/authOptions";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      role: session.user.role,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email
      }
    });
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}