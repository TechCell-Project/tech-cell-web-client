import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios';
import axiosRetry from 'axios-retry';

import { AuthenticationApi } from '@TechCell-Project/tech-cell-server-node-sdk';

import { getSession } from 'next-auth/react';
import { update } from '@libs/next-auth';

import { API_ENDPOINT } from '@constants/Services';

/**
 * Generates an Axios instance with the provided options.
 *
 * @param {CreateAxiosDefaults} options - (optional) The default options for the Axios instance.
 * @param {boolean} enableRetry - (optional) Indicates whether to enable retrying failed requests.
 * @return {AxiosInstance} The Axios instance.
 */
function getAxios(options?: CreateAxiosDefaults, enableRetry: boolean = true): AxiosInstance {
    const instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 6000,
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (enableRetry) {
        axiosRetry(instance, {
            retries: 5,
            retryDelay: (retryCount) => {
                return retryCount * 2000;
            },
            retryCondition: (error) => {
                return (
                    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
                    axiosRetry.isSafeRequestError(error)
                );
            },
        });
    }

    return instance;
}

/**
 * The axios instance used for public requests
 */
export const axiosPublic = getAxios();

/**
 * The axios instance used for authenticated requests
 * @description It will use the access token from the session to authenticate the requests
 * It will also refresh the access token if it expires
 * And update the session with the new access token
 */
export const axiosAuth = getAxios({
    timeout: 10000,
});

/**
 * Interceptors to add auth headers to requests
 * So that we don't need to pass the access token in every request, or manually add it to the header
 */
axiosAuth.interceptors.request.use(
    async (request) => {
        if (!request.headers.Authorization) {
            const session = await getSession();

            if (!session?.user.accessToken) {
                throw new Error('No access token found');
            }
            const authHeaderValue = `Bearer ${session?.user.accessToken}`;
            request.headers.Authorization = authHeaderValue;
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/**
 * Interceptors to handle 401 errors and refresh the access token
 * Then retry the original request with the new token
 * It also updates the session with the new access token
 */
axiosAuth.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const prevRequest = error.config;

        if (error.response?.status === 401 && prevRequest) {
            const session = await getSession();
            if (!session?.user.refreshToken) {
                return Promise.reject(new Error('No refresh token found'));
            }

            const { data } = await new AuthenticationApi(
                undefined,
                undefined,
                axiosPublic,
            ).getNewToken({
                newTokenRequestDTO: {
                    refreshToken: session?.user.refreshToken,
                },
            });

            if (!data) {
                throw new Error('No new access token found');
            }

            // Update the session to store the new access, refresh token
            await update(
                Object.assign(
                    session,
                    {},
                    {
                        user: data,
                    },
                ),
            );

            const authHeaderValue = `Bearer ${session?.user.accessToken}`;

            // Update the Authorization header
            prevRequest.headers.Authorization = authHeaderValue;

            // Retry the original request with the new token
            return axiosAuth(prevRequest);
        }

        return Promise.reject(error);
    },
);

export default axiosPublic;
