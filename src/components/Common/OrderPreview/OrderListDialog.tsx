import React, { FC } from 'react';
import Image from 'next/image';

import styles from '@styles/components/payment.module.scss';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import { VariantInCart } from '@interfaces/cart';

import { currencyFormat, upperCase } from 'utils';

interface DialogProps {
    openList: boolean;
    handleCloseDialog: () => void;
    list: VariantInCart[];
}

const OrderListDialog: FC<DialogProps> = ({ openList, handleCloseDialog, list }) => {
    return (
        <Dialog
            open={openList}
            onClose={handleCloseDialog}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle
                id='alert-dialog-title'
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        fontSize: '16px',
                        color: '#323232',
                        fontWeight: 'bold',
                    }}
                >
                    Danh sách sản phẩm đang thanh toán
                </Box>
                <Button sx={{ color: 'black' }} onClick={handleCloseDialog}>
                    <CloseIcon />
                </Button>
            </DialogTitle>
            <DialogContent>
                {list.map((item) => (
                    <DialogContent
                        key={item.id + item.data.sku}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Image
                                src={item.data.images[0].url}
                                width={80}
                                height={80}
                                alt='product'
                            />

                            <div className={styles.payment_card_info}>
                                <div className={styles.payment_name}>{item.name}</div>
                                <Typography variant='h6' sx={{ fontSize: '14px' }}>
                                    {item.data.attributes.map((attr, index) => {
                                        let str = '';
                                        const unit = attr.u ?? '';
                                        const separate = index !== 0 ? ' - ' : ('' as string);
                                        str += separate + upperCase(attr.v) + unit;
                                        return str;
                                    })}
                                </Typography>
                                <div className={styles.payment_price}>
                                    <div className={styles.payment_price_new}>
                                        {currencyFormat(item.data.price.special * item.quantity)}
                                    </div>
                                    <div className={styles.payment_price_old}>
                                        {currencyFormat(item.data.price.base * item.quantity)}
                                    </div>
                                </div>
                            </div>
                        </Box>

                        <Box>
                            <div className={styles.payment_item_right}>
                                <div className={styles.payment_quanity}>
                                    Số lượng : <span> {item.quantity} </span>
                                </div>
                            </div>
                        </Box>
                    </DialogContent>
                ))}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#ee4949' }}>
                <Button
                    onClick={handleCloseDialog}
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                        color: 'white',
                    }}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderListDialog;
