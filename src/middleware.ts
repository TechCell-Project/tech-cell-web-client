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
    matcher: ['/gio-hang-v2'],
};

const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

function signOut(request: NextRequest) {
    console.log(request.url);
    const url = new URL('/dang-nhap', request.url);
    url.searchParams.append('callBackUrl', 'gio-hang-v2');
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

    //console.log('response: ', response);

    if (shouldUpdateToken(token)) {
        try {
            const newToken = await refreshToken(token);

            console.log('newToken', newToken);

            if (newToken.error) {
                if (newToken.statusCode === 403 || newToken.status === 403) {
                    return signOut(request);
                }
            } else {
                const newSessionToken = await encode({
                    secret: process.env.NEXTAUTH_SECRET as string,
                    token: {
                        ...token,
                        accessToken: newToken.accessToken as string,
                        refreshToken: newToken.refreshToken as string,
                    },
                    maxAge: 15 * 60 /* 15 mins */,
                });

                //console.log('newSessionToken', newSessionToken);

                const size = 3933; // maximum size of each chunk
                const regex = new RegExp('.{1,' + size + '}', 'g');

                // split the string into an array of strings
                const tokenChunks = RegExp(regex).exec(newSessionToken);

                // set request cookies for the incoming getServerSession to read new session
                if (tokenChunks) {
                    tokenChunks.forEach((tokenChunk, index) => {
                        response.cookies.set(`${sessionCookie}.${index}`, tokenChunk);
                    });
                    // updated request cookies can only be passed to server if its passdown here after setting its updates
                    const response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });

                    // set response cookies to send back to browser
                    tokenChunks.forEach((tokenChunk, index) => {
                        response.cookies.set(`${sessionCookie}.${index}`, tokenChunk, {
                            httpOnly: true,
                            maxAge: 3 * 24 * 60 * 60, // 3 days
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                        });
                    });
                }
            }
        } catch (error) {
            response.cookies.delete(sessionCookie);
        }
    }

    return response;
};

async function refreshToken(token: JWT) {
    const currentRefreshToken = token.refreshToken as string;
    const res = await fetch(API_ENDPOINT + '/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });
    const response = await res.json();

    console.log('response: ', response);

    return response;
}
