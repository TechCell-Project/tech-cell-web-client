import { auth } from '@/auth';

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log('ROUTE: ', req.nextUrl.pathname);
    console.log('IS LOGGEDIN: ', isLoggedIn);

    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
