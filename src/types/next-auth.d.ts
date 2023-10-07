import NextAuth from 'next-auth';
import { User } from './user.type';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: User;
    }
}
