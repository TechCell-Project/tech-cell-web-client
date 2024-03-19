'use client';

import React, { memo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';

import styles from '@styles/components/header.module.scss';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

import { DRAWER_WIDTH } from '@constants/NavConstant';
import { DrawerLayout } from '@components/Layout';
import { Notification } from '@components/Features';
import SearchBarBox from '@components/Common/Searching/SearchBarBox';
import { IconBtn } from '@components/Common/FormGroup/IconBtn';

import { getRole, resolveCallbackUrl } from '@utils';

import { RootPath } from '@constants/enum';

import AlternateAvatar from '@public/images/avatarColor.webp';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { getProfile } from '@/store/slices/profileSlice';
import { NAV_CATEGORIES } from '@/constants/NavConstant';
import { NavMenu } from '../UI/NavMenu';
import Button from '@mui/material/Button';

interface Props {
    window?: () => Window;
}

export const HeaderClient = ({ window }: Props) => {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { push } = useRouter();
    const { carts } = useAppSelector((state) => state.carts);

    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: 'flex', height: { xs: '56px', sm: '68px' } }}>
            <AppBar
                component='nav'
                sx={{
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
                            <Link href={RootPath.Home}>
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
                                '& .MuiTypography-body1': {
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    color: '#3b3b3b',
                                },
                            }}
                        >
                            <Link href={RootPath.Home}>
                                <Button>
                                    <Typography variant='body1'>Trang chủ</Typography>
                                </Button>
                            </Link>
                            <NavMenu content='Sản phẩm' redirectLinks={NAV_CATEGORIES} />
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
                                onClick={() => push(RootPath.Cart)}
                                isBadge
                                tooltip='Giỏ hàng'
                                badgeContent={carts && carts.cartCountProducts}
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
                            onClick={() => push(RootPath.Cart)}
                            isBadge
                            tooltip='Giỏ hàng'
                            badgeContent={carts && carts.cartCountProducts}
                        />
                        <Notification />
                        <RenderUserBtn session={session} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component='nav'>
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
    const dispatch = useAppDispatch();

    const { profile, status } = useAppSelector((state) => state.profile);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProfile());
        }
    }, [dispatch, status]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'user-popover' : undefined;
    const { push } = useRouter();
    const pathname = usePathname();

    return session && profile ? (
        <>
            <Avatar
                src={profile.avatar?.url ?? AlternateAvatar.src}
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
                    {`${profile.firstName} ${profile.lastName}`}
                </Typography>
                <Typography fontSize='12px' fontWeight={500}>
                    {getRole(profile.role)}
                </Typography>

                <hr
                    style={{
                        width: '100%',
                        height: '.5px',
                        margin: '15px 0',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                    }}
                />

                <ul className={styles.popover_account_ul}>
                    <li>
                        <AssignmentIndIcon />
                        <button
                            onClick={() => {
                                push(RootPath.Profile);
                                setAnchorEl(null);
                            }}
                        >
                            Hồ sơ
                        </button>
                    </li>

                    <li>
                        <ShoppingCartIcon />
                        <button
                            onClick={() => {
                                push(RootPath.Order);
                                setAnchorEl(null);
                            }}
                        >
                            Đơn hàng
                        </button>
                    </li>
                    <li>
                        <LogoutRoundedIcon />
                        <button onClick={() => signOut()}>Đăng xuất</button>
                    </li>
                </ul>
            </Popover>
        </>
    ) : (
        <IconBtn
            icon={<PersonOutlineOutlinedIcon />}
            onClick={() =>
                push(
                    `${RootPath.Login}?callbackUrl=${resolveCallbackUrl({
                        callBackUrl: pathname,
                        fallback: RootPath.Home,
                    })}`,
                )
            }
            tooltip='Tài khoản'
        />
    );
});
