'use client';

import React, { useState, useEffect } from 'react';
import { ForgotPasswordModel } from 'models';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Form, Formik, FormikHelpers } from 'formik';
import { fetchForgotPassword, fetchVerifyForgotPassword } from 'services/AuthService';
import { forgotPasswordValidate } from 'validate/auth.validate';
import { ForgotForm } from './FromForgot';
import { toast } from 'react-toastify';

type ForgotPasswordProps = {
    handleClose: () => void;
};

export function ForgotPassword(props: Readonly<ForgotPasswordProps>) {
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
            })
            .catch(() => toast.error('Đổi mật khẩu thất bại!'))
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Formik
            enableReinitialize
            initialValues={new ForgotPasswordModel()}
            validationSchema={forgotPasswordValidate}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Stack
                        direction='column'
                        gap={2}
                        sx={{
                            padding: { sm: '20px 15px', xs: '10px 15px' },
                            width: '100%',
                        }}
                    >
                        <ForgotForm sendCode={sendCode} />

                        {isActive && (
                            <Typography variant='body2' fontSize='14px' textAlign='center'>
                                Mã OTP còn hiệu lực trong vòng: <b>{formatTime(countdown)}</b>
                            </Typography>
                        )}

                        <Stack
                            direction='row'
                            justifyContent='flex-end'
                            gap={1}
                            sx={{
                                mt: 1,
                                '& button': {
                                    fontSize: { sm: '14px', xs: '12px' },
                                },
                            }}
                        >
                            <Button variant='outlined' onClick={props.handleClose}>
                                Hủy
                            </Button>

                            <Button variant='contained' type='submit' disabled={isSubmitting}>
                                Xác nhận
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}
