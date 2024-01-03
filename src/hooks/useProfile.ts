import { useAppDispatch, useAppSelector } from '@store/store';
import { ProfileState, getProfile } from '@store/slices/profileSlice';
import { useCallback, useEffect } from 'react';

type UseProfile = ProfileState & {
    refreshProfile: () => void;
};

/**
 * A hook that provides access to the user's profile data
 *
 * @returns {UseProfile} An object containing the user's profile data
 */
export function useProfile(): UseProfile {
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
