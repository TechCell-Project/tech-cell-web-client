import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
// import { NAV_ITEMS } from '@constants/NavConstant';
import { AccordionComponent } from '@components/Form';
import { RootPath } from '@constants/enum';
import Link from 'next/link';
import SearchBarBox from '@components/Common/Searching/SearchBarBox';
import Typography from '@mui/material/Typography';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter, usePathname } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { CATEGORY } from '@constants/PhoneConstant';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

interface Props {
    handleDrawerToggle: () => void;
}

const NAV_ITEMS = [
    { name: 'Trang chủ', icon: HomeOutlinedIcon, href: RootPath.Home },
    { name: 'Sản phẩm', menu: CATEGORY, icon: PhoneAndroidOutlinedIcon, isNav: true },
    { name: 'Tra cứu đơn hàng', icon: LocalShippingOutlinedIcon, href: RootPath.Home },
];

export const DrawerLayout = ({ handleDrawerToggle }: Props) => {
    const { push } = useRouter();
    const pathname = usePathname();
    const [openSearchModal, setOpenSearchModal] = useState(false);

    useEffect(() => {
        handleDrawerToggle();
    }, [pathname]);

    return (
        <>
            <Stack flexDirection='column' justifyContent='flex-start' mb={4}>
                <Link href={RootPath.Home}>
                    <Image src='/logo-red.png' alt='Logo Techcell' width={150} height={50} />
                </Link>
            </Stack>
            <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                gap={4}
                p='10px 0'
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenSearchModal(true)}
            >
                <SearchOutlinedIcon />
                <Typography fontSize='15px' fontWeight={500}>
                    Tìm kiếm
                </Typography>
            </Stack>
            {NAV_ITEMS.map((item) => {
                return item.isNav ? (
                    <AccordionComponent key={item.name} content={item.name} options={item?.menu} icon={<item.icon />} />
                ) : (
                    <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        gap={4}
                        key={item.name}
                        p='10px 0'
                        onClick={() => item.href && push(item.href)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <item.icon />
                        <Typography fontSize='15px' fontWeight={500}>
                            {item.name}
                        </Typography>
                    </Stack>
                );
            })}
            <ModelSearch open={openSearchModal} handleClose={() => setOpenSearchModal(false)} />
        </>
    );
};

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: 'auto',
    bgcolor: '#fff',
    padding: '20px 30px',
};

const ModelSearch = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <SearchBarBox isDisplay minWidth='100%' />
            </Box>
        </Modal>
    );
};