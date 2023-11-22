'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FacebookRounded, Google, PhoneIphone } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

import { Copyright } from '@components/Layout';
import { useFormik } from 'formik';
import { LoginSchema } from 'validate/auth.validate';
import { LoginModel } from 'models';
import { ForgotPassword } from '@app/quen-mat-khau/FromForgotPassword';

export default function Login() {
    const router = useRouter();
    const { data: session } = useSession();
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('error')) {
            toast.error('Đăng nhập thất bại !!', {
                position: 'top-center',
            });
        }
    }, [searchParams]);

    const formik = useFormik({
        initialValues: new LoginModel(),
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            signIn('credentials', {
                emailOrUsername: values.emailOrUsername,
                password: values.password,
                callbackUrl: '/',
                // redirect: false,
            });
        },
    });

    if (session?.user?.accessToken) {
        return router.replace('/');
    } else
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
                            Đăng nhập
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="emailOrUsername"
                                label="Tên đăng nhập"
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
                                label="Mật khẩu"
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
                                    <Typography
                                        variant="body2"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => setOpenForgotPassword(true)}
                                    >
                                        Quên mật khẩu
                                    </Typography>
                                </Grid>
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
                        <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
                            Hoặc Đăng nhập với
                        </Typography>
                        <Stack spacing={3} direction="row">
                            <Button
                                onClick={() => {
                                    signIn('facebook', { callbackUrl: process.env.NEXTAUTH_URL });
                                }}
                            >
                                <IconButton size="large" sx={{ color: '#ee4949' }}>
                                    <FacebookRounded />
                                </IconButton>
                            </Button>
                            <Button
                                onClick={() =>
                                    signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })
                                }
                            >
                                <IconButton size="large" sx={{ color: '#ee4949' }}>
                                    <Google />
                                </IconButton>
                            </Button>
                        </Stack>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
                {openForgotPassword && (
                    <ForgotPassword
                        isOpen={openForgotPassword}
                        handleClose={() => setOpenForgotPassword(false)}
                    />
                )}
            </>
        );
}
