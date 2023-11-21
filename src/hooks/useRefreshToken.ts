import axios from '@libs/axios';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

export function useRefreshToken() {
    const { data: session } = useSession();
    const refreshToken = session?.user?.refreshToken;

    return () => {
        if (!refreshToken) {
            console.error('refresh token not found');
            return false;
        }

        return axios
            .post<User>('/auth/refresh-token', {
                refreshToken,
            })
            .then((res) => {
                if (session) {
                    session.user = res.data;
                    return true;
                }
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    };
}
