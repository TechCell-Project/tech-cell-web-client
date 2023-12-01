import { toastConfig } from '@constants/ToastMsgConfig';
//import { ILogin } from '@interfaces/auth';
import { ProfileAddressRequest } from '@models/Profile';
import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProfile, patchProfileAddress } from '@services/ProfileService';
import { HttpStatusCode } from 'axios';
import { AuthSlice, UserAccount, VerifyEmailModel } from 'models';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { fetchLogin, fetchVerifyEmail } from 'services/index';

// export const logIn = createAsyncThunk('auth/login', async(loginData: ILogin, { rejectWithValue }) => {
//     try {
//         const response = await fetchLogin(loginData);
//         if (response.data) {
//             console.log(response.data);

//             localStorage.setItem("user", JSON.stringify(response.data));
//             return response.data;
//         }
//     } catch (error: any) {
//         if (error.response?.data.message) {
//             return rejectWithValue(error.response.data.message);
//         }
//         else {
//             return rejectWithValue(error.message);
//         }
//     }
// });

// export const addToCart = createAsyncThunk('auth/carts', async (cartData:ICart, { rejectWithValue }) => {
//     try {
//       const response = await fetchAddToCart();
//       return response.data
//     } catch (error:any) {
//       return rejectWithValue(error.message);
//     }
//   });

// export const register = createAsyncThunk('auth/register', async(registerData: IRegister, { rejectWithValue }) => {
//     try {
//       const response = await fetchAddToCart();
//       return response.data
//     } catch (error:any) {
//       return rejectWithValue(error.message);
//     }
//   });

export const verifyEmail = createAsyncThunk(
    'auth/verify-email',
    async (verifyData: VerifyEmailModel, { rejectWithValue }) => {
        try {
            await fetchVerifyEmail(verifyData);
        } catch (error: any) {
            if (error.response?.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

const initialState: AuthSlice = {
    user: new UserAccount(),
    isLoading: false,
    isLoadingProfile: false,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        authenticatedSuccess: (state) => {
            state.isLoading = false;
            state.isAuthenticated = true;
        },
        isLoadingProfile: (state) => {
            state.isLoadingProfile = true;
        },
        loadedProfile: (state) => {
            state.isLoading = false;
        },
        getUserSuccess: (state, { payload }) => {
            state.user = payload;
            state.isLoadingProfile = false;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
         builder
    //         .addCase(logIn.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(logIn.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.isError = false;
    //             state.isAuthenticated = true;
    //             state.user = action.payload;
    //         })
    //         .addCase(logIn.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.isError = true;
    //             state.isAuthenticated = false;
    //             if (action.payload) {
    //                 state.message = action.payload as string;
    //             }

    //         })
    //         // .addCase(register.pending, (state) => {
    //         //     state.isLoading = true
    //         // })
    //         // .addCase(register.fulfilled, (state, action) => {
    //         //     state.isLoading = false;
    //         //     state.isError = false;
    //         //     state.user = null;
    //         //     state.message = action.payload;
    //         // })
    //         // .addCase(register.rejected, (state, action) => {
    //         //     state.isLoading = false;
    //         //     state.isError = true;
    //         //     state.isAuthenticated = false;
    //         //     if (action.error.message) {
    //         //         state.message = action.error.message;
    //         //     }
    //         //     else {
    //         //         state.message = 'Hệ thống có lỗi xảy ra';
    //         //     }
    //         // })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })

    //         // .addCase(addToCart.pending,(state) =>{
    //         //     state.isLoading =true
    //         // })
    //         // .addCase(addToCart.fulfilled,(state,action) =>{
    //         //     state.item = action.payload;
    //         //     state.message = 'fulfilled';
    //         // })
    //         // .addCase(addToCart.rejected,(state) =>{
    //         //     state.message = 'fulfilled';
    //         // })
    //         // .addCase(addToCart.pending,(state) =>{
    //         //     state.isLoading =true
    //         // })
    //         // .addCase(addToCart.fulfilled,(state,action) =>{
    //         //     state.item = action.payload;
    //         //     state.message = 'fulfilled';
    //         // })
    //         // .addCase(addToCart.rejected,(state) =>{
    //         //     state.message = 'fulfilled';
    //         // })
    }
});

export const authenticate = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem('user')) {
        dispatch(authenticatedSuccess());
    }
};

export const logOut = () => async (dispatch: Dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
};

export const getCurrentUser = () => async (dispatch: Dispatch) => {
    dispatch(isLoadingProfile());
    try {
        const session = await getSession();
        const { status, data } = await getProfile();
        if (status === HttpStatusCode.Ok) {
            const extendsUser: UserAccount = {
                ...data,
                accessToken: String(session?.user.accessToken),
                refreshToken: String(session?.user.refreshToken),
            };
            dispatch(getUserSuccess(extendsUser));
        }
    } catch {
        dispatch(loadedProfile());
    }
};

export const editProfileAddress =
    (payload: ProfileAddressRequest) => async (dispatch: Dispatch) => {
        try {
            const { status } = await patchProfileAddress(payload);
            if (status === 200) {
                toast.success('Cập nhật địa chỉ hồ sơ thành công!', toastConfig);
                return { success: true };
            }
        } catch (error) {
            toast.error('Cập nhật địa chỉ hồ sơ thất bại!', toastConfig);
            return { success: false, error };
        }
    };

const { actions, reducer } = authSlice;

export const { logout, authenticatedSuccess, isLoadingProfile, loadedProfile, getUserSuccess } = actions;

export default reducer;