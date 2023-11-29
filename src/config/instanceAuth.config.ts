import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from '@constants/Services';
import { getSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import instancePublic from './instancePublic.config';
import jwtDecode, { JwtPayload } from 'jwt-decode';

// const setToken = async (session: Session | null) => {
//     const res = await instancePublic.post(REFRESH_TOKEN_ENDPOINT, {
//         refreshToken: session?.user?.refreshToken,
//     });

//     if (session?.user) {
//         session.user.accessToken = res.data.accessToken;
//         session.user.refreshToken = res.data.refreshToken;
//     }
// };

// const decodeAccessToken = (accessToken: string | undefined) => {
//     if (accessToken) {
//         return jwtDecode<JwtPayload>(accessToken);
//     }
//     return null;
// };

// const isAccessTokenExpired = (accessTokenData: JwtPayload | null) => {
//     if (accessTokenData) {
//         const { exp } = accessTokenData;

//         const currentTime = Math.floor(Date.now() / 1000);

//         return Number(exp) < currentTime;
//     }

//     return true;
// };

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
        
        console.log("error: ");
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