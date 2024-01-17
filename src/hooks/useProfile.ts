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
        if (profileState?.profile?.address) {
            preLoadAddressDataFromUser(profileState.profile?.address);
        }
    }, [profileState.profile?.address, preLoadAddressDataFromUser]);

    const refreshProfile = useCallback(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const updateProfileInfo = useCallback(
        async (dataChanges: UpdateUserRequestDTO) => {
            const oldUserData = profileState?.profile;
            const changes: Partial<UpdateUserRequestDTO> = {};

            if (dataChanges?.avatarPublicId) {
                if (dataChanges.avatarPublicId !== oldUserData?.avatar?.publicId) {
                    changes.avatarPublicId = dataChanges.avatarPublicId;
                }
            }

            if (oldUserData) {
                for (const key in dataChanges) {
                    if (key in dataChanges && key in oldUserData) {
                        const typedKey = key as keyof Omit<UpdateUserRequestDTO, 'avatarPublicId'>;
                        if (dataChanges[typedKey] !== oldUserData[typedKey]) {
                            changes[typedKey] = dataChanges[typedKey];
                        }
                    }
                }
            }

            if (Object.keys(changes).length === 0) {
                // No changes, no need to call the API
                return true;
            }

            return profileApi
                .updateUserInfo({
                    updateUserRequestDTO: changes,
                })
                .then(() => {
                    refreshProfile();
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },
        [refreshProfile, profileState?.profile],
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
