import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@constants/Services';

export function useAuthApi() {
    const { data: session } = useSession();
    const [api, setApi] = useState<AxiosInstance>(
        axios.create({
            baseURL: API_ENDPOINT,
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    );

    useEffect(() => {
        if (session) {
            setApi(
                axios.create({
                    baseURL: API_ENDPOINT,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                }),
            );
        }
    }, [session]);

    return api;
}
