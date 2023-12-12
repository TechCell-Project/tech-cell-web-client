import { UserModel } from '@models/Profile';
import { useSwrAuth } from './useSwrAuth';
import { PROFILE_ENDPOINT } from '@constants/Services';
import { ProfileApi } from '@lehuygiang28/tech-cell-server-node-sdk';

export function useUserProfile() {
    return useSwrAuth<UserModel>(PROFILE_ENDPOINT);
}
