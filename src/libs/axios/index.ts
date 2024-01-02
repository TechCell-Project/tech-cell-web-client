import axios from 'axios';
import { AuthenticationApi } from '@TechCell-Project/tech-cell-server-node-sdk';
import { getSession } from 'next-auth/react';
import { update } from '@libs/next-auth';
import { API_ENDPOINT } from '@constants/Services';

export const axiosPublic = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosAuth.interceptors.request.use(
    async (request) => {
        if (!request.headers.Authorization) {
            const session = await getSession();
            const authHeaderValue = `Bearer ${session?.user?.accessToken}`;
            axiosAuth.defaults.headers.common.Authorization = authHeaderValue;
            request.headers.Authorization = authHeaderValue;
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;

        if (error.response?.status === 401 && !prevRequest.sent) {
            prevRequest.sent = true;

            const session = await getSession();
            const { data } = await new AuthenticationApi().getNewToken({
                newTokenRequestDTO: {
                    refreshToken: session?.user?.refreshToken ?? '',
                },
            });

            if (session) {
                Object.assign(session, {
                    user: data,
                });
                await update(session);
            }

            if (data) {
                // Update the Authorization header
                prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                // Update the default headers for the instance
                axiosAuth.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

                // Retry the original request with the new token
                return axiosAuth(prevRequest);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosPublic;
