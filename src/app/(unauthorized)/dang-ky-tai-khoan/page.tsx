'use client';

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Form, Formik, FormikHelpers } from 'formik';
import { PhoneIphone } from '@mui/icons-material';
import { SignupSchema } from 'validate/auth.validate';
import { RegisterModel } from 'models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import VerifyEmail from '../xac-thuc-tai-khoan/VerifyEmail';
import { REGISTER_ENDPOINT } from '@constants/Services';
import { toastConfig } from '@constants/ToastMsgConfig';
import { TextFieldCustom } from '@components/Common/FormFormik';
import Stack from '@mui/material/Stack';
import { CommonBtn } from '@components/Common';
import { RootPath } from '@constants/enum';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [open, setOpen] = useState(false);
    const { push } = useRouter();

    const handleSubmit = async (values: RegisterModel, { setSubmitting }: FormikHelpers<RegisterModel>) => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        };
        fetch(REGISTER_ENDPOINT, requestOptions)
            .then((res) => {
                if (res.ok) {
                    toast.success('Mã đã được gửi vào Email của bạn !!', toastConfig);
                    setOpen(true);
                }
                if (res.status === 409) {
                    return toast.error('Tên tài khoản hoặc email đã được sử dụng !!', toastConfig);
                }

                if (res.status === 400) {
                    return toast.error('Tên đăng nhập phải trên 8 ký tự !!', toastConfig);
                }
            })
            .catch((err) => {
                return toast.error('Tên đăng nhập hoặc tài khoản Email đã được sử dụng !!', toastConfig);
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <>
            <ToastContainer />
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
                    <Typography component='span' fontWeight={400} fontSize='14px' textAlign='center' mt={1}>
                        Tạo tài khoản để cùng đồng hành, trải nghiệm với Techcell !
                    </Typography>
                    <Formik
                        enableReinitialize
                        initialValues={new RegisterModel()}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, isSubmitting }) => (
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
                                        <TextFieldCustom name='password' label='Mật khẩu' type='password'/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextFieldCustom name='re_password' label='Nhập lại mật khẩu' type='password' />
                                    </Grid>
                                </Grid>

                                <Stack width='100%' alignItems='center' mt={5}>
                                    <CommonBtn
                                        type='submit'
                                        content='Đăng ký'
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        styles={{ fontWeight: 600 }}
                                    />
                                </Stack>

                                <Typography fontSize='14px' fontWeight={500} textAlign='center' mt={5}>
                                    Bạn đã có tài khoản? {' '}
                                    <span
                                        onClick={() => push(RootPath.Login)}
                                        style={{
                                            color: '#ee4949',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                        }}>
                                            Đăng nhập
                                        </span>
                                </Typography>

                                {open && (
                                    <Dialog
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        aria-labelledby='alert-dialog-title'
                                        aria-describedby='alert-dialog-description'
                                    >
                                        <VerifyEmail email={values.email as string} />
                                    </Dialog>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </>
    );
}
