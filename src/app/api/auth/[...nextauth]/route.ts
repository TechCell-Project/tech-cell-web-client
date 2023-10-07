import NextAuth, { Session, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { API_ENDPOINT, AUTH_LOGIN } from '@constants/Services';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    // session: {
    //     strategy: "jwt",
    // },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: 'credentials',
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
                    .post(AUTH_LOGIN, payload)
                    .then((response) => {
                        console.log(response.data);
                        return response.data;
                    })
                    .catch((err) => {
                        console.error(err.message);
                        return null;
                    });
            }, 
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env .GOOGLE_CLIENT_SECRET,
        }),

        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
            // if (user) {
            //     return {
            //         ...token,
            //         // token.email = user.email,
            //         accessToken: user?.token as string,
            //         refreshToken: user.refreshToken,
            //     };
            // }
            // return token;
        },
        async session({ session, token }) {
            console.log(session);
            session.user = token as any;
            return session; // The return type will match the one returned in `useSession()`
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },

        // async session({ session, token }: Promise<Session>) {
        //     console.log(session.user);
        //     session.user.accessToken = token.accessToken;

        //     return session;
        // },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
