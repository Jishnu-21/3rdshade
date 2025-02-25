import { cookies } from 'next/headers';
import { prisma } from './db';
import { verify } from 'jsonwebtoken';

export async function auth() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token?.value) {
    return null;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      return null;
    }

    const decoded = verify(token.value, jwtSecret) as { id: string };
    
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return null;
    }

    return {
      user
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete('token');
}

export async function signIn(credentials: { email: string; password: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email,
      password: credentials.password // Note: In production, use proper password hashing
    }
  });

  if (!user) {
    return null;
  }

  const cookieStore = cookies();
  cookieStore.set('token', user.id);

  return user;
}
