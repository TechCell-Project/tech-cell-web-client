import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { JWT, encode, getToken } from 'next-auth/jwt';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { API_ENDPOINT } from './constants';

interface BackendTokens {
    _id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    userName: string;
    emailVerified: boolean;
    role: string;
    address: any[];
    firstName: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
    iat: number;
    exp: number;
    jti: string;
}

export const config = {
    matcher: ['/gio-hang', '/gio-hang/:path*', '/ho-so'],
};

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

function signOut(request: NextRequest) {
    console.log(request.url);
    const url = new URL('/dang-nhap', request.url);
    url.searchParams.append('callbackUrl', 'gio-hang');
    const response = NextResponse.redirect(url);

    request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes('next-auth')) response.cookies.delete(cookie.name);
    });

    return response;
}

const decodeAccessToken = (accessToken: string | undefined) => {
    if (accessToken) {
        return jwtDecode<JwtPayload>(accessToken);
    }
    return null;
};

// check if your token is expired
const shouldUpdateToken = (token: JWT) => {
    const accessToken = token.accessToken as string;

    const decodedAccessToken = decodeAccessToken(accessToken);

    if (decodedAccessToken) {
        const { exp } = decodedAccessToken;

        const currentTime = Math.floor(Date.now() / 1000);

        return Number(exp) < currentTime;
    }

    return true;
};

export const middleware: NextMiddleware = async (request: NextRequest) => {
    const token = await getToken({ req: request });

    if (!token) return signOut(request);

    let response = NextResponse.next();

    if (shouldUpdateToken(token)) {
        try {
            const newToken = await refreshToken(token);

            console.log('newToken', newToken);

            if (newToken.error) {
                if (newToken.statusCode === 403 || newToken.status === 403) {
                    return signOut(request);
                }
            }

            const newAccessToken = newToken.accessToken as string;
            const newRefreshToken = newToken.refreshToken as string;

            const newSessionToken = await encode({
                secret: process.env.NEXTAUTH_SECRET as string,
                token: {
                    ...token,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                },
                maxAge: 15 * 60 /* 15 mins */,
            });

            console.log(newSessionToken);

            const size = 3933; // maximum size of each chunk
            const regex = new RegExp('.{1,' + size + '}', 'g');

            // split the string into an array of strings
            const tokenChunks = RegExp(regex).exec(newSessionToken);

            response = updateCookie(tokenChunks, request, response);
        } catch (error) {
            response = updateCookie(null, request, response);
        }
    }

    return response;
};

async function refreshToken(token: JWT) {
    const currentRefreshToken = token.refreshToken as string;
    console.log('token expired', currentRefreshToken);
    const res = await fetch(API_ENDPOINT + '/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });
    console.log(res);
    const response = await res.json().catch((error) => {
        console.log(error);
    });

    console.log('response: ', response);

    return response;
}

function updateCookie(
    sessionTokenChunks: any[] | null,
    request: NextRequest,
    response: NextResponse,
) {
    if (sessionTokenChunks) {
        // set request cookies for the incoming getServerSession to read new session
        sessionTokenChunks.forEach((tokenChunk, index) => {
            request.cookies.set(`${sessionCookie}.${index}`, tokenChunk);
        });

        // updated request cookies can only be passed to server if its passdown here after setting its updates
        response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });

        // set response cookies to send back to browser
        sessionTokenChunks.forEach((tokenChunk, index) => {
            response.cookies.set(`${sessionCookie}.${index}`, tokenChunk, {
                httpOnly: true,
                maxAge: 15 * 60, // 15 mins
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
        });
    } else {
        request.cookies.delete(sessionCookie);
        response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
        response.cookies.delete(sessionCookie);
    }

    return response;
}
