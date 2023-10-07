import { useSession } from 'next-auth/react';
import axios from '@libs/axios';

export const useRefreshToken = () => {
    const { data: session } = useSession();
    const refreshToken = async () => {
        const res = await axios.post('/auth/refresh-token', {
            refreshToken: session?.user?.refreshToken,
        });

        if (session) {
            session.user.accessToken = res.data.accessToken;
        }
    };

    return refreshToken;
};
