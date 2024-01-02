'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { NotificationModel } from '@models/Notification';
import { setPushNotifySocket, setSocket } from '@store/slices/notificationSlice';
import { useSession } from 'next-auth/react';
import { SubEvent } from '@libs/socket-io';
import { getSocket } from '@libs/socket-io/socket-io';

export function SocketProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const { socket } = useAppSelector((state) => state.notifications);

    const handleNewOrderAdmin = (data: { time: string; notifications: NotificationModel }) => {
        console.log(data);
        dispatch(setPushNotifySocket(data.notifications));
    };

    const handleAllUserRoom = (data: { time: string; notifications: NotificationModel }) => {
        console.log(data);
        dispatch(setPushNotifySocket(data.notifications));
    };

    const handleUserIdRoom = (data: { time: string; notifications: NotificationModel }) => {
        console.log(data);
        dispatch(setPushNotifySocket(data.notifications));
    };

    const handleRoleRoom = (data: { time: string; notifications: NotificationModel }) => {
        console.log(data);
        dispatch(setPushNotifySocket(data.notifications));
    };

    // This effect runs only when the user logs in or out
    useEffect(() => {
        if (session?.user && !socket?.connected) {
            const socketInstance = getSocket(session?.user?.accessToken);

            socketInstance.on(SubEvent.newOrderAdmin, handleNewOrderAdmin);
            socketInstance.on(SubEvent.allUserRoom, handleAllUserRoom);
            socketInstance.on(SubEvent.userIdRoom(session?.user?._id), handleUserIdRoom);
            socketInstance.on(SubEvent.roleRoom(session?.user?.role), handleRoleRoom);

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
