import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@constants/Services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';

const instanceAuth: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    //timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instanceAuth.interceptors.request.use(
    async (request) => {
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
        console.log('expired session');

        console.log(error);

        // instanceAuth.defaults.headers.common.Authorization = undefined;
        // const prevRequest = error.config;
        // const statusCode = error.response?.status;
        // console.log(error);

        // if (!error.response || statusCode !== 401 || prevRequest._retry) {
        //     return Promise.reject(error);
        // }

        // prevRequest._retry = true;

        // const session = await getSession();

        // if (!session) {
        //     return Promise.reject(error);
        // }

        // if (statusCode === 401 && prevRequest._retry) {
        //     const refreshToken = session?.user.refreshToken;

        //     if (!refreshToken) {
        //         return Promise.reject(error);
        //     }

        //     const accessToken = session?.user.accessToken;

        //     const decodedAccessToken = decodeAccessToken(accessToken);

        //     if (isAccessTokenExpired(decodedAccessToken)) {
        //         try {
        //             await setToken(session);
        //             prevRequest.headers.authorization = `Bearer ${session.user.accessToken}`;

        //             return instanceAuth(prevRequest);
        //         } catch (error) {
        //             console.log(error);
        //             return Promise.reject(error);
        //         }
        //     }
        // }
        return Promise.reject(error);
    },
);

export default instanceAuth;