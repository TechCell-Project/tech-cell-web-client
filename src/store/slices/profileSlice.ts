import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { UserMntResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { profileApi } from '@services/ProfileService';

export type ProfileState = {
    profile?: UserMntResponseDTO;
    isLoading: boolean;
};

const initialState: ProfileState = {
    profile: undefined,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        getSuccess: (state, { payload }) => {
            state.profile = payload;
            state.isLoading = false;
        },
        getFailure: (state) => {
            state.profile = undefined;
            state.isLoading = false;
        },
    },
});

export const getProfile = () => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const { status, data } = await profileApi.getProfile();
        if (status >= 200 && status < 300) {
            dispatch(getSuccess(data));
        } else {
            dispatch(getFailure());
        }
    } catch (error) {
        console.error(error);
        dispatch(getFailure());
    }
};

const { actions, reducer } = profileSlice;

export const { isFetching, getSuccess, getFailure } = actions;
export default reducer;
