import { io } from 'socket.io-client';
import { URL_HOST_SOCKET_IO } from '@constants/Services';

export function getSocket(accessToken: string) {
    const ioInstance = io(URL_HOST_SOCKET_IO, {
        extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
    });

    ioInstance.on('connect', () => {
        console.log('Connected To socket Server! 🙃🙃🙃');
    });

    ioInstance.on('disconnect', () => {
        console.log('Disconnected To socket Server! 😭😭😭');
    });

    return ioInstance;
}
