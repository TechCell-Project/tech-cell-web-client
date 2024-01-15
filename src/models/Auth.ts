import { UserAccount } from './Account';
import { UpdateUserRequestDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

export class LoginModel {
    emailOrUsername?: string;
    password?: string;
}

export class RegisterModel {
    userName?: string | null = null;
    password?: string | null = null;
    re_password?: string | null = null;
    email?: string | null = null;
    firstName?: string | null = null;
    lastName?: string | null = null;
}

export class ProfileUpdateRequest implements UpdateUserRequestDTO {}

export class VerifyEmailModel {
    email?: string = '';
    otpCode?: string = '';
}

export class ForgotPasswordModel {
    email?: string | null = null;
    otpCode?: string | null = null;
    password?: string | null = null;
    re_password?: string | null = null;
}

export class AccountChangePass {
    oldPassword?: string = '';
    newPassword?: string = '';
    reNewPassword?: string = '';
}

export class AuthSlice {
    user: UserAccount | null = new UserAccount();
    isLoading: boolean = false;
    isLoadingProfile: boolean = false;
    isAuthenticated: boolean = false;
}
