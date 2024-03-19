import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { usePathnameChange } from '@hooks/usePathnameChange';
import { NavAccordion } from '../UI/NavAccordion';
import SearchBarBox from '@components/Common/Searching/SearchBarBox';
import { NAV_CATEGORIES } from '@/constants/NavConstant';
import { RootPath } from '@constants/enum';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

interface Props {
    handleDrawerToggle: () => void;
}

export const DrawerLayout = ({ handleDrawerToggle }: Props) => {
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
            <Box
                className='w-full flex flex-col'
                sx={{
                    gap: '5px',
                    '& button': {
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '5px 0',
                    },
                    '& span': {
                        marginRight: '20px',
                    },
                    '& svg': {
                        fontSize: '24px !important',
                    },
                    '& .MuiTypography-body1': {
                        color: '#3b3b3b',
                        fontSize: '15px',
                        fontWeight: 500,
                        textTransform: 'none',
                    },
                }}
            >
                <Link href={RootPath.Home} className='w-full'>
                    <Button startIcon={<HomeOutlinedIcon />}>
                        <Typography variant='body1'>Trang chủ</Typography>
                    </Button>
                </Link>
                <div className='w-full'>
                    <Button
                        startIcon={<SearchOutlinedIcon />}
                        onClick={() => setOpenSearchModal(true)}
                    >
                        <Typography variant='body1'>Tìm kiếm</Typography>
                    </Button>
                </div>
                <NavAccordion content='Sản phẩm' redirectLinks={NAV_CATEGORIES} />
            </Box>

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

const ModelSearch = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    const isPathnameChanged = usePathnameChange();

    useEffect(() => {
        if (isPathnameChanged) {
            handleClose();
        }
    }, [handleClose, isPathnameChanged]);

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
