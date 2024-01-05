'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Form, Formik, useFormik } from 'formik';

import styles from '@styles/components/profile.module.scss';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField } from '@mui/material';
import { ProfileSchema } from 'validate/auth.validate';
import { ProfileModel } from '@models/Auth';
import IconButton from '@mui/material/IconButton';

import { UserModel } from '@models/Profile';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCurrentUser } from '@store/slices/authSlice';
import { LoadingPage } from '@components/Common/Display';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';
import { Profile } from '@components/Features';

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [userProfile, setUserProfile] = useState<ProfileModel | null>(null);

    const { user, isLoadingProfile } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (userProfile === null) {
            dispatch(getCurrentUser());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user) {
            setUserProfile({
                ...new ProfileModel(),
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return isLoadingProfile ? <LoadingPage /> : <Profile />;
}

{
    /*<div className={styles.profile_container}>*/
}
{
    /*    <div className={styles.top_nav}>*/
}
{
    /*        <div className={styles.navbar_container}>*/
}
{
    /*            <div className={styles.button_back}>*/
}
{
    /*                <IconButton onClick={() => router.back()}>*/
}
{
    /*                    <ArrowBackIcon />*/
}
{
    /*                </IconButton>*/
}
{
    /*            </div>*/
}
{
    /*            /!* <div className={styles.navbar_text}>Quay Lại</div> *!/*/
}
{
    /*        </div>*/
}
{
    /*    </div>*/
}
{
    /*    <div className={styles.container_img}>*/
}
{
    /*        <Image*/
}
{
    /*            src='/img_profile/Shipper_CPS3.webp'*/
}
{
    /*            width={230}*/
}
{
    /*            height={230}*/
}
{
    /*            alt='profile'*/
}
{
    /*        />*/
}
{
    /*    </div>*/
}
{
    /*    <Formik*/
}
{
    /*        initialValues={userProfile as ProfileModel}*/
}
{
    /*        validationSchema={ProfileSchema}*/
}
{
    /*        onSubmit={async (values, formikHelpers) => {}}*/
}
{
    /*        // className={styles.body_content}*/
}

{
    /*    >*/
}
{
    /*        {({ isSubmitting }) => (*/
}
{
    /*            <>*/
}
{
    /*                <div className={styles.content_text}>Cập nhập thông tin tài khoản</div>*/
}

{
    /*                <Form style={{ marginTop: 1 }}>*/
}
{
    /*                    <TextFieldCustom*/
}
{
    /*                        styles={{ marginTop: 3 }}*/
}
{
    /*                        name='lastName'*/
}
{
    /*                        label='Họ'*/
}
{
    /*                        notDelay*/
}
{
    /*                    />*/
}

{
    /*                    <TextFieldCustom*/
}
{
    /*                        styles={{ marginTop: 3 }}*/
}
{
    /*                        name='firstName'*/
}
{
    /*                        label='Tên'*/
}
{
    /*                        notDelay*/
}
{
    /*                    />*/
}

{
    /*                    <TextFieldCustom*/
}
{
    /*                        styles={{ marginTop: 3 }}*/
}
{
    /*                        name='phoneNumber'*/
}
{
    /*                        label='Số điện thoại'*/
}
{
    /*                        notDelay*/
}
{
    /*                    />*/
}

{
    /*                    <TextFieldCustom*/
}
{
    /*                        styles={{ marginTop: 3 }}*/
}
{
    /*                        name='referralCode'*/
}
{
    /*                        label='Mã giới thiệu ( Nếu có )'*/
}
{
    /*                        notDelay*/
}
{
    /*                    />*/
}

{
    /*                    <CommonBtn*/
}
{
    /*                        type='submit'*/
}
{
    /*                        styles={{ marginTop: 3, marginBottom: 2 }}*/
}
{
    /*                        fullWidth*/
}
{
    /*                        content='Xác Nhận'*/
}
{
    /*                        variant='contained'*/
}
{
    /*                        loading={isSubmitting}*/
}
{
    /*                        disabled={isSubmitting}*/
}
{
    /*                    />*/
}
{
    /*                </Form>*/
}
{
    /*            </>*/
}
{
    /*        )}*/
}
{
    /*    </Formik>*/
}
{
    /*</div>*/
}
