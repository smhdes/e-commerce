import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Next.js Middleware
 * Handles authentication and route protection
 */

// Protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/wishlist',
  '/checkout',
  '/orders',
];

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/products',
  '/cart',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/help',
];

// Routes that should redirect to home if already authenticated
const authRoutes = [
  '/login',
  '/register',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token');
  const userData = cookieStore.get('user-data');
  
  // Check if user is authenticated
  const isAuthenticated = !!(authToken && userData);
  
  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Handle auth routes (login/register)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Redirect to intended page or home
      const returnTo = request.nextUrl.searchParams.get('returnTo') || '/';
      return NextResponse.redirect(new URL(returnTo, request.url));
    }
  }
  
  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // Add CORS headers for API routes
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: response.headers });
    }
    
    return response;
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
