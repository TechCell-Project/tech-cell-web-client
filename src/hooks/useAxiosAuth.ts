import { useCallback, useEffect } from 'react';
import { axiosAuth } from '@libs/axios';
import { signOut, useSession } from 'next-auth/react';
import { useRefreshToken } from '@hooks/useRefreshToken';

export function useAxiosAuth() {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    const refresh = useCallback(async () => {
        const isRefreshSuccess = await refreshToken();
        if (!isRefreshSuccess) {
            signOut({ callbackUrl: '/', redirect: true });
        }
        return isRefreshSuccess;
    }, [refreshToken]);

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers.authorization) {
                    config.headers.authorization = `Bearer ${session?.user.accessToken}`;
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
                    await refresh();
                    prevRequest.headers.authorization = `Bearer ${session?.user.accessToken}`;
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
