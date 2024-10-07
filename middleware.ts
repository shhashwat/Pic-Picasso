// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher([
// '/',
// '/api/clerk',
// ])

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect()
// })

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// }

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protect certain routes, but exclude '/api/clerk'
const isProtectedRoute = createRouteMatcher([
  '/', // Protect homepage or other routes
  // Do not include '/api/clerk' here, since it's for the webhook
]);

export default clerkMiddleware((auth, req) => {
  // Apply protection only to specific routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // Webhook routes like '/api/clerk' will bypass authentication
});

export const config = {
  matcher: [
    '/api/clerk', // Ensure webhook endpoint is explicitly matched and publicly accessible
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Continue matching other API and TRPC routes
  ],
};
