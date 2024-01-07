import { useAppDispatch, useAppSelector } from '@store/store';
import { ProfileState, getProfile } from '@store/slices/profileSlice';
import { useCallback, useEffect } from 'react';
import { profileApi } from '@services/ProfileService';
import { AddressSchemaDTO, UserMntResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

type UseProfile = ProfileState & {
    refreshProfile: () => void;
    updateProfileInfo: (dataChanges: Partial<UserMntResponseDTO>) => Promise<boolean>;
    updateProfileAddress: (addressChanges: AddressSchemaDTO[]) => Promise<boolean>;
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

    const updateProfileInfo = useCallback(
        async (dataChanges: Partial<UserMntResponseDTO>) => {
            return profileApi
                .updateUserInfo({
                    updateUserRequestDTO: dataChanges,
                })
                .then(() => {
                    refreshProfile();
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },
        [refreshProfile],
    );

    const updateProfileAddress = useCallback(
        async (addressChanges: AddressSchemaDTO[]) => {
            return profileApi
                .updateUserAddress({
                    updateUserAddressRequestDTO: {
                        address: addressChanges,
                    },
                })
                .then(() => {
                    refreshProfile();
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },
        [refreshProfile],
    );

    useEffect(() => {
        if (!profileState.profile) {
            dispatch(getProfile());
        }
    }, [dispatch, profileState.profile]);

    return { ...profileState, refreshProfile, updateProfileInfo, updateProfileAddress };
}
