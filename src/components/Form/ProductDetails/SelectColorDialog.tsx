import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import styles from '@styles/components/productdetail.module.scss';
import { addItemToCart } from '@store/slices/cartSlice';
import { useAppDispatch } from '@store/store';
import { toast } from 'react-toastify';
import { AddCartItemModel } from '@models/Cart';

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
    missingColor: boolean;
    productCart: AddCartItemModel;
}

const CustomizedDialogs: FC<DialogButtonContent> = ({ missingColor, productCart }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<{ title: string; isOpen: boolean }>({
        title: '',
        isOpen: false,
    });

    console.log(productCart);

    const addCartClickOpen = async () => {
        if (missingColor) {
            setOpen({
                title: 'Thêm vào giỏ hàng thất bại!',
                isOpen: true,
            });
        } else {
            try {
                const response = await dispatch(addItemToCart(productCart));

                console.log(response);
                if (response?.success) {
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
        if (missingColor) {
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
            <Button onClick={addCartClickOpen} className={styles.add_cart}>
                Thêm giỏ hàng
            </Button>
            <Button onClick={buyNowClickOpen} className={styles.buy_now}>
                Mua ngay
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open.isOpen}
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, textAlign: 'center', borderBottom: '1px solid #d3d3d3' }}
                    id="customized-dialog-title"
                >
                    {open.title}
                </DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <Stack spacing={3} alignItems="center" justifyContent="center">
                        <HighlightOffOutlinedIcon sx={{ fontSize: '180px', color: '#ee4949' }} />
                        <Typography gutterBottom>Bạn chưa chọn màu sản phẩm</Typography>
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
};

export default CustomizedDialogs;