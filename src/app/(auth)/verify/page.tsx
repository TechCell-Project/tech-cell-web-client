'use client';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';


import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

import { PhoneIphone } from '@mui/icons-material';

import { useAppDispatch } from '@store/store';

import { useFormik } from 'formik';

import { VerifyEmailModel } from 'models';
import { VerifyEmailSchema } from 'validate/auth.validate';

import { Copyright } from '@components/Layout';
import { verifyEmail } from '@store/slices/authSlice';

export const metadata: Metadata = {
    title: 'TechCell - Đăng thực',
};

const VerifyEmail = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: new VerifyEmailModel(),
        validationSchema: VerifyEmailSchema,
        onSubmit: async (values) => {
            const response = await dispatch(verifyEmail(values));

            if (response.meta.requestStatus === "fulfilled") {
                const timeout = setTimeout(() => {
                    router.replace('/login');
                }, 1000);
                return () => {
                    clearTimeout(timeout);
                };
            }
        },
    });

    return (
        <>
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
                                <Link href="/register">
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