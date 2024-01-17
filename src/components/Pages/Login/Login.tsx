'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Google, PhoneIphone } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

import { Form, Formik, FormikHelpers } from 'formik';
import { LoginSchema } from 'validate/auth.validate';
import { ForgotPassword } from '@app/quen-mat-khau/FromForgotPassword';
import { debounce } from 'utils/funcs';
import { RootPath } from '@constants/enum';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';
import styles from '@styles/components/button.module.scss';
import { useCountdown } from '@hooks/useCountdownTimer';
import { useAppDispatch } from '@store/store';
import { resendVerifyEmail } from '@store/slices/authSlice';
import VerifyEmail from '@components/Pages/Register/VerifyEmail';
import { createInitialValues, resolveCallbackUrl } from '@utils/shared.util';
import { signinAction } from 'actions/signin';
import { LoginRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { ShowDialog } from '@/components/Common/Display';

export function LoginPage() {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const searchParams = useSearchParams();

    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [openVerify, setOpenVerify] = useState<boolean>(false);
    const [targetTime, setTargetTime] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const countdownTimer = useCountdown(targetTime);

    const backUrl = resolveCallbackUrl({
        callBackUrl: searchParams.get('callbackUrl'),
        fallback: RootPath.Home,
    });

    const debouncedSignIn = debounce(
        (payload: LoginRequestDTO, { setSubmitting }: FormikHelpers<LoginRequestDTO>) => {
            signinAction(payload)
                .then((res) => {
                    console.log(res?.code);
                    const statusCode = res?.code;
                    switch (statusCode) {
                        case 200:
                            toast.success('Đăng nhập thành công');
                            window.location.href = backUrl;
                            break;
                        case 400:
                        case 401:
                        case 404:
                            toast.error('Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng');
                            break;
                        case 403:
                            toast.error(
                                'Tài khoản của bạn đã bị khoá, liên hệ hỗ trợ để biết thêm thông tin.',
                            );
                            break;
                        case 406:
                        case 422:
                            toast.error(
                                'Email của bạn chưa được xác thực! Hãy kiểm tra mail và tiến hành xác thực',
                            );
                            setOpenVerify(true);
                            break;
                        case 429:
                            toast.error('Đăng nhập thất bại. Bạn đã đăng nhập quá nhiều lần');
                            break;
                        default:
                            toast.error('Có lỗi xảy ra. Đăng nhập thất bại');
                            break;
                    }
                })
                .catch((err) => {
                    toast.error('Có lỗi xảy ra. Đăng nhập thất bại');
                    console.error(err);
                })
                .finally(() => setSubmitting(false));
        },
        500,
    );

    const debouncedGoogleSignIn = debounce(async () => {
        setIsLoading(true);
        const res = await signIn('google', { callbackUrl: backUrl });

        if (res?.ok) {
            toast.success('Đăng nhập thành công');
        }
        setIsLoading(false);
    }, 500);

    const handleResendVerifyOtp = debounce(async (email: string) => {
        const res = await dispatch(resendVerifyEmail({ email }));

        if (res?.success) {
            setTargetTime(new Date(new Date().getTime() + 5 * 60 * 1000));
            setOpenVerify(true);
        }
    }, 2000);

    return (
        <>
            <Container component='main' maxWidth='sm' sx={{ padding: '30px 10px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ mg: 1, bgcolor: '#ee4949', width: '50px', height: '50px' }}>
                        <PhoneIphone />
                    </Avatar>
                    <Typography component='h2' fontWeight={500} fontSize='27px' mt={2}>
                        Đăng nhập
                    </Typography>
                    <Typography component='span' fontWeight={400} fontSize='14px' mt={1}>
                        Chào mừng bạn đến với Techcell !!
                    </Typography>
                    <Formik
                        initialValues={{ emailOrUsername: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, formikHelpers) => {
                            debouncedSignIn(values, formikHelpers);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form style={{ marginTop: '30px', width: '100%' }}>
                                <TextFieldCustom
                                    name='emailOrUsername'
                                    label='Tài khoản hoặc email'
                                    styles={{ marginBottom: '25px' }}
                                />
                                <TextFieldCustom name='password' type='password' label='Mật khẩu' />
                                <Stack width='100%' alignItems='center' mt={5}>
                                    <CommonBtn
                                        type='submit'
                                        content='Đăng nhập'
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        styles={{ fontWeight: 600 }}
                                    />
                                </Stack>
                                <Stack
                                    direction='row'
                                    justifyContent='space-between'
                                    mt={4}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: { sm: '14px', xs: '13px' },
                                            fontWeight: 500,
                                        },
                                    }}
                                >
                                    <Typography>
                                        <Typography>Chưa có tài khoản?</Typography>{' '}
                                        <Typography
                                            onClick={() => {
                                                console.log(backUrl);
                                                router.replace(
                                                    `${RootPath.Register}?${searchParams}`,
                                                );
                                            }}
                                            color='primary'
                                            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            Đăng ký
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        onClick={() => setOpenForgotPassword(true)}
                                        color='primary'
                                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Quên mật khẩu
                                    </Typography>
                                </Stack>

                                {openVerify && (
                                    <Dialog
                                        open={openVerify}
                                        onClose={(event, reason) => {
                                            if (reason && reason === 'backdropClick') return;
                                            setOpenVerify(false);
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
                                            <IconButton onClick={() => setOpenVerify(false)}>
                                                <ClearIcon />
                                            </IconButton>
                                        </DialogContent>
                                        <DialogContent sx={{ padding: 0 }}>
                                            <VerifyEmail
                                                email=''
                                                countdown={countdownTimer}
                                                handleResendOtp={handleResendVerifyOtp}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </Form>
                        )}
                    </Formik>

                    <Grid container spacing={4} alignItems='center' mt={1} sx={{ padding: 0 }}>
                        <Grid item sm={4} xs={2} alignItems='flex-end' justifyItems='flex-end'>
                            <Divider />
                        </Grid>
                        <Grid item sm={4} xs={8} sx={{}}>
                            <Typography
                                textAlign='center'
                                fontWeight={600}
                                sx={{ opacity: 0.6, fontSize: { sm: '14px', xs: '12px' } }}
                            >
                                Hoặc đăng nhập bằng
                            </Typography>
                        </Grid>
                        <Grid item sm={4} xs={2}>
                            <Divider />
                        </Grid>
                    </Grid>

                    <Button
                        onClick={() => debouncedGoogleSignIn()}
                        sx={{ marginTop: { sm: '20px', xs: '10px' }, padding: 0 }}
                        disabled={isLoading}
                    >
                        <Box className={styles.login_socials}>
                            <Google color='primary' />
                            <span>Đăng nhập với Google</span>
                        </Box>
                    </Button>
                </Box>
            </Container>

            {openForgotPassword && (
                <ShowDialog
                    isOpen={openForgotPassword}
                    handleClose={() => setOpenForgotPassword(false)}
                    dialogTitle='Quên mật khẩu'
                    isSmall={true}
                >
                    <ForgotPassword handleClose={() => setOpenForgotPassword(false)} />
                </ShowDialog>
            )}
        </>
    );
}

export default LoginPage;
