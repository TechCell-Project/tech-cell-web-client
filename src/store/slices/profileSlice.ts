import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { UserMntResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { profileApi } from '@services/ProfileService';
import { HttpStatusCode } from 'axios';

export type ProfileState = {
    profile?: UserMntResponseDTO;
    status: 'loading' | 'success' | 'error' | 'idle';
};

const initialState: ProfileState = {
    profile: undefined,
    status: 'idle',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.status = 'loading';
        },
        getSuccess: (state, { payload }) => {
            state.profile = payload;
            state.status = 'success';
        },
        getFailure: (state) => {
            state.profile = undefined;
            state.status = 'error';
        },
        resetProfile: (state) => {
            state.profile = initialState.profile;
            state.status = initialState.status;
        },
    },
});

export const getProfile = () => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const { status, data } = await profileApi.getProfile();
        if (status === HttpStatusCode.Ok) {
            dispatch(getSuccess(data));
        }
    } catch (error) {
        console.error(error);
        dispatch(getFailure());
    }
};

export function resetProfile() {
    return (dispatch: Dispatch) => {
        dispatch(profileSlice.actions.resetProfile());
    };
}

const { actions, reducer } = profileSlice;

export const { isFetching, getSuccess, getFailure } = actions;
export default reducer;
