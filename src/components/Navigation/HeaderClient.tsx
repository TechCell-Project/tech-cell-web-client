'use client';

import { useState } from 'react';
import Image from 'next/image';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    Toolbar,
    Stack,
    Button,
    Link,
    Menu,
    MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { MenuComponent } from '@components/Form';
import { DRAWER_WIDTH, NAV_ITEMS } from '@constants/NavConstant';
import { DrawerLayout } from '@components/Layout';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '@styles/components/button.module.scss';
import { signIn, useSession, signOut } from 'next-auth/react';
import SearchBarBox from '@components/Common/Searching/SearchBarBox';

interface Props {
    window?: () => Window;
}

export const HeaderClient = (props: Props) => {
    const { data: session } = useSession();
    console.log({ session });
    const theme = useTheme();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openDrop = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseDrop = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    // Modal search
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
    ];

    const style = {
        position: 'absolute',
        top: '13%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: 'auto',
        bgcolor: '#fff',
        padding: '10px',
    };

    return (
        <Box sx={{ display: 'flex', height: { xs: '56px', sm: '64px' } }}>
            <AppBar
                component="nav"
                sx={{
                    backgroundColor: theme.color.red,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '100%',
                    paddingRight: '0px !important',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: { xs: 'space-between', lg: 'space-between' },
                        width: { lg: '1200px', xs: '100%', md: '100%', sm: '100%' },
                        alignItems: 'center',
                        padding: { xs: '0px 10px' },
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'block', lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
                            width: { xs: '130px', lg: '150px' },
                        }}
                    >
                        <Link href="/">
                            <Image
                                src="/logo-white.png"
                                alt="Logo Techcell"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Link>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={5}
                        sx={{ justifyContent: { xs: 'space-between' } }}
                    >
                        <SearchBarBox />
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                                gap: '15px',
                                alignItems: 'center',
                            }}
                        >
                            {NAV_ITEMS.map((item, index) => (
                                <MenuComponent
                                    key={`nav_item_${index.toString()}`}
                                    content={item.name}
                                    options={item?.menu}
                                    icon={item.icon ? <item.icon></item.icon> : undefined}
                                    href={item.href ? item.href : ''}
                                />
                            ))}

                            {!session && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountCircleIcon />
                                    <Button onClick={() => signIn()}>
                                        <Box sx={{ color: 'white', textTransform: 'capitalize' }}>
                                            Đăng Nhập
                                        </Box>{' '}
                                    </Button>
                                </Box>
                            )}

                            {session && (
                                <>
                                    <Button
                                        id="basic-button"
                                        variant="text"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'white',
                                            }}
                                        >
                                            <AccountCircleIcon />
                                            <Box
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    marginLeft: '2px',
                                                }}
                                            >
                                                {session?.user?.userName}
                                            </Box>
                                        </Box>
                                    </Button>

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDrop}
                                        onClose={handleCloseDrop}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                            style: {
                                                maxHeight: 100,
                                                width: '110px',
                                            },
                                        }}
                                    >
                                        <MenuItem sx={{ fontSize: '14px', fontWeight: 500 }}>
                                            <Button onClick={() => signOut()}>
                                                <Box
                                                    sx={{
                                                        color: 'white',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    Đăng Xuất
                                                </Box>
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                            {/* </Box> */}
                        </Box>
                    </Stack>
                    <Box
                        sx={{
                            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' },
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                        }}
                    >
                        <Box sx={{ height: '24px' }} onClick={handleOpen}>
                            <SearchIcon />
                        </Box>
                        <Box sx={{ marginLeft: '15px', height: '24px' }}>
                            {!session && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button sx={{ padding: '0px' }} onClick={() => signIn()}>
                                        <Box sx={{ color: 'white', textTransform: 'capitalize' }}>
                                            <AccountCircleIcon />
                                        </Box>
                                    </Button>
                                </Box>
                            )}

                            {session && (
                                <>
                                    <Button
                                        id="basic-button"
                                        variant="text"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        sx={{ padding: '0px', minWidth: '24px' }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'white',
                                            }}
                                        >
                                            <AccountCircleIcon />
                                        </Box>
                                    </Button>

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem>
                                            <Button onClick={() => signOut()}>
                                                <Box
                                                    sx={{
                                                        color: 'white',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    Đăng Xuất
                                                </Box>
                                            </Button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
                {/* Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack sx={{ maxWidth: '100% ' }}>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={top100Films.map((option) => option.title)}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
                            />
                        </Stack>

                        <Box sx={{ display: 'flex' }}>
                            <button className={styles.button_search}>Tìm kiếm</button>
                        </Box>
                    </Box>
                </Modal>
            </AppBar>
            <Box component="nav" sx={{}}>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: DRAWER_WIDTH,
                            p: 2,
                        },
                    }}
                >
                    <DrawerLayout handleDrawerToggle={handleDrawerToggle} />
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
};
