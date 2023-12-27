import { PagingResponse } from '@models/Common';
import {
    OrderCreateRequest,
    OrderModel,
    OrderReviewRequest,
    OrderReviewResponse,
    OrderSlice,
} from '@models/Order';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { createOrder, getUserOrders, reviewOrder } from '@services/OrderService';
import { HttpStatusCode } from 'axios';

const initialState: OrderSlice = {
    orders: new PagingResponse<OrderModel>(),
    order: null,
    reviewedOrder: null,
    isLoading: false,
    isLoadingDetails: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        getSuccess: (state, { payload }) => {
            state.orders = payload;
            state.isLoading = false;
        },
        getFailure: (state) => {
            state.orders = new PagingResponse<OrderModel>();
            state.isLoading = false;
        },
        isFetchingDetails: (state) => {
            state.isLoadingDetails = true;
        },
        reviewSuccess: (state, { payload }) => {
            state.reviewedOrder = payload;
        },
        fetchedDetailsDone: (state) => {
            state.isLoadingDetails = false;
        },
    },
});

export const getAllOrder = () => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const { status, data } = await getUserOrders();
        if (status === HttpStatusCode.Ok) {
            dispatch(getSuccess(data));
        }
    } catch {
        dispatch(getFailure());
    }
};

export const reviewCurrentOrder = (payload: OrderReviewRequest) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
        const { status, data } = await reviewOrder(payload);

        if (status === HttpStatusCode.Ok) {
            dispatch(reviewSuccess(data));
            return { success: true };
        }
    } catch (error) {
        dispatch(reviewSuccess(null));
        return { success: false, error };
    } finally {
        dispatch(fetchedDetailsDone());
    }
};

export const createNewOrder = (payload: OrderCreateRequest) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
        const response = await createOrder(payload);

        if (response.data) {
            return { success: true };
        }
    } catch (error) {
        return { success: false, error };
    } finally {
        dispatch(fetchedDetailsDone());
    }
};

const { actions, reducer } = orderSlice;

export const {
    isFetching,
    getSuccess,
    getFailure,
    isFetchingDetails,
    fetchedDetailsDone,
    reviewSuccess,
} = actions;
export default reducer;
