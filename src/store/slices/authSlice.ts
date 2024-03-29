import { ProfileAddressRequest } from '@models/Profile';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getProfile, patchProfileAddress, patchProfileInfo } from '@services/ProfileService';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { fetchLogin, fetchRegister, fetchResendVerify, fetchVerifyEmail } from 'services/index';
import { AuthSlice, RegisterModel, VerifyEmailModel } from '@models/Auth';
import { UserAccount } from '@models/Account';

const initialState: AuthSlice = {
    user: null,
    isLoading: false,
    isLoadingProfile: false,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isHandling: (state) => {
            state.isLoading = true;
        },
        logout: () => {
            return initialState;
        },
        isAuthenticated: (state, { payload }: PayloadAction<UserAccount>) => {
            state.user = payload;
            state.isAuthenticated = true;
        },
        isLoadingProfile: (state) => {
            state.isLoadingProfile = true;
        },
        doneHandled: (state) => {
            state.isLoading = false;
        },
        loadedProfile: (state) => {
            state.isLoadingProfile = false;
        },
        getUserSuccess: (state, { payload }) => {
            state.user = payload;
            state.isLoadingProfile = false;
            state.isAuthenticated = true;
        },
    },
});

export const authenticate = (user: UserAccount) => async (dispatch: Dispatch) => {
    dispatch(isAuthenticated(user));
};

export const logOut = () => async (dispatch: Dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
};

export const registerNewUser = (payload: RegisterModel) => async (dispatch: Dispatch) => {
    dispatch(isHandling());
    try {
        const { data } = await fetchRegister(payload);
        if (data) {
            dispatch(doneHandled());
            toast.success('Đăng ký thành công, mã xác nhận đã được gửi vào email của bạn!');
            return { success: true };
        }
    } catch (error) {
        console.log(error);
        dispatch(doneHandled());
        if (isAxiosError(error)) {
            if (error.response && error.response.status === 422) {
                toast.error('Đăng ký thất bại. Tài khoản đã tồn tại');
            } else if (error.response && error.response.status === 404) {
                toast.error('Đăng ký thất bại. Không tìm thấy email');
            } else {
                toast.error('Có lỗi xảy ra. Hãy kiểm tra lại thông tin đăng ký');
            }
        }
    }
};

export const verifyEmail = (payload: VerifyEmailModel) => async (dispatch: Dispatch) => {
    dispatch(isHandling());
    try {
        const { status } = await fetchVerifyEmail(payload);

        if (status === 200) {
            toast.success(
                'Xác thực email thành công! Hãy đăng nhập để có thể mua sắm cùng TechCell!',
            );
            return { success: true };
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                toast.error('Xác thực thất bại. Không tìm thấy email');
            } else if (error.response && error.response.status === 409) {
                toast.warn('Email đã được xác thực');
            } else {
                toast.error('Form xác thực không hợp lệ');
            }
        }
    } finally {
        dispatch(doneHandled());
    }
};

export const resendVerifyEmail =
    (payload: Omit<VerifyEmailModel, 'otpCode'>) => async (dispatch: Dispatch) => {
        dispatch(isHandling());
        try {
            const { status } = await fetchResendVerify(payload);
            if (status === 200) {
                toast.success('Mã xác thực đã được gửi tới email của bạn. Xin vui lòng kiểm tra');
                return { success: true };
            }
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                if (error.response && error.response.status === 404) {
                    toast.error('Gửi mã xác thực thất bại. Không tìm thấy email');
                } else if (error.response && error.response.status === 422) {
                    toast.warn('Email đã được xác thực');
                } else {
                    toast.error('Có lỗi xảy ra.');
                }
            }
        } finally {
            dispatch(doneHandled);
        }
    };

export const getCurrentUser = () => async (dispatch: Dispatch) => {
    dispatch(isLoadingProfile());
    try {
        const response = await getProfile();
        if (response.data) {
            dispatch(getUserSuccess(response.data));
            return { success: true };
        }
    } catch (error) {
        console.log(error);
        return { success: false, error };
    } finally {
        dispatch(loadedProfile());
    }
};

export const editProfileAddress =
    (payload: ProfileAddressRequest) => async (dispatch: Dispatch) => {
        try {
            const { status } = await patchProfileAddress(payload);
            if (status === 200) {
                return { success: true };
            }
        } catch (error) {
            return { success: false, error };
        }
    };

export const editProfileInfo = (payload: Partial<UserAccount>) => async (dispatch: Dispatch) => {
    try {
        const { status } = await patchProfileInfo(payload);
        if (status === HttpStatusCode.Ok) {
            toast.success('Cập nhật thông tin hồ sơ thành công!');
            return { success: true };
        }
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
                toast.error('Cập nhật thông tin hồ sơ thất bại!');
            }
        }
        return { success: false, error };
    }
};

const { actions, reducer } = authSlice;

export const {
    isHandling,
    logout,
    isAuthenticated,
    doneHandled,
    isLoadingProfile,
    loadedProfile,
    getUserSuccess,
} = actions;

export default reducer;
