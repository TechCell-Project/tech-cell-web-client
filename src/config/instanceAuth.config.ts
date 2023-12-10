import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@constants/Services';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@app/api/auth/[...nextauth]/route';

const instanceAuth: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    //timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instanceAuth.interceptors.request.use(
    async (request) => {
        if (request.headers.Authorization) return request;
        
        const session = await getSession();

        console.log(session);

        if (session?.user) {
            const authHeaderValue = `Bearer ${session.user.accessToken}`;

            request.headers.authorization = authHeaderValue;
            instanceAuth.defaults.headers.common.Authorization = authHeaderValue;
        }
        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

instanceAuth.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        console.log(error);
        if (error.response?.status === 401 && error.config) {
            const originalRequest = error.config;
            const session = await getSession();

            if (session) {
                // Update the Authorization header
                originalRequest.headers.Authorization = `Bearer ${session.user.accessToken}`;

                // Update the default headers for the instance
                instanceAuth.defaults.headers.common.Authorization = `Bearer ${session.user.accessToken}`;

                // Retry the original request with the new token
                return instanceAuth(originalRequest);
            }
        }
        return Promise.reject(error);
    },
);

export default instanceAuth;
