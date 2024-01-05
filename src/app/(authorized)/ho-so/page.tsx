'use client';

import React, { useEffect, useState } from 'react';
import { ProfileModel } from '@models/Auth';
import { useAppDispatch, useAppSelector } from '@store/store';
import { editProfileInfo, getCurrentUser } from '@store/slices/authSlice';
import { LoadingPage } from '@components/Common/Display';
import { Profile } from '@components/Features';

export default function Page() {
    const dispatch = useAppDispatch();
    const { user, isLoadingProfile } = useAppSelector((state) => state.auth);

    const [userProfile, setUserProfile] = useState<ProfileModel | null>(null);

    useEffect(() => {
        if (userProfile === null) {
            dispatch(getCurrentUser()).then();
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

    return isLoadingProfile ? <LoadingPage /> : <Profile />;
}
