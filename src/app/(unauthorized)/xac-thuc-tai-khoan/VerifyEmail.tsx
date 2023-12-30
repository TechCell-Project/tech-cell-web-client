'use client';

import React, { FC, useEffect } from 'react';
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
import { padWithZero } from '@utils/funcs';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/material/styles';
import { RootPath } from '@constants/enum';
import { CircularProgress } from '@mui/material';
import { CommonBtn } from '@components/Common';

const VerificationEmailTimer = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    '& .timer': {
        fontWeight: '500',
    },

    '& button': {
        display: 'flex',
        fontWeight: '700',
        textDecoration: 'underline',
        color: theme.color.red,
        gap: '8px',
        '& .MuiCircularProgress-root': {
            width: '20px !important',
            height: '20px !important',
        },
    },
}));

interface VerifyEmailProps {
    email: string;
    countdown: number[] | null;
    handleResendOtp: (email: string) => void;
}

const VerifyEmail: FC<VerifyEmailProps> = ({ email, countdown, handleResendOtp }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector((state) => state.auth);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...new VerifyEmailModel(), email },
        validationSchema: VerifyEmailSchema,
        onSubmit: async (values) => {
            const response = await dispatch(verifyEmail(values));

            if (response?.success) {
                router.push(RootPath.Login);
            }
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
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
                        disabled={email.length > 0}
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
                    {formik.values.email.length > 0 && (
                        <>
                            {countdown && (
                                <>
                                    {countdown[2] >= 0 && countdown[3] >= 0 ? (
                                        <VerificationEmailTimer direction="column">
                                            <Typography variant="h6" className="timer">
                                                {'OTP hết hạn sau '}
                                                {padWithZero(countdown[2])}:
                                                {padWithZero(countdown[3])}
                                            </Typography>
                                            <Button variant="text" disabled>
                                                Gửi lại OTP
                                            </Button>
                                        </VerificationEmailTimer>
                                    ) : (
                                        <VerificationEmailTimer direction="column">
                                            <Typography variant="h6" className="timer">
                                                OTP hiện tại đã hết hạn
                                            </Typography>
                                            <Button
                                                variant="text"
                                                onClick={() => handleResendOtp(formik.values.email)}
                                            >
                                                <Typography variant='subtitle2'>Gửi lại OTP</Typography>
                                                {isLoading && <CircularProgress />}
                                            </Button>
                                        </VerificationEmailTimer>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <CommonBtn
                        type="submit"
                        fullWidth
                        content='Xác nhận'
                        loading={isLoading}
                        disabled={isLoading}
                        styles={{ fontWeight: 600 }}
                    />
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
    );
};

export default VerifyEmail;
