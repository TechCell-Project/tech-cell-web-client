import React, { memo, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useRouter } from 'next/navigation';
import { PagingNotify } from '@models/Notification';
import { getAllNotification, getFailure } from '@store/slices/notificationSlice';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import momentVi from '@config/moment.config';
import { LoadingSection } from '@components/Common/Display';
import { CommonBtn, NotifyIcon } from '@components/Common';
import { useSession } from 'next-auth/react';

interface Props {
    status: 'all' | 'unread';
    onClose: () => void;
}

const NotificationList = ({ status, onClose }: Props) => {
    const dispatch = useAppDispatch();
    const { notifications, isLoading, showReadmore, socket } = useAppSelector((state) => state.notifications);
    const [paging, setPaging] = useState<PagingNotify>(new PagingNotify());
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            dispatch(getAllNotification({
                ...paging,
                readType: status,
                pageSize: 10,
            }, 'get')).then();
        }

        return () => {
            dispatch(getFailure());
        };
    }, [status, dispatch]);

    const pagingNoti = () => {
        setPaging((prev) => (
            { ...prev, page: prev.page + 1 }),
        );
        dispatch(getAllNotification({
            ...paging,
            page: paging.page + 1,
            readType: status,
        }, 'paging')).then();
    };

    const handleMarkAsRead = (notificationId: string) => {
        if (socket) {
            console.log(`Read order #${notificationId}!`);
            socket.emit('mark-notification-as-read', { notificationId });
        }
    };

    const renderViewNonNotify = () => {
        let content = 'Vui lòng đăng nhập!';
        if (session && notifications?.length === 0) {
            content = 'Chưa có thông báo nào!';
        }

        return !session || (session && notifications?.length === 0) && (
            <div style={{ padding: '20px' }}>
                <NotifyIcon />
                <Typography variant='body2' mt='10px' fontWeight={500}>{content}</Typography>
            </div>
        );
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: 'max-content',
                maxHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: notifications.length === 0 ? 'center' : 'flex-start',
                alignItems: notifications.length === 0 ? 'center' : 'flex-start',
            }}
        >
            {!isLoading ? (
                <>
                    {renderViewNonNotify()}
                    {notifications && notifications?.map((item) => {
                        return (
                            <Stack
                                flexDirection='row'
                                gap='15px'
                                alignItems='flex-start'
                                key={item._id}
                                onClick={() => {
                                    handleMarkAsRead(String(item._id));
                                    onClose();
                                    // This line redirect to order or other page
                                    // router.push(`${RootRoutes.ORDER_ROUTE}/${item.data.order._id}`);
                                }}
                                sx={{
                                    p: '10px 0',
                                    width: '100%',
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}
                            >
                                <Avatar sx={{ height: '50px', width: '50px' }}>
                                    <PersonRoundedIcon />
                                </Avatar>
                                <Stack flexDirection='column' gap='5px' alignItems='flex-start'>
                                    <Typography fontSize='15px' fontWeight={!item.readAt ? 600 : 400}>
                                        {item.content}
                                    </Typography>
                                    <Typography fontSize='13px' fontWeight={500}>
                                        {momentVi(String(item.createdAt)).fromNow()}
                                    </Typography>
                                </Stack>
                                {!item.readAt && (
                                    <FiberManualRecordIcon
                                        color='primary'
                                        fontSize='small'
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            right: '-10px',
                                        }}
                                    />
                                )}
                            </Stack>
                        );
                    })}
                    {showReadmore && (
                        <CommonBtn
                            variant='text'
                            content='Xem thêm'
                            handleClick={pagingNoti}
                            styles={{
                                width: '100%',
                                lineHeight: '40px',
                            }}
                            startIcon={<ExpandMoreRoundedIcon />}
                        />
                    )}
                </>
            ) : (
                <LoadingSection isLoading={isLoading} />
            )}
        </Box>
    );
};

export default memo(NotificationList);