'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
import { toast } from 'react-toastify';

import { Copyright } from '@components/Layout';
import { useFormik } from 'formik';
import { LoginSchema } from 'validate/auth.validate';
import { LoginModel } from 'models';
import { ForgotPassword } from '@app/quen-mat-khau/FromForgotPassword';
import { debounce } from 'utils/funcs';
import { toastConfig } from '@constants/ToastMsgConfig';
import MoonLoader from 'react-spinners/MoonLoader';

export default function Login() {
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const backUrl = searchParams.has('callbackUrl') ? searchParams.get('callbackUrl') : '/';

    // useEffect(() => {
    //     if (searchParams.get('error')) {
    //         toast.error('Đăng nhập thất bại !!', {
    //             position: 'top-center',
    //         });
    //     }
    // }, [searchParams]);

    const debouncedSignIn = debounce(async (payload: LoginModel) => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                emailOrUsername: payload.emailOrUsername,
                password: payload.password,
                callbackUrl: backUrl as string,
                redirect: true,
            });
            toast.success('Đăng nhập thành công', toastConfig);
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập thất bại !!', toastConfig);
        } finally {
            setIsLoading(false);
        }
    }, 1500);

    const formik = useFormik({
        initialValues: new LoginModel(),
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            debouncedSignIn(values);
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
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#ee4949', }}
                        >
                            {isLoading && (
                                <MoonLoader color='#e74c3c' speedMultiplier={0.75} size={22} />
                            )}
                            {!isLoading && (
                                <Typography variant='h6' sx={{ fontSize: '16px' }}>Đăng nhập</Typography>
                            )}
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
