'use client';

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
import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Image from 'next/image';
import { FacebookRounded, Google, PhoneIphone } from '@mui/icons-material';
import { Copyright } from '@components/Layout';

const validateEmail = (email: string | undefined) => {
    return yup.string().email('Bạn cần điền đúng định dạng email').isValidSync(email);
};

const validatePhone = (phone: number | undefined) => {
    return yup
        .number()
        .integer()
        .positive()
        .test((phone) => {
            return phone && phone.toString().length >= 10 && phone.toString().length <= 12
                ? true
                : false;
        })
        .isValidSync(phone);
};

const LoginSchema = yup.object().shape({
    email_or_phone: yup
        .string()
        .required('Bạn cần nhập email hoặc SĐT đã đăng ký')
        .test('email_or_phone', 'Email / Phone is invalid', (value) => {
            return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
        }),
    password: yup.string().min(8, 'Mật khẩu cần ít nhất 8 kí tự').required('Bạn cần nhập mật khẩu'),
});

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email_or_phone: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
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
                            required
                            fullWidth
                            id="emailOrPhone"
                            label="Email hoặc SĐT"
                            name="emailOrPhone"
                            autoFocus
                            value={formik.values.email_or_phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email_or_phone &&
                                Boolean(formik.errors.email_or_phone)
                            }
                            helperText={
                                formik.touched.email_or_phone && formik.errors.email_or_phone
                            }
                        />
                        <TextField
                            margin="normal"
                            required
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
                            control={<Checkbox value="remember" sx={{ color: '#ee4949', }} />}
                            label="Remember me"
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
                                    <Typography variant="body2">
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup">
                                    <Typography variant="body2" sx={{ '& span': { textDecoration: 'underline', color: '#ee4949', }}}>
                                        Don&apos;t have an account? <span>Sign Up</span>
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Typography component="h1" variant="h6" sx={{ mt: 3, }}>
                        Hoặc Đăng nhập với
                    </Typography>
                    <Stack spacing={3} direction='row'>
                        <Link href='#'>
                            <IconButton size='large' sx={{ color: '#ee4949'}}>
                                <FacebookRounded />
                            </IconButton>
                        </Link>
                        <Link href='#'>
                            <IconButton size='large' sx={{ color: '#ee4949'}}>
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
