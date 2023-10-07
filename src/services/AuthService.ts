import instance from './Instance';
import {
    LOGIN_ENDPOINT,
    REGISTER_ENDPOINT,
    REFRESH_TOKEN_ENDPOINT,
    VERIFY_EMAIL_ENDPOINT,
    FORGOT_PASSWORD,
    VERIFY_FORGOT_PASSWORD,
    ADD_TO_CART
} from '@constants/Services';
import { ILogin, IRegister } from '@interfaces/auth';
import { ForgotPasswordModel, VerifyEmailModel } from 'models';

export const fetchRegister = () => instance.post(REGISTER_ENDPOINT);

export const fetchVerifyEmail = (payload: VerifyEmailModel) =>
    instance.post(VERIFY_EMAIL_ENDPOINT, payload);

export const fetchRefresh = (refreshToken: string) =>
    instance.post(REFRESH_TOKEN_ENDPOINT, { refreshToken });

export const fetchForgotPassword = (email: string) => instance.post(FORGOT_PASSWORD, { email });

export const fetchVerifyForgotPassword = (payload: ForgotPasswordModel) =>
    instance.post(VERIFY_FORGOT_PASSWORD, payload);

export const ftechAddToCart = () => instance.get(ADD_TO_CART);