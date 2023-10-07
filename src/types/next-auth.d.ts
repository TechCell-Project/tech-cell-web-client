import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }

    interface User {
        _id: string;
        email: string;
        userName: string;
        firstName: string;
        lastName: string;
        address: {
            provinceLevel: string;
            districtLevel: string;
            wardLevel: string;
            detail: string;
        }[];
        role: string;
        accessToken: string;
        refreshToken: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: User;
    }
}
