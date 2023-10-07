import { IAuthSlice, ICart, ILogin, IRegister } from '@interfaces/auth';
import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VerifyEmailModel } from 'models';
import { fetchLogin, fetchRegister, fetchVerifyEmail, ftechAddToCart } from 'services/AuthService';

export const logIn = createAsyncThunk('auth/login', async(loginData: ILogin, { rejectWithValue }) => {
    try {
        const response = await fetchLogin(loginData);
        if (response.data) {
            console.log(response.data);
            
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error: any) {
        if (error.response?.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
});

export const addToCart = createAsyncThunk('auth/carts', async (cartData:ICart, { rejectWithValue }) => {
    try {
      const response = await ftechAddToCart();
      return response.data
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  });

// export const register = createAsyncThunk('auth/register', async(registerData: IRegister, { rejectWithValue }) => {
//     try {
//         const response = await fetchRegister(registerData);
//         if (response.data) {
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

export const verifyEmail = createAsyncThunk('auth/verify-email', async(verifyData: VerifyEmailModel, { rejectWithValue }) => {
    try {
        await fetchVerifyEmail(verifyData);
    } catch (error: any) {
        if (error.response?.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        else {
            return rejectWithValue(error.message);
        }
    }
});



const initialState: IAuthSlice = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isError: false,
    message: '',
    item:[],
    status:null,
}

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                if (action.payload) {
                    state.message = action.payload as string;
                }

            })
            // .addCase(register.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(register.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.user = null;
            //     state.message = action.payload;
            // })
            // .addCase(register.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.isAuthenticated = false;
            //     if (action.error.message) {
            //         state.message = action.error.message;
            //     }
            //     else {
            //         state.message = 'Hệ thống có lỗi xảy ra';
            //     }
            // })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isAuthenticated = false;
                state.user = null;
                state.message = 'Xác thực thành công';
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                if (action.error.message) {
                    state.message = action.error.message;
                }
                else {
                    state.message = 'Hệ thống có lỗi xảy ra';
                }
            })

            
            .addCase(addToCart.pending,(state) =>{
                state.isLoading =true
            })
            .addCase(addToCart.fulfilled,(state,action) =>{
                state.item = action.payload;
                state.message = 'fulfilled';
            })
            .addCase(addToCart.rejected,(state) =>{
                state.message = 'fulfilled';
            })
    }
});

export const authenticate = () => async (dispatch: Dispatch) => {
    if (localStorage.getItem("user")) {
      dispatch(authenticatedSuccess());
    }
  };

export const logOut = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("user");
    dispatch(logout());
}

export const { logout, authenticatedSuccess } = authSlice.actions;
export default authSlice.reducer;