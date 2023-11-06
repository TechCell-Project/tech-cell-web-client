'use client';

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import { useFormik } from 'formik';
import { Copyright } from '@components/Layout';
import { PhoneIphone } from '@mui/icons-material';
import { SignupSchema } from 'validate/auth.validate';
import { RegisterModel } from 'models';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import VerifyEmail from '../verify/VerifyEmail';

const Signup = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.title = `Đăng ký`;
    }, []);

    const formik = useFormik({
        initialValues: new RegisterModel(),
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            // console.log(values);
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            };
            fetch('https://api.techcell.cloud/auth/register', requestOptions)
                .then((res) => {
                    if (res.ok) {
                        toast.success('Mã đã được gửi vào Email của bạn !!', {
                            position: 'top-center',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        });
                        setOpen(true);
                        // router('/login');
                        // router.replace('/login');
                    }
                    if (res.status === 409) {
                        return toast.error('Tên tài khoản hoặc email đã được sử dụng !!', {
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

                    if (res.status === 400) {
                        return toast.error('Tên đăng nhập phải trên 8 ký tự !!', {
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
                })
                .catch((err) => {
                    return toast.error('Tên đăng nhập hoặc tài khoản Email đã được sử dụng !!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
            //     if (response.data) {
            //     toast.success('Mã đã được gửi vào Email của bạn !!', {
            //         position: 'top-center',
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: 'light',
            //     });
            //     setOpen(true);
            // } else {
            //     return toast.error('Tên đăng nhập hoặc tài khoản Email đã được sử dụng !!', {
            //         position: 'top-center',
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: 'light',
            //     });
            // }
        },
    });

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <VerifyEmail email={String(formik.values.email)} />
            </Dialog>

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
                                    error={
                                        formik.touched.firstName && Boolean(formik.errors.firstName)
                                    }
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
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
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
                            label="Tên đăng nhập"
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
                            label="Mật khẩu"
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
                            label="Nhập lại mật khẩu"
                            type="password"
                            value={formik.values.re_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.re_password && Boolean(formik.errors.re_password)}
                            helperText={formik.touched.re_password && formik.errors.re_password}
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
                                        Đã có tài khoản? <span>Đăng nhập</span>
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
