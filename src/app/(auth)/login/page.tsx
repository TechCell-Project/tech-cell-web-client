'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

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
import { FacebookRounded, Google, PhoneIphone } from '@mui/icons-material';

import { Copyright } from '@components/Layout';
import { useFormik } from 'formik';
import { LoginSchema } from 'validate/auth.validate';
import { LoginModel } from 'models';
import { useAppDispatch } from '@store/store';
import { logIn } from '@store/slices/authSlice';

export const metadata: Metadata = {
    title: 'TechCell - Đăng nhập',
};

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: new LoginModel(),
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const response = await dispatch(logIn(values));
            
            if (String(response.payload).startsWith("Email")) {
                const timeout = setTimeout(() => {
                    router.replace('/verify');
                }, 200);
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
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="emailOrUsername"
                            label="Email hoặc SĐT"
                            name="emailOrUsername"
                            autoFocus
                            value={formik.values.emailOrUsername}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.emailOrUsername &&
                                Boolean(formik.errors.emailOrUsername)
                            }
                            helperText={
                                formik.touched.emailOrUsername && formik.errors.emailOrUsername
                            }
                        />
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
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{ color: '#ee4949' }} />}
                            label="Nhớ mật khẩu"
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
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#">
                                    <Typography variant="body2">Quên mật khẩu</Typography>
                                </Link>
                            </Grid>
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
                    <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
                        Hoặc Đăng nhập với
                    </Typography>
                    <Stack spacing={3} direction="row">
                        <Link href="#">
                            <IconButton size="large" sx={{ color: '#ee4949' }}>
                                <FacebookRounded />
                            </IconButton>
                        </Link>
                        <Link href="#">
                            <IconButton size="large" sx={{ color: '#ee4949' }}>
                                <Google />
                            </IconButton>
                        </Link>
                    </Stack>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
};

export default Login;
