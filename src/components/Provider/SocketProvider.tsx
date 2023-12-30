'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import socketConfig from '@config/socket_io.config';
import { NotificationModel } from '@models/Notification';
import { setPushNotifySocket, setSocket } from '@store/slices/notificationSlice';
import { useSession } from 'next-auth/react';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const { socket } = useAppSelector((state) => state.notifications);

    useEffect(() => {
        if (session) {
            socketConfig.on('connect', () => {
                console.log('Connected To socket Server! 🙃🙃🙃');
            });

            socketConfig.on('new-order-admin', (data: { time: string; notifications: NotificationModel }) => {
                console.log(data);
                dispatch(setPushNotifySocket(data.notifications));
            });

            dispatch(setSocket(socketConfig));
        } else {
            if (socket && socket.connected) {
                console.log('Disconnected socket Server! 🙃');
                socket.disconnect();
                dispatch(setSocket(null));
            }
        }
    }, [session]);

    return (
        <>{children}</>
    );
};