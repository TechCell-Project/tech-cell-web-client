import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createOrder, orderApi, reviewOrder } from '@services/OrderService';
import { CASE_ORDERS_FETCH, CASE_ORDER_CANCEL, CASE_ORDER_NEW_PAYMENT_URL } from '@/constants';
import { getErrorMsg } from '@/utils';
import {
    ListUserOrderResponseDTO,
    OrderSchemaDTO,
    OrdersApiCancelOrderRequest,
    OrdersApiGetPaymentUrlRequest,
    OrdersApiGetUserOrdersRequest,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { PagingResponse } from '@models/Common';
import {
    OrderCreateRequest,
    OrderModel,
    OrderReviewRequest,
    OrderReviewResponse,
    OrderSlice,
} from '@models/Order';
import { HttpStatusCode, isAxiosError } from 'axios';
import { toast } from 'react-toastify';

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
        getDetailSuccess: (state, { payload }: PayloadAction<OrderModel | OrderSchemaDTO>) => {
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
    (requests: OrdersApiGetUserOrdersRequest) => async (dispatch: Dispatch) => {
        dispatch(isFetching());
        try {
            const { status, data } = await orderApi.getUserOrders({ ...requests });
            if (status === HttpStatusCode.Ok) {
                dispatch(getSuccess(data));
                return { success: true };
            }
        } catch (error) {
            dispatch(getFailure());
            let status = 404;
            if (isAxiosError(error) && error.response) {
                toast.error(getErrorMsg(error.response.status, CASE_ORDERS_FETCH));
                status = error.response?.status ?? 404;
            }
            return { success: false, errorCode: status };
        }
    };

export const getOrder = (id: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
        const { status, data } = await orderApi.getUserOrderId({ id });
        if (status === HttpStatusCode.Ok) {
            dispatch(getDetailSuccess(data));
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
            return { success: true, paymentUrl: response.data.paymentOrder?.paymentUrl };
        }
    } catch (error) {
        return { success: false, error };
    } finally {
        dispatch(isFetchedDone());
    }
};

export const newPaymentUrl =
    (requests: OrdersApiGetPaymentUrlRequest) => async (dispatch: Dispatch) => {
        dispatch(isFetchingDetails());
        try {
            const { status, data } = await orderApi.getPaymentUrl({ ...requests });

            if (status === HttpStatusCode.Ok) {
                dispatch(getDetailSuccess(data as unknown as OrderModel));
                return { success: true };
            }
        } catch (error) {
            let status = 400;
            if (isAxiosError(error) && error.response) {
                toast.error(getErrorMsg(error.response.status, CASE_ORDER_NEW_PAYMENT_URL));
                status = error.response.status;
            }
            dispatch(getDetailFailure());
            return { success: false, statusCode: status };
        }
    };

export const cancelAnOrder = (requests: OrdersApiCancelOrderRequest) => async () => {
    try {
        const { status } = await orderApi.cancelOrder({ ...requests });

        if (status === HttpStatusCode.Ok) {
            toast.success('Đã hủy đơn hàng thành công');
            return { success: true };
        }
    } catch (error) {
        let status = 400;
        if (isAxiosError(error) && error.response) {
            toast.error(getErrorMsg(error.response.status, CASE_ORDER_CANCEL));
            status = error.response.status;
        }
        return { success: false, statusCode: status };
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
