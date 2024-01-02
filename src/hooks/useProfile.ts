import { useAppDispatch, useAppSelector } from '@store/store';
import { getProfile } from '@store/slices/profileSlice';
import { useCallback, useEffect } from 'react';

export function useProfile() {
    const dispatch = useAppDispatch();
    const profileState = useAppSelector((state) => state.profile);

    const refreshProfile = useCallback(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

    return { ...profileState, refreshProfile };
}
