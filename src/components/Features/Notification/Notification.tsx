import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import NotificationList from './NotificationList';
import { IconBtn } from '@components/Common';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const Notification = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [tabNotifyIndex, setTabNotifyIndex] = useState<number>(0);

    const open = Boolean(anchorEl);
    const id = open ? 'notify-popover' : undefined;

    const notifyTabs = useMemo(() => {
        return [
            {
                name: 'Tất cả',
                component: <NotificationList status='all' onClose={() => setAnchorEl(null)} />,
            },
            {
                name: 'Chưa đọc',
                component: <NotificationList status='unread' onClose={() => setAnchorEl(null)} />,
            },
        ];
    }, []);

    return (
        <>
            <IconBtn
                icon={<NotificationsOutlinedIcon />}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                tooltip='Thông báo'
                isBadge
                badgeVariant='dot'
                badgeInvisible={true}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Stack
                    flexDirection='column'
                    alignItems='flex-start'
                    gap={1}
                    sx={{ width: '380px' }}
                    padding='12px 20px'
                >
                    <Stack flexDirection='row' alignItems='center' gap={1} width='100%'>
                        <Typography variant='h6' fontWeight={700}>Thông báo</Typography>
                    </Stack>
                    <Tabs
                        value={tabNotifyIndex}
                        onChange={(_: React.SyntheticEvent, index: number) => setTabNotifyIndex(index)}
                        aria-label='tabs'
                        sx={{
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTabs-flexContainer': {
                                gap: '15px',
                            },
                            mt: 1,
                        }}
                    >
                        {notifyTabs.map((tab, index) => (
                            <Tab
                                key={tab.name}
                                label={tab.name}
                                onClick={() => setTabNotifyIndex(index)}
                                sx={{
                                    textTransform: 'unset',
                                    transition: 'all linear 0.3s',
                                    minHeight: '25px',
                                    '&.Mui-selected': {
                                        fontWeight: 600,
                                        bgcolor: theme.color.red,
                                        color: '#fff',
                                        borderRadius: '100px',
                                    },
                                }}
                            />
                        ))}
                    </Tabs>
                    {notifyTabs[tabNotifyIndex].component}
                </Stack>
            </Popover>
        </>
    );
};