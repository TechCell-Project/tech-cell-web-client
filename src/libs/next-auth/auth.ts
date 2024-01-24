import NextAuth, { User, NextAuthConfig, Session, Account } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AxiosError } from 'axios';
import { authApi } from '@services/AuthService';

/**
 * @see https://authjs.dev/
 */
export const nextAuthConfig: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                emailOrUsername: {
                    label: 'emailOrUsername',
                    type: 'emailOrUsername',
                    placeholder: 'jsmith@example.com',
                },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const payload: LoginRequestDTO = {
                    emailOrUsername: (credentials?.emailOrUsername as string) ?? '',
                    password: (credentials?.password as string) ?? '',
                };

                return authApi()
                    .login({ loginRequestDTO: payload })
                    .then((response) => {
                        return response.data as unknown as User;
                    })
                    .catch((err: AxiosError) => {
                        console.error(err);
                        throw err;
                    });
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User; account: Account | null }) {
            if (account?.provider === 'google') {
                try {
                    const { data: userData } = await authApi().google({
                        googleLoginRequestDTO: {
                            idToken: account.id_token ?? '',
                        },
                    });
                    Object.assign(user, {
                        // assign custom properties of backend
                        ...userData,

                        //remove default properties of google
                        id: undefined,
                        name: undefined,
                        sub: undefined,
                        picture: undefined,
                        image: undefined,
                        iat: undefined,
                        exp: undefined,
                        jti: undefined,
                    });
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }: { token: any; user: User | null }) {
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
                        const { data } = await authApi().getNewToken({
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
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/dang-nhap',
        error: '/dang-nhap',
    },
    logger: {
        debug: (...data: any[]) => console.debug({ ...data }),
        error: (...data: any[]) => console.error({ ...data }),
        warn: (...data: any[]) => console.warn({ ...data }),
    },
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth(nextAuthConfig);
