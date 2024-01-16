import { useAppDispatch, useAppSelector } from '@store/store';
import {
    ProfileState,
    getProfile,
    resetProfile as resetProfileAction,
} from '@store/slices/profileSlice';
import { useCallback, useEffect } from 'react';
import { profileApi } from '@services/ProfileService';
import {
    AddressSchemaDTO,
    UpdateUserRequestDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { useAddress } from '@hooks/useAddress';

type UseProfile = ProfileState & {
    refreshProfile: () => void;
    updateProfileInfo: (dataChanges: UpdateUserRequestDTO) => Promise<boolean>;
    updateProfileAddress: (addressChanges: AddressSchemaDTO[]) => Promise<boolean>;
    resetProfile: () => Promise<void>;
};

/**
 * A hook that provides access to the user's profile data
 *
 * @returns {UseProfile} An object containing the user's profile data
 */
export function useProfile(): UseProfile {
    const dispatch = useAppDispatch();
    const profileState = useAppSelector((state) => state.profile);

    const { preLoadAddressDataFromUser } = useAddress();

    useEffect(() => {
        if (profileState.status === 'idle') {
            dispatch(getProfile());
        }
    }, [dispatch, profileState.status]);

    useEffect(() => {
        if (profileState?.profile) {
            preLoadAddressDataFromUser(profileState.profile);
        }
    }, [profileState.profile, preLoadAddressDataFromUser]);

    const refreshProfile = useCallback(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const updateProfileInfo = useCallback(
        async (dataChanges: UpdateUserRequestDTO) => {
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

    const resetProfile = useCallback(async (): Promise<void> => {
        return dispatch(resetProfileAction());
    }, [dispatch]);

    return {
        ...profileState,
        refreshProfile,
        updateProfileInfo,
        updateProfileAddress,
        resetProfile,
    };
}
