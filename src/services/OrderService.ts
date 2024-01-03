import { axiosAuth } from '@libs/axios';
import { ORDER_ENDPOINT } from '@constants/Services';
import { PagingResponse } from '@models/Common';
import {
    OrderCreateRequest,
    OrderModel,
    OrderReviewRequest,
    OrderReviewResponse,
} from '@models/Order';

export const getUserOrders = () => axiosAuth.get<PagingResponse<OrderModel>>(ORDER_ENDPOINT);

export const reviewOrder = (payload: OrderReviewRequest) =>
    axiosAuth.post<OrderReviewResponse>(`${ORDER_ENDPOINT}/review`, payload);

export const createOrder = (payload: OrderCreateRequest) =>
    axiosAuth.post<OrderModel>(ORDER_ENDPOINT, payload);
