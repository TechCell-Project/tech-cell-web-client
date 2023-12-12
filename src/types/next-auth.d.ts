import NextAuth from 'next-auth';
import { UserDataResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
// import { Address } from '@models/Location';

// interface IAddress extends Address {}

interface IUserToken extends UserDataResponseDTO {
    _id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}

declare module 'next-auth' {
    interface User extends IUserToken {}

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: IUserToken;
    }
}
