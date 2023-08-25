'use client';

import * as React from 'react';
import { Metadata } from 'next';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Copyright } from '@components/Layout';
import { FacebookRounded, Google, PhoneIphone } from '@mui/icons-material';
import { SignupSchema } from 'validate/auth.validate';
import { RegisterModel } from 'models';
import { useAppDispatch } from '@store/store';
import { useRouter } from 'next/navigation';
import { register } from '@store/slices/authSlice';

export const metadata: Metadata = {
    title: 'TechCell - Đăng ký',
};

const Signup = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: new RegisterModel(),
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            const response = await dispatch(register(values));
            if (response.meta.requestStatus === "fulfilled") {
                const timeout = setTimeout(() => {
                    router.replace('/verify');
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
                        Đăng ký
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                fullWidth
                                id="firstName"
                                label="Tên"
                                autoFocus
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                label="Họ"
                                name="lastName"
                                autoComplete="family-name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                      </Grid>
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
                            id="userName"
                            label="Username"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        {/* <TextField
                            margin="normal"
                            fullWidth
                            id="mobile"
                            label="Số điện thoại"
                            name="Mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        /> */}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="re_password"
                            name="re_password"
                            label="Nhập lại Password"
                            type="password"
                            value={formik.values.re_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.re_password &&
                                Boolean(formik.errors.re_password)
                            }
                            helperText={
                                formik.touched.re_password && formik.errors.re_password
                            }
                        />
                        <FormControlLabel
                            control={<Checkbox value="acceptPolicy" sx={{ color: '#ee4949' }} />}
                            label="Tôi đồng ý với các điều khoản bảo mật cá nhân"
                            sx={{
                                '& .Mui-checked': {
                                    color: '#ee4949',
                                },
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="acceptAdvertisement" sx={{ color: '#ee4949' }} />
                            }
                            label="Đăng ký nhận bản tin khuyến mãi qua email"
                            sx={{
                                '& .Mui-checked': {
                                    color: '#ee4949',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#ee4949' }}
                        >
                            Đăng ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login">
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            '& span': {
                                                textDecoration: 'underline',
                                                color: '#ee4949',
                                            },
                                        }}
                                    >
                                        Already have an account? <span>Login</span>
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </>
    );
};

export default Signup;
