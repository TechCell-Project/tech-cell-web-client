import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import VnPayImg from '@public/img_payment/vnpay.webp';
import CodPayImg from '@public/img_payment/COD.webp';

interface DialogPaymentProps {
    open: boolean;
    handleClose: () => void;
}

const DialogPayment: React.FC<DialogPaymentProps> = ({ open, handleClose }) => {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fafafa',
                    }}
                >
                    <DialogTitle id='alert-dialog-title'>
                        {'Chọn phương thức thanh toán '}
                    </DialogTitle>
                    <Button
                        sx={{
                            padding: '16px 24px',
                            color: 'black',
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                <DialogContent>
                    <Box>Khả dụng</Box>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginTop: '15px',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '10px 15px',
                                    border: '1px solid rgba(145,158,171,.239)',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#ffdada',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '70px',
                                            height: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image src={CodPayImg} width={50} height={50} alt='COD' />
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            marginLeft: '20px',
                                        }}
                                    >
                                        Thanh toán khi nhận hàng
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    padding: '10px 15px',
                                    border: '1px solid rgba(145,158,171,.239)',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#ffdada',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '70px',
                                            height: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            src={VnPayImg}
                                            alt='VnPayImg'
                                            width={0}
                                            height={25}
                                            style={{
                                                width: '100%',
                                                objectFit: 'fill',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            marginLeft: '20px',
                                        }}
                                    >
                                        VNPAY
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        autoFocus
                        disabled
                        sx={{
                            width: '100%',
                            backgroundColor: '#e8e8e8',
                            border: 'none',
                            color: '#555',
                        }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogPayment;
