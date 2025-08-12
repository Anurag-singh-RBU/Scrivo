import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const PROTECTED_PATHS = createRouteMatcher(["/onboarding(.*)", "/organisation(.*)", "/project(.*)", "/issue(.*)"]);

export default clerkMiddleware((auth , req) => {

  if(!auth.userId && PROTECTED_PATHS(req)){

    return auth().redirectToSignIn();

  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};