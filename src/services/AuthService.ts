import instancePublic from '@config/instancePublic.config';
import {
    LOGIN_ENDPOINT,
    REGISTER_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
    VERIFY_EMAIL_ENDPOINT,
    FORGOT_PASSWORD,
    VERIFY_FORGOT_PASSWORD,
    CHANGE_PASSWORD_ENDPOINT,
} from '@constants/Services';
import { ILogin, IRegister } from '@interfaces/auth';
import { AccountChangePass, ForgotPasswordModel, VerifyEmailModel } from 'models';
import instanceAuth from '@config/instanceAuth.config';
import { User } from 'next-auth';
import {
    AuthenticationApi,
    LoginRequestDTO,
    RegisterRequestDTO,
    VerifyEmailRequestDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';

const authSdk = new AuthenticationApi(undefined, undefined, instancePublic);

export function authLogin(data: LoginRequestDTO) {
    return authSdk.login(data);
}

export function authRegister(data: RegisterRequestDTO) {
    return authSdk.register(data);
}

export function authVerifyEmail(payload: VerifyEmailRequestDTO) {
    return authSdk.verifyEmail(payload);
}

export const fetchLogin = (data: ILogin) => instancePublic.post(LOGIN_ENDPOINT, data);

export const fetchRegister = (data: IRegister) => instancePublic.post(REGISTER_ENDPOINT, data);

export const fetchVerifyEmail = (payload: VerifyEmailModel) =>
    instancePublic.post(VERIFY_EMAIL_ENDPOINT, payload);

export const fetchRefresh = (refreshToken: string) =>
    instancePublic.post<User>(REFRESH_TOKEN_ENDPOINT, { refreshToken });

export const fetchForgotPassword = (email: string) =>
    instancePublic.post(FORGOT_PASSWORD, { email });

export const fetchVerifyForgotPassword = (payload: ForgotPasswordModel) =>
    instancePublic.post(VERIFY_FORGOT_PASSWORD, payload);

export const postChangePassword = (payload: AccountChangePass) =>
    instanceAuth.post(CHANGE_PASSWORD_ENDPOINT, payload);
