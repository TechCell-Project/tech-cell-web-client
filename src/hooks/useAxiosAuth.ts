import { useEffect } from 'react';
import { axiosAuth } from '@libs/axios';
import { signOut, useSession } from 'next-auth/react';
import { useRefreshToken } from '@hooks/useRefreshToken';

export function useAxiosAuth() {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const accessToken = session?.user.accessToken;
        const requestIntercept = axiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers.authorization) {
                    config.headers.authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const isRefreshSuccess = await refreshToken();
                    if (!isRefreshSuccess) {
                        return signOut({ callbackUrl: '/', redirect: true });
                    }
                    prevRequest.headers.authorization = `Bearer ${accessToken}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [session]);

    return axiosAuth;
}
