import NextAuth, { Account, Session, User } from 'next-auth';

import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { fetchLogin } from '@services/AuthService';

//import authConfig from "./auth.config";
import { AuthenticationApi } from '@TechCell-Project/tech-cell-server-node-sdk/api';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { axiosAuth } from '@libs/axios';
import instanceAuth from '@config/instanceAuth.config';
import { isAxiosError } from 'axios';

const authApi = new AuthenticationApi();

export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                emailOrUsername: {
                    label: 'emailOrUsername',
                    type: 'emailOrUsername',
                },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                const payload = {
                    emailOrUsername: credentials?.emailOrUsername as string,
                    password: credentials?.password as string,
                };
                
                return fetchLogin(payload)
                    .then((res) => {
                        console.log(res.status);
                        return res.data as unknown as User;
                    })
                    .catch((error) => {
                        if (isAxiosError(error)) {
                            console.error(error.response?.status);
                            throw new Error(`statusCode|${error.response?.status}`);
                        }
                        return null;
                    });
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
} satisfies NextAuthConfig;

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/dang-nhap',
        error: '/dang-nhap',
    },

    callbacks: {
        async signIn({ user, account }) {
            // if (account?.provider === 'google') {
            //     try {
            //         const { data: userData } = await authApi.google({
            //             googleLoginRequestDTO: {
            //                 idToken: account.id_token ?? '',
            //             },
            //         });
            //         Object.assign(user, {
            //             // assign custom properties of backend
            //             ...userData,

            //             //remove default properties of google
            //             id: undefined,
            //             name: undefined,
            //             sub: undefined,
            //             picture: undefined,
            //             image: undefined,
            //             iat: undefined,
            //             exp: undefined,
            //             jti: undefined,
            //         });
            //         return true;
            //     } catch (error) {
            //         console.error(error);
            //         return false;
            //     }
            // }
            return true;
        },
        async jwt({ token, user }: { token: any; user: User | null; account: any }) {
            if (user) {
                token = { ...token, ...user };
            }

            if (token?.accessToken) {
                const accessToken = jwtDecode<JwtPayload>(token.accessToken);
                const now = Date.now() / 1000;

                if (token?.refreshToken && accessToken.exp && accessToken.exp < now) {
                    const refreshToken = jwtDecode<JwtPayload>(token.refreshToken);
                    if (refreshToken.exp && refreshToken.exp < now) {
                        return null;
                    }

                    try {
                        const { data } = await authApi.getNewToken({
                            newTokenRequestDTO: {
                                refreshToken: token.refreshToken,
                            },
                        });
                        token = { ...data };
                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                }
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            if (token) {
                session.user = token;

                instanceAuth.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
                axiosAuth.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    logger: {
        debug: (...data: any[]) => console.debug({ ...data }),
        error: (...data: any[]) => console.error({ ...data }),
        warn: (...data: any[]) => console.warn({ ...data }),
    },
    session: { strategy: 'jwt' },
    ...authConfig,
});
