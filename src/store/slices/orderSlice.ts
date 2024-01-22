import {
    ListUserOrderResponseDTO,
    OrderApiGetUserOrdersRequest,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { PagingResponse } from '@models/Common';
import {
    OrderCreateRequest,
    OrderModel,
    OrderReviewRequest,
    OrderReviewResponse,
    OrderSlice,
} from '@models/Order';
import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createOrder, getUserOrders, orderApi, reviewOrder } from '@services/OrderService';
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
        getSuccess: (state, { payload }: PayloadAction<ListUserOrderResponseDTO>) => {
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
        getDetailSuccess: (state, { payload }: PayloadAction<OrderModel>) => {
            state.order = payload;
            state.isLoadingDetails = false;
        },
        getDetailFailure: (state) => {
            state.order = null;
            state.isLoadingDetails = false;
        },
        reviewSuccess: (state, { payload }: PayloadAction<OrderReviewResponse>) => {
            state.reviewedOrder = payload;
            state.isLoadingDetails = false;
        },
        reviewFailure: (state) => {
            state.reviewedOrder = null;
            state.isLoadingDetails = false;
        },
        isFetchedDone: (state) => {
            state.isLoading = false;
            state.isLoadingDetails = false;
        },
    },
});

export const getAllOrder =
    (requests: OrderApiGetUserOrdersRequest) => async (dispatch: Dispatch) => {
        dispatch(isFetching());
        try {
            const { status, data } = await orderApi.getUserOrders({ ...requests });
            if (status === HttpStatusCode.Ok) {
                dispatch(getSuccess(data));
            }
        } catch {
            dispatch(getFailure());
        }
    };

export const getOrder = (id: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
        const { status, data } = await orderApi.getUserOrderId({ id });
        if (status === HttpStatusCode.Ok) {
            dispatch(getDetailSuccess(data as unknown as OrderModel));
        }
    } catch (error) {
        dispatch(getDetailFailure());
        console.log(error);
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
        dispatch(reviewFailure());
        return { success: false, error };
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
        dispatch(isFetchedDone());
    }
};

const { actions, reducer } = orderSlice;

export const {
    isFetching,
    getSuccess,
    getFailure,
    isFetchingDetails,
    getDetailSuccess,
    getDetailFailure,
    reviewSuccess,
    reviewFailure,
    isFetchedDone,
} = actions;
export default reducer;
