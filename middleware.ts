import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

// Define public routes manually
const publicRoutes = ['/api/webhooks/clerk'];

export default function middleware(req: NextRequest, event: any) {
  const url = req.nextUrl.pathname;

  // Check if the request is for a public route
  if (publicRoutes.includes(url)) {
    return NextResponse.next(); // Skip Clerk authentication for public routes
  }

  // Run Clerk middleware for other routes, passing the request and event
  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
