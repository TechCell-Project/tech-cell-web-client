import { auth } from '@libs/next-auth';
import { apiAuthPrefix, authRoutes, needAuthRoutes, publicRoutes } from './routes';
import { RootPath } from './constants/enum';
import { NextAuthRequest } from 'next-auth/lib';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default auth((req: NextAuthRequest) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isLoggedIn = !!req.auth;
    const response = NextResponse.next();
    console.log('ROUTE: ', req.nextUrl.pathname);
    console.log('IS LOGGEDIN: ', isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);
    const isNeedAuthRoutes = needAuthRoutes.includes(path);

    if (!isAuthRoute && !isApiAuthRoute) response.cookies.set('stored-pathname', path);

    if (isAuthRoute) {
        if (isLoggedIn) {
            const storedPathname = cookies().get('stored-pathname');

            console.log(storedPathname);
            return storedPathname
                ? Response.redirect(new URL(storedPathname.value, nextUrl))
                : Response.redirect(new URL(RootPath.Home, nextUrl));
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

    return response;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
