import { ProfileApi } from '@TechCell-Project/tech-cell-server-node-sdk';
import {
    PROFILE_ENDPOINT,
    UPDATE_PROFILE_ADDRESS_ENDPOINT,
    UPDATE_PROFILE_INFO_ENDPOINT,
} from '@constants/Services';
import { axiosAuth } from '@libs/axios';
import { UserAccount } from '@models/Account';
import { ProfileAddressRequest } from '@models/Profile';

export const profileApi = new ProfileApi(undefined, undefined, axiosAuth);

export const getProfile = () => axiosAuth.get<UserAccount>(PROFILE_ENDPOINT);

export const patchProfileInfo = (payload: Partial<UserAccount>) =>
    axiosAuth.patch<UserAccount>(UPDATE_PROFILE_INFO_ENDPOINT, payload);

export const patchProfileAddress = (payload: ProfileAddressRequest) =>
    axiosAuth.patch<UserAccount>(UPDATE_PROFILE_ADDRESS_ENDPOINT, payload);
