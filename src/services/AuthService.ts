import {
    LOGIN_ENDPOINT,
    REGISTER_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
    VERIFY_EMAIL_ENDPOINT,
    FORGOT_PASSWORD,
    VERIFY_FORGOT_PASSWORD,
    CHANGE_PASSWORD_ENDPOINT,
    RESEND_VERIFY_ENDPOINT,
} from '@constants/Services';
import { ILogin, IRegister } from '@interfaces/auth';
import { AccountChangePass, ForgotPasswordModel, VerifyEmailModel } from 'models';
import { User } from 'next-auth';
import { axiosAuth, axiosPublic } from '@libs/axios';

export const fetchLogin = (data: ILogin) => axiosPublic.post(LOGIN_ENDPOINT, data);

export const fetchRegister = (data: IRegister) => axiosPublic.post(REGISTER_ENDPOINT, data);

export const fetchVerifyEmail = (payload: VerifyEmailModel) =>
    axiosPublic.post(VERIFY_EMAIL_ENDPOINT, payload);

export const fetchResendVerify = (payload: Omit<VerifyEmailModel, 'otpCode'>) =>
    axiosPublic.post(RESEND_VERIFY_ENDPOINT, payload);

export const fetchRefresh = (refreshToken: string) =>
    axiosPublic.post<User>(REFRESH_TOKEN_ENDPOINT, { refreshToken });

export const fetchForgotPassword = (email: string) => axiosPublic.post(FORGOT_PASSWORD, { email });

export const fetchVerifyForgotPassword = (payload: ForgotPasswordModel) =>
    axiosPublic.post(VERIFY_FORGOT_PASSWORD, payload);

export const postChangePassword = (payload: AccountChangePass) =>
    axiosAuth.post(CHANGE_PASSWORD_ENDPOINT, payload);
