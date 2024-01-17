import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import styles from '@styles/components/productdetail.module.scss';
import { toast } from 'react-toastify';
import { useCart } from '@hooks/userCart';
import { AddCartRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk/models';
import { CommonBtn } from '@components/Common';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        '& .MuiButton-root': {
            color: theme.color.red,
        },
    },
}));

interface DialogButtonContent {
    productCart: AddCartRequestDTO;
}

function CustomizedDialogs({ productCart }: Readonly<DialogButtonContent>) {
    const { addItemToCart } = useCart();
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
                const isSuccess = await addItemToCart(productCart);
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
        <div className={styles.btn_cart}>
            <CommonBtn
                variant='outlined'
                handleClick={addCartClickOpen}
                content='Thêm giỏ hàng'
                className={styles.add_cart}
                endIcon={<AddShoppingCartOutlinedIcon />}
            />
            <CommonBtn
                variant='contained'
                handleClick={buyNowClickOpen}
                content='Mua ngay'
                className={styles.buy_now}
                endIcon={<ShoppingBagOutlinedIcon />}
            />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open.isOpen}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}
                    id='customized-dialog-title'
                >
                    {open.title}
                </DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <Stack spacing={3} alignItems='center' justifyContent='center'>
                        <HighlightOffOutlinedIcon sx={{ fontSize: '180px', color: '#ee4949' }} />
                        <Typography gutterBottom>Bạn chưa chọn đủ các thuộc tính</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default CustomizedDialogs;
