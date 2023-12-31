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
import { toast } from 'react-toastify';

import { Form, Formik, FormikHelpers } from 'formik';
import { LoginSchema } from 'validate/auth.validate';
import { LoginModel } from 'models';
import { ForgotPassword } from '@app/quen-mat-khau/FromForgotPassword';
import { debounce } from 'utils/funcs';
import { toastConfig } from '@constants/ToastMsgConfig';
import { RootPath } from '@constants/enum';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';
import styles from '@styles/components/button.module.scss';

export default function Login() {
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const backUrl = searchParams.has('callbackUrl') ? searchParams.get('callbackUrl') : '/';

    // useEffect(() => {
    //     if (searchParams.get('error')) {
    //         toast.error('Đăng nhập thất bại !!', {
    //             position: 'top-center',
    //         });
    //     }
    // }, [searchParams]);

    const debouncedSignIn = debounce(async (
        payload: LoginModel, { setSubmitting }: FormikHelpers<LoginModel>,
    ) => {
        try {
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
            setSubmitting(false);
        }
    }, 1500);

    return (
        <>
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
                        Đăng nhập
                    </Typography>
                    <Typography component='span' fontWeight={400} fontSize='14px' mt={1}>
                        Chào mừng bạn đến với Techcell !!
                    </Typography>
                    <Formik
                        initialValues={new LoginModel()}
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
                                    notDelay
                                />
                                <TextFieldCustom
                                    name='password'
                                    type='password'
                                    label='Mật khẩu'
                                    notDelay
                                />
                                <Stack width='100%' alignItems='center' mt={5}>
                                    <CommonBtn
                                        type='submit'
                                        content='Đăng nhập'
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        styles={{ fontWeight: 600 }}
                                    />
                                </Stack>
                                <Stack direction='row' justifyContent='space-between' mt={4}>
                                    <Typography fontSize='14px' fontWeight={500}>
                                        Chưa có tài khoản? {' '}
                                        <span
                                            onClick={() => push(RootPath.Register)}
                                            style={{
                                                color: '#ee4949',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Đăng ký
                                        </span>
                                    </Typography>
                                    <Typography
                                        onClick={() => setOpenForgotPassword(true)}
                                        color='primary'
                                        fontSize='14px'
                                        fontWeight={500}
                                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Quên mật khẩu
                                    </Typography>
                                </Stack>
                            </Form>
                        )}
                    </Formik>

                    <Grid container spacing={4} alignItems='center' mt={1}>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography
                                textAlign='center'
                                fontWeight={600}
                                fontSize='14px'
                                sx={{ opacity: 0.6 }}
                            >
                                Hoặc đăng nhập bằng
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Divider />
                        </Grid>
                    </Grid>

                    <Box
                        className={styles.login_socials}
                        onClick={() => signIn('google', { callbackUrl: process.env.NEXTAUTH_URL })}
                        mt={5}
                    >
                        <Google color='primary' />
                        <span>Đăng nhập với Google</span>
                    </Box>
                </Box>
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
