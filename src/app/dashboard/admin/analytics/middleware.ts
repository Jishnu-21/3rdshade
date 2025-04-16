import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the user session and role
  const user = request.cookies.get('user');
  let isAdmin = false;

  try {
    if (user) {
      const userData = JSON.parse(decodeURIComponent(user.value));
      isAdmin = userData.role === 'admin';
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }

  // If not admin, redirect to dashboard
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/admin/analytics/:path*'
};
