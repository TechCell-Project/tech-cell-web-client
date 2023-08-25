import instance from './Instance';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT, REFRESH_TOKEN_ENDPOINT, VERIFY_EMAIL_ENDPOINT } from '@constants/Services';
import { ILogin, IRegister, IVerifyEmail } from '@interfaces/auth';

export const fetchLogin = (payload: ILogin) => 
    instance.post(LOGIN_ENDPOINT, payload);

export const fetchRegister = (payload: IRegister) => 
    instance.post(REGISTER_ENDPOINT, payload);

export const fetchVerifyEmail = (payload: IVerifyEmail) =>
    instance.post(VERIFY_EMAIL_ENDPOINT, payload);

export const fetchRefresh = (refreshToken: string) =>
    instance.post(REFRESH_TOKEN_ENDPOINT, { refreshToken });
