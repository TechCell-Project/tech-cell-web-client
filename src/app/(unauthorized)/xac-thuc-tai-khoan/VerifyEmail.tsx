'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { PhoneIphone } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@store/store';

import { useFormik } from 'formik';

import { VerifyEmailModel } from 'models';
import { VerifyEmailSchema } from 'validate/auth.validate';

import { Copyright } from '@components/Layout';
import { verifyEmail } from '@store/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const VerifyEmail = ({ email }: { email: string }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...new VerifyEmailModel(), email },
        validationSchema: VerifyEmailSchema,
        onSubmit: async (values) => {
            const response = await dispatch(verifyEmail(values));
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('Đăng ký thành công !!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                const timeout = setTimeout(() => {
                    router.replace('/signin');
                }, 1000);
                return () => {
                    clearTimeout(timeout);
                };
            }
            if (response.meta.requestStatus === 'rejected') {
                return toast.error('Đăng kí ko thành công !!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        },
    });

    return (
        <>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ mg: 1, bgcolor: '#ee4949' }}>
                        <PhoneIphone />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Xác thực Email
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="otpCode"
                            label="OTP Code"
                            name="otpCode"
                            value={formik.values.otpCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.otpCode && Boolean(formik.errors.otpCode)}
                            helperText={formik.touched.otpCode && formik.errors.otpCode}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#ee4949' }}
                        >
                            Xác nhận
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/dang-ky-tai-khoan">
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            '& span': {
                                                textDecoration: 'underline',
                                                color: '#ee4949',
                                            },
                                        }}
                                    >
                                        Chưa có tài khoản ? <span>Đăng ký</span>
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
};

export default VerifyEmail;
