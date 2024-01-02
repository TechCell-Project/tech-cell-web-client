import { io } from 'socket.io-client';
import { URL_HOST_SOCKET_IO } from '@constants/Services';
import { getSession } from 'next-auth/react';

const getToken = async () => {
    const session = await getSession();
    if (session && session?.user) {
        return session.user.accessToken;
    }
    return;
};

const socketConfig = io(URL_HOST_SOCKET_IO, {
    extraHeaders: {
        Authorization: `Bearer ${getToken()}`,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

export default socketConfig;
