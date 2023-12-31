'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuComponent } from '@components/Form';
import { DRAWER_WIDTH } from '@constants/NavConstant';
import { DrawerLayout } from '@components/Layout';
import styles from '@styles/components/header.module.scss';
import { signIn, useSession, signOut } from 'next-auth/react';
import SearchBarBox from '@components/Common/Searching/SearchBarBox';
import Link from 'next/link';
import { Session } from 'next-auth';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { useRouter } from 'next/navigation';
import { IconBtn } from '@components/Common';
import Typography from '@mui/material/Typography';
import { getRole } from '@utils/index';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { RootPath } from '@constants/enum';
import { CATEGORY } from '@constants/PhoneConstant';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Notification } from '@components/Features';

interface Props {
    window?: () => Window;
}

const NAV_ITEMS = [
    { name: 'Trang chủ', icon: HomeOutlinedIcon, href: RootPath.Home },
    { name: 'Sản phẩm', menu: CATEGORY, icon: PhoneAndroidOutlinedIcon, isNav: true },
    { name: 'Tra cứu đơn hàng', icon: LocalShippingOutlinedIcon, href: RootPath.Home },
];

export const HeaderClient = ({ window }: Props) => {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { push } = useRouter();

    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: 'flex', height: { xs: '56px', sm: '68px' } }}>
            <AppBar
                component='nav'
                sx={{
                    // backgroundColor: theme.color.red,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '100%',
                    paddingRight: '0px !important',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '1320px',
                        alignItems: 'center',
                        padding: { xs: '0px 10px' },
                    }}
                >
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'block', lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack direction='row' gap={6} alignItems='center'>
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
                                width: { xs: '130px' },
                            }}
                        >
                            <Link href='/'>
                                <Image
                                    src='/logo-red.png'
                                    alt='Logo Techcell'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                                gap: '15px',
                                alignItems: 'center',
                            }}
                        >
                            {NAV_ITEMS.map((item, index) => (
                                <MenuComponent
                                    isBlackContent
                                    key={`nav_item_${index.toString()}`}
                                    content={item.name}
                                    options={item?.menu}
                                    icon={item.icon ? <item.icon style={{ fontSize: '34px' }} /> : undefined}
                                    href={item.href ? item.href : undefined}
                                />
                            ))}
                        </Box>
                    </Stack>
                    <Stack
                        direction='row'
                        alignItems='center'
                        gap={3}
                        sx={{ justifyContent: { xs: 'space-between' } }}
                    >
                        <SearchBarBox />
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                                gap: '10px',
                                alignItems: 'center',
                            }}
                        >
                            <IconBtn
                                icon={<LocalMallOutlinedIcon />}
                                onClick={() => push('/gio-hang')}
                                isBadge
                                tooltip='Giỏ hàng'
                                badgeContent={1}
                            />
                            <Notification />

                            <RenderUserBtn session={session} />
                        </Box>
                    </Stack>
                    <Box
                        sx={{
                            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                            gap: '10px',
                        }}
                    >
                        <IconBtn
                            icon={<LocalMallOutlinedIcon />}
                            onClick={() => push('/gio-hang')}
                            isBadge
                            tooltip='Giỏ hàng'
                            badgeContent={1}
                        />
                        <Notification />
                        <RenderUserBtn session={session} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component='nav' sx={{}}>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', lg: 'none' },
                        color: '#000',
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            p: '12px 20px',
                        },
                    }}
                >
                    <DrawerLayout handleDrawerToggle={() => setMobileOpen(false)} />
                </Drawer>
            </Box>
            <Box component='main' sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
};

const RenderUserBtn = memo(({ session }: { session: Session | null }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'user-popover' : undefined;
    const { push } = useRouter();

    return session ? (
        <>
            <Avatar
                src={session.user.avatar.url}
                alt='User Avatar'
                sx={{ height: '38px', width: '38px', cursor: 'pointer' }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-describedby={id}
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
                sx={{
                    '& .MuiPaper-root': {
                        p: '18px 20px',
                        minWidth: '250px',
                        boxShadow: '0 8px 45px #03004717',
                    },
                }}
            >
                <Typography fontSize='18px' fontWeight={600}>
                    {`${session.user.firstName} ${session.user.lastName}`}
                </Typography>
                <Typography fontSize='12px' fontWeight={500}>{getRole(session.user.role)}</Typography>

                <hr style={{ width: '100%', height: '.5px', margin: '15px 0', backgroundColor: 'rgba(0,0,0,0.1)' }} />

                <ul className={styles.popover_account_ul}>
                    <li>
                        <AssignmentIndIcon />
                        <button onClick={() => {
                            push(RootPath.Profile);
                            setAnchorEl(null);
                        }}>
                            Hồ sơ
                        </button>
                    </li>
                    <li onClick={() => signOut()}>
                        <LogoutRoundedIcon />
                        <button>Đăng xuất</button>
                    </li>
                </ul>
            </Popover>
        </>
    ) : (
        <IconBtn
            icon={<PersonOutlineOutlinedIcon />}
            onClick={() => signIn()}
            tooltip='Tài khoản'
        />
    );
});
