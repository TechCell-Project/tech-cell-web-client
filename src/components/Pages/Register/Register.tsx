'use client';

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { PhoneIphone } from '@mui/icons-material';
import { SignupSchema } from 'validate/auth.validate';
import { RegisterModel } from 'models';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import VerifyEmail from './VerifyEmail';
import { TextFieldCustom } from '@components/Common/FormFormik';
import Stack from '@mui/material/Stack';
import { CommonBtn } from '@components/Common';
import { RootPath } from '@constants/enum';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@store/store';
import { registerNewUser, resendVerifyEmail } from '@store/slices/authSlice';
import { useCountdown } from '@hooks/useCountdownTimer';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { debounce } from '@utils/funcs';

type VerifyCondition = {
    isExpired: boolean;
    isOpen: boolean;
};

export function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();

    const [openVerify, setOpenVerify] = useState<VerifyCondition>({
        isExpired: false,
        isOpen: false,
    });
    const [targetTime, setTargetTime] = useState<Date | null>(null);

    const countdownTimer = useCountdown(targetTime);
    console.log(countdownTimer);

    const { isLoading } = useAppSelector((state) => state.auth);

    const handleSubmit = async (values: RegisterModel) => {
        const res = await dispatch(registerNewUser(values));

        if (res?.success) {
            setTargetTime(new Date(new Date().getTime() + 5 * 60 * 1000));
            setOpenVerify({
                isExpired: false,
                isOpen: true,
            });
        }
        console.log(res);
    };

    const handleResendVerifyOtp = debounce(async (email: string) => {
        const res = await dispatch(resendVerifyEmail({ email }));

        if (res?.success) {
            setTargetTime(new Date(new Date().getTime() + 5 * 60 * 1000));
            setOpenVerify({
                isExpired: false,
                isOpen: true,
            });
        }
    }, 2000);

    return (
        <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ mg: 1, bgcolor: '#ee4949', width: '50px', height: '50px' }}>
                    <PhoneIphone />
                </Avatar>
                <Typography component='h2' fontWeight={500} fontSize='27px' mt={2}>
                    Đăng ký
                </Typography>
                <Typography
                    component='span'
                    fontWeight={400}
                    fontSize='14px'
                    textAlign='center'
                    mt={1}
                >
                    Tạo tài khoản để cùng đồng hành, trải nghiệm với Techcell !
                </Typography>
                <Formik
                    enableReinitialize
                    initialValues={new RegisterModel()}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form style={{ marginTop: '30px', width: '100%' }}>
                            <Grid container columnSpacing={4} rowSpacing={5}>
                                <Grid item xs={6}>
                                    <TextFieldCustom name='firstName' label='Tên' />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldCustom name='lastName' label='Họ' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldCustom name='email' label='Email' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldCustom name='userName' label='Tài khoản' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldCustom
                                        name='password'
                                        label='Mật khẩu'
                                        type='password'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldCustom
                                        name='re_password'
                                        label='Nhập lại mật khẩu'
                                        type='password'
                                    />
                                </Grid>
                            </Grid>

                            <Stack width='100%' alignItems='center' mt={5}>
                                <CommonBtn
                                    type='submit'
                                    content='Đăng ký'
                                    loading={isLoading}
                                    disabled={isLoading}
                                    styles={{ fontWeight: 600 }}
                                />
                            </Stack>
                            <Typography>
                                <Typography
                                    fontSize='14px'
                                    fontWeight={500}
                                    textAlign='center'
                                    mt={5}
                                >
                                    Bạn đã có tài khoản?{' '}
                                </Typography>
                                <Typography
                                    onClick={() => {
                                        router.replace(`${RootPath.Login}?${searchParams}`);
                                    }}
                                    color='primary'
                                    fontSize='14px'
                                    fontWeight={500}
                                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Đăng nhập
                                </Typography>
                            </Typography>

                            {openVerify.isOpen && (
                                <Dialog
                                    open={openVerify.isOpen}
                                    onClose={(event, reason) => {
                                        if (reason && reason === 'backdropClick') return;
                                        setOpenVerify({
                                            ...openVerify,
                                            isOpen: false,
                                        });
                                    }}
                                    aria-labelledby='alert-dialog-title'
                                    aria-describedby='alert-dialog-description'
                                >
                                    <DialogContent
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            padding: 0,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                setOpenVerify({ ...openVerify, isOpen: false })
                                            }
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </DialogContent>
                                    <DialogContent sx={{ padding: 0 }}>
                                        <VerifyEmail
                                            email={values.email as string}
                                            countdown={countdownTimer}
                                            handleResendOtp={handleResendVerifyOtp}
                                        />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default RegisterPage;
