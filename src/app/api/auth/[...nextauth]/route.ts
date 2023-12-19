import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LOGIN_GOOGLE_ENDPOINT } from '@constants/Services';
import instanceAuth from '@config/instanceAuth.config';
import { fetchLogin } from '@services/AuthService';
import instancePublic from '@config/instancePublic.config';

export const authOptions: NextAuthOptions = {
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
            async authorize(credentials, req) {
                const payload = {
                    emailOrUsername: credentials?.emailOrUsername,
                    password: credentials?.password,
                };

                return fetchLogin(payload)
                    .then((response) => {
                        return response.data;
                    })
                    .catch((err) => {
                        console.error(err.message);
                        return null;
                    });
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                try {
                    const { data } = await instancePublic.post<User>(LOGIN_GOOGLE_ENDPOINT, {
                        idToken: account.id_token,
                    });
                    Object.assign(user, {
                        // assign custom properties of backend
                        _id: data._id,
                        email: data.email,
                        userName: data.userName,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        // address: data.address,
                        role: data.role,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        avatar: data.avatar,

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
        async jwt({ token, user, profile, account }) {
            if (user) {
                token = { ...token, ...user };
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token as unknown as User;

                instanceAuth.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
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
        debug: (...data) => console.debug({ ...data }),
        error: (...data) => console.error({ ...data }),
        warn: (...data) => console.warn({ ...data }),
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
