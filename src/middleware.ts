import { auth } from '@libs/next-auth';
import { apiAuthPrefix, authRoutes, needAuthRoutes, publicRoutes } from './routes';
import { RootPath } from './constants/enum';

export default auth((req) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isLoggedIn = !!req.auth;
    console.log('ROUTE: ', req.nextUrl.pathname);
    console.log('IS LOGGEDIN: ', isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);
    const isNeedAuthRoutes = needAuthRoutes.includes(path);

    console.log('Is Api auth route: ', isApiAuthRoute);
    console.log('Is public route: ', isPublicRoute);
    console.log('Is auth route: ', isAuthRoute);
    console.log('Is need auth route: ', isNeedAuthRoutes);

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(RootPath.Home, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && isNeedAuthRoutes) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(
            new URL(`${RootPath.Login}?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        );
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
