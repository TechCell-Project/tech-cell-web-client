'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { NotificationModel } from '@models/Notification';
import { setPushNotifySocket, setSocket } from '@store/slices/notificationSlice';
import { useSession } from 'next-auth/react';
import { SubEvent } from '@libs/socket-io';
import { getSocket } from '@libs/socket-io/socket-io';

/**
 * Provides a socket connection for the application.
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The child components to be rendered.
 * @return {JSX.Element}
 */
export function SocketProvider({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const { socket } = useAppSelector((state) => state.notifications);

    const handleNotifications = (data: { time: string; notifications: NotificationModel }) => {
        console.log(data);
        dispatch(setPushNotifySocket(data.notifications));
    };

    // This effect runs only when the user logs in or out
    useEffect(() => {
        if (session?.user && !socket?.connected) {
            const socketInstance = getSocket(session?.user?.accessToken);

            socketInstance.on(SubEvent.newOrderAdmin, handleNotifications);
            socketInstance.on(SubEvent.allUserRoom, handleNotifications);
            socketInstance.on(SubEvent.userIdRoom(session?.user?._id), handleNotifications);
            socketInstance.on(SubEvent.roleRoom(session?.user?.role), handleNotifications);

            dispatch(setSocket(socketInstance));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user, dispatch]);

    // This effect runs only when the socket connection status changes
    useEffect(() => {
        if (!session?.user && socket?.connected) {
            dispatch(setSocket(null));
            socket.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user, socket?.connected]);

    return <>{children}</>;
}
