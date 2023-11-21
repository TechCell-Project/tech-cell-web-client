import axios from '@libs/axios';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export function useRefreshToken() {
    const { data: session, update } = useSession();

    const refreshToken = useCallback(async () => {
        return axios
            .post<User>('/auth/refresh-token', {
                refreshToken: session?.user?.refreshToken,
            })
            .then(async (res) => {
                if (session) {
                    session.user = res.data;
                    await update({ ...session, user: res.data });
                    return true;
                }
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    }, [session, update]);

    return refreshToken;
}
