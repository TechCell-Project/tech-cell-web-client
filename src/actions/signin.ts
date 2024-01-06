'use server';

import { LoginRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { signIn } from '@libs/next-auth';
import { isAxiosError } from 'axios';
import { AuthError } from 'next-auth';

type SigninAction = {
    message: string;
    code?: number;
};

/**
 * Logs in a user with the provided credentials.
 *
 * @param {Required<LoginRequestDTO>} values - The login credentials including email/username and password.
 * @return {Promise<SigninAction>} - A promise that resolves with no value.
 */
export async function signinAction(values: Required<LoginRequestDTO>): Promise<SigninAction> {
    const { emailOrUsername, password } = values;

    try {
        await signIn('credentials', {
            emailOrUsername,
            password,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { message: 'Invalid credentials!' };
                case 'CallbackRouteError':
                    if (isAxiosError(error.cause?.err)) {
                        const err = error.cause?.err;
                        console.log(err.response);
                        return { message: err?.message, code: err?.response?.status };
                    }

                    return {
                        message: error.cause?.err?.message ?? 'Unknown error',
                    };
                default:
                    console.error(error);
                    return { message: error.cause?.err?.message ?? 'Unknown error' };
            }
        }
    }

    return { message: 'Success', code: 200 };
}
