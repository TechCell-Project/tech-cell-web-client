import instanceAuth from "@config/instanceAuth.config";
import { PROFILE_ENDPOINT } from "@constants/Services";
import { UserAccount } from "@models/Account";
import { ProfileAddressRequest } from "@models/Profile";

export const getProfile = () => instanceAuth.get<UserAccount>(PROFILE_ENDPOINT);

export const patchProfileInfo = (payload: Partial<UserAccount>) => instanceAuth.patch<UserAccount>(`${PROFILE_ENDPOINT}/info`, payload);

export const patchProfileAddress = (payload: ProfileAddressRequest) => instanceAuth.patch<UserAccount>(`${PROFILE_ENDPOINT}/address`, payload);