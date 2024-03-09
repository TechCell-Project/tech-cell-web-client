import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import { ShowDialog } from '../Display/DialogCustom';

import { toast } from 'react-toastify';

import { AddCartItemModel } from '@/models';
import { AddCartRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addItemToCart } from '@/store/slices/cartSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RootPath } from '@/constants/enum';

interface HandlingButtonsProps {
    productCart: AddCartItemModel;
}

export const HandlingButtons = ({ productCart }: HandlingButtonsProps) => {
    const router = useRouter();
    const { status: authStatus } = useSession();
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.carts);

    const [open, setOpen] = useState<{ title: string; isOpen: boolean }>({
        title: '',
        isOpen: false,
    });

    const addCartClickOpen = async () => {
        if (productCart.sku === null) {
            setOpen({
                title: 'Thêm vào giỏ hàng thất bại!',
                isOpen: true,
            });
        } else {
            try {
                if (authStatus === 'unauthenticated') {
                    router.push(`${RootPath.Login}?callbackUrl=${window.location.pathname}`);
                }

                const isSuccess = await dispatch(addItemToCart(productCart as AddCartRequestDTO));
                if (isSuccess) {
                    toast.success('Thêm vào giỏ hàng thành công');
                } else {
                    toast.error('Có lỗi xảy ra. Thêm vào giỏ hàng thất bại');
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra. Thêm vào giỏ hàng thất bại');
            }
        }
    };

    const buyNowClickOpen = () => {
        if (productCart.sku === null) {
            setOpen({
                title: 'Mua ngay thất bại!',
                isOpen: true,
            });
        }
    };

    const handleClose = () => {
        setOpen({
            title: '',
            isOpen: false,
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '100%',
                    height: '50px',
                    mt: '10px',
                }}
            >
                <Button
                    variant='outlined'
                    startIcon={<AddShoppingCartIcon />}
                    onClick={addCartClickOpen}
                    disabled={status === 'loading'}
                    sx={{
                        textTransform: 'none',
                        width: { sm: '40%', xs: '50%' },
                        borderWidth: '2px',
                        '&:hover': {
                            borderWidth: '2px',
                        },
                    }}
                >
                    Thêm giỏ hàng
                </Button>
                <Button
                    variant='contained'
                    startIcon={<LocalMallIcon />}
                    sx={{ width: { sm: '60%', xs: '50%' }, boxShadow: 'none' }}
                    onClick={buyNowClickOpen}
                    disabled={status === 'loading'}
                >
                    Mua ngay
                </Button>
            </Box>

            {open.isOpen && (
                <ShowDialog
                    isOpen={open.isOpen}
                    dialogTitle={open.title}
                    handleClose={handleClose}
                    dialogStyle={{ minWidth: { lg: '45%', xs: '80%' } }}
                    isSmall={false}
                >
                    <Stack width='100%' spacing={3} alignItems='center' justifyContent='center'>
                        <HighlightOffOutlinedIcon sx={{ fontSize: '180px', color: '#ee4949' }} />
                        <Typography gutterBottom variant='h4' fontWeight={500} fontSize={16}>
                            Bạn chưa chọn đủ các thuộc tính
                        </Typography>
                        <Button variant='outlined' autoFocus onClick={handleClose}>
                            Đóng
                        </Button>
                    </Stack>
                </ShowDialog>
            )}
        </>
    );
};
