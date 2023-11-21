import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AUTH_LOGIN, AUTH_LOGIN_GOOGLE } from '@constants/Services';
import axios from '@libs/axios';

const authOptions: NextAuthOptions = {
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

                return axios
                    .post<User>(AUTH_LOGIN, payload)
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
                    const { data } = await axios.post<User>(AUTH_LOGIN_GOOGLE, {
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
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as unknown as User;
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
        signIn: '/signin',
        error: '/signin',
    },
    logger: {
        debug: (...data) => console.debug({ ...data }),
        error: (...data) => console.error({ ...data }),
        warn: (...data) => console.warn({ ...data }),
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
