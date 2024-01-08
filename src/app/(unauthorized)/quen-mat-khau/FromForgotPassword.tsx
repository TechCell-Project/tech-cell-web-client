import React, { memo, useState, useEffect } from 'react';
import { ForgotPasswordModel } from 'models';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Form, Formik, FormikHelpers } from 'formik';
import { fetchForgotPassword, fetchVerifyForgotPassword } from 'services/AuthService';
import { forgotPasswordValidate } from 'validate/auth.validate';
import { ForgotForm } from './FromForgot';
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}

export const ForgotPassword = (props: Props) => {
    const [countdown, setCountdown] = useState<number>(5 * 60);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: any = null;

        if (isActive) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (!isActive && countdown !== 0) {
            clearInterval(interval);
        }

        if (countdown === 0) {
            clearInterval(interval);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, countdown]);

    const formatTime = (seconds: number): string => {
        const minutes: number = Math.floor(seconds / 60);
        const remainingSeconds: number = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const sendCode = (email: string) => {
        fetchForgotPassword(email)
            .then(() => {
                if (isActive) {
                    setCountdown(5 * 60);
                } else {
                    setIsActive(true);
                }
                toast.success(`Đã gửi mã OTP dến ${email}`);
            })
            .catch(() => toast.error(`Có lỗi xảy ra, Gửi mã thất bại!`));
    };

    const handleSubmit = (
        values: ForgotPasswordModel,
        { resetForm, setSubmitting }: FormikHelpers<ForgotPasswordModel>,
    ) => {
        fetchVerifyForgotPassword(values)
            .then(() => {
                toast.success('Đổi mật khẩu thành công!');
                resetForm();
                props.handleClose();
            })
            .catch(() => toast.error('Đổi mật khẩu thất bại!'))
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <>
            <ToastContainer />
            <Dialog
                open={props.isOpen}
                onClose={props.handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                style={{ height: 'auto' }}
            >
                <DialogTitle style={{ textAlign: 'center', marginTop: 20 }}>
                    {'Quên Mật Khẩu'}
                </DialogTitle>
                <Formik
                    enableReinitialize
                    initialValues={new ForgotPasswordModel()}
                    validationSchema={forgotPasswordValidate}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ width: '100%' }}>
                            <Stack
                                direction='column'
                                gap={2}
                                style={{ width: 500, padding: '0px 50px 50px 50px' }}
                            >
                                <ForgotForm sendCode={sendCode} />

                                {isActive && (
                                    <Typography variant='body2' fontSize='14px' textAlign='center'>
                                        Mã OTP còn hiệu lực trong vòng:{' '}
                                        <b>{formatTime(countdown)}</b>
                                    </Typography>
                                )}

                                <Stack
                                    direction='row'
                                    justifyContent='flex-end'
                                    gap={1}
                                    sx={{ mt: 1 }}
                                >
                                    <Button variant='outlined' onClick={props.handleClose}>
                                        Hủy bỏ
                                    </Button>

                                    <Button
                                        variant='contained'
                                        type='submit'
                                        disabled={isSubmitting}
                                    >
                                        Xác nhận
                                    </Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};
