'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Form, Formik, FormikHelpers } from 'formik';

import styles from '@styles/components/profile.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileSchema } from 'validate/auth.validate';
import { ProfileUpdateRequest } from '@models/Auth';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '@store/store';
import { editProfileInfo, getCurrentUser } from '@store/slices/authSlice';
import { LoadingPage } from '@components/Common/Display';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';
import { debounce } from '@utils/funcs';
import { UserAccount } from '@models/Account';

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [userProfile, setUserProfile] = useState<ProfileUpdateRequest | null>(null);

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
                ...new ProfileUpdateRequest(),
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleSubmit = debounce(async (payload: ProfileUpdateRequest, { setSubmitting }: FormikHelpers<ProfileUpdateRequest>) => {
        const res = await dispatch(editProfileInfo(payload));

        if (res?.success) {
            dispatch(getCurrentUser());
        }
        setSubmitting(false);
    }, 5000);

    return isLoadingProfile ? (
        <LoadingPage />
    ) : (
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
            <Formik
                initialValues={userProfile as ProfileUpdateRequest}
                validationSchema={ProfileSchema}
                onSubmit={(values, formikHelpers) => {
                    handleSubmit(values, formikHelpers);
                }}
                className={styles.body_content}
            >
                {({ isSubmitting }) => (
                    <>
                        <div className={styles.content_text}>Cập nhập thông tin tài khoản</div>

                        <Form style={{ marginTop: 1 }}>
                            <TextFieldCustom
                                styles={{ marginTop: 3 }}
                                name='username'
                                label='Tên tài khoản'
                                notDelay
                            />

                            <TextFieldCustom
                                styles={{ marginTop: 3 }}
                                name='lastName'
                                label='Họ'
                                notDelay
                            />

                            <TextFieldCustom
                                styles={{ marginTop: 3 }}
                                name='firstName'
                                label='Tên'
                                notDelay
                            />

                            <CommonBtn
                                type='submit'
                                styles={{ marginTop: 3, marginBottom: 2 }}
                                fullWidth
                                content='Xác Nhận'
                                variant='contained'
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}
