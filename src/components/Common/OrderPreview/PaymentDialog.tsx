'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { Button } from '@mui/material';
import DialogPayment from '@/components/Form/Common/PaymentDialog/DialogPayment';

const PaymentMethodDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ margin: '20px 0' }}>
            {/* <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h5'
                    sx={{ fontWeight: '500', fontSize: '20px', marginBottom: '10px' }}
                >
                    Phương thức thanh toán
                </Typography>
            </Box> */}
            {/* <Button
                    sx={{
                        textAlign: 'left',
                    }}
                    onClick={handleClickOpen}
                > */}
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    padding: '5px 15px',
                    height: '85px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                    onClick={handleClickOpen}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={'/img_payment/payment1.png'} width={40} height={40} alt='img' />
                        <Box sx={{ marginLeft: '25px', textAlign: 'left' }}>
                            <Box
                                sx={{
                                    fontSize: '18px',
                                    color: '#d70018',
                                    marginBottom: '5px',
                                    textTransform: 'none',
                                }}
                            >
                                Chọn phương thức thanh toán
                            </Box>
                            <Box sx={{ fontSize: '12px', color: '#637381' }}>
                                Giảm thêm tới 1.000.000đ
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ color: '#d70018' }}>
                        <ArrowForwardIosIcon />
                    </Box>
                </Button>
            </Box>
            {/* </Button> */}

            <DialogPayment open={open} handleClose={handleClose} />
        </Box>
    );
};

export default PaymentMethodDialog;
