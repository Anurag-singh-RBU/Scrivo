import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(["/project(.*)", "/issue(.*)"]);

export default clerkMiddleware((auth , req) => {

  if(!auth.userId && isProtectedRoute(req)){

    return auth().redirectToSignIn();

  }

  // if(auth().userId && !auth().orgId && req.nextUrl.pathname !== "/onboarding" && req.nextUrl.pathname !== "/"){

  //   return NextResponse.redirect(new URL("/onboarding", req.url));

  // }

});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};