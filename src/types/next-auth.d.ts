import NextAuth from 'next-auth';
import { UserDataResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

declare module 'next-auth' {
    interface User extends UserDataResponseDTO {}

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserDataResponseDTO;
    }

    interface JWT extends DefaultJWT, UserDataResponseDTO {}
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: UserDataResponseDTO;
    }
}
