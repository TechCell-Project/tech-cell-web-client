'use client';

import Box from '@mui/material/Box';
import React from 'react';
import styles from '@styles/components/profile.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import { useFormik } from 'formik';
import { ProfileSchema } from 'validate/auth.validate';
import { ProfileModel } from '@models/Auth';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();

    const formik = useFormik({
        initialValues: new ProfileModel(),
        validationSchema: ProfileSchema,
        onSubmit: async () => {},
    });

    if (!session) {
        return router.push('/');
    }

    return (
        <div className={styles.profile_container}>
            <div className={styles.top_nav}>
                <div className={styles.navbar_container}>
                    <div className={styles.button_back}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                    {/* <div className={styles.navbar_text}>Quay Lại</div> */}
                </div>
            </div>
            <div className={styles.container_img}>
                <Image
                    src='/img_profile/Shipper_CPS3.webp'
                    width={230}
                    height={230}
                    alt='profile'
                />
            </div>
            <div className={styles.body_content}>
                <div className={styles.content_text}>Cập nhật thông tin tài khoản</div>

                <Box component='form' sx={{ mt: 1 }}>
                    <TextField
                        sx={{ mt: 3 }}
                        autoComplete='given-name'
                        name='userName'
                        fullWidth
                        id='userName'
                        label='Họ và tên'
                        value={session.user.firstName + ' ' + session.user.lastName}
                    />

                    <TextField
                        sx={{ mt: 3 }}
                        autoComplete='given-name'
                        name='email'
                        fullWidth
                        id='email'
                        label='Email'
                        value={session.user.email}
                    />

                    <TextField
                        sx={{ mt: 3 }}
                        autoComplete='given-name'
                        name='phoneNumber'
                        fullWidth
                        id='phoneNumber'
                        label='Số điện thoại'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />

                    <TextField
                        sx={{ mt: 3 }}
                        autoComplete='given-name'
                        name='referralCode'
                        fullWidth
                        id='referralCode'
                        label='Mã giới thiệu ( Nếu có ) '
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2, bgcolor: '#ee4949' }}
                    >
                        Xác Nhận
                    </Button>
                </Box>
            </div>
        </div>
    );
}
