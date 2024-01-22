import { axiosAuth } from '@libs/axios';
import { ORDER_ENDPOINT, REVIEW_ORDER_ENDPOINT } from '@constants/Services';
import { PagingResponse } from '@models/Common';
import {
    OrderCreateRequest,
    OrderModel,
    OrderReviewRequest,
    OrderReviewResponse,
} from '@models/Order';
import { OrderApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const orderApi = new OrderApi(undefined, undefined, axiosAuth);

export const getUserOrders = () => axiosAuth.get<PagingResponse<OrderModel>>(ORDER_ENDPOINT);

export const reviewOrder = (payload: OrderReviewRequest) =>
    axiosAuth.post<OrderReviewResponse>(REVIEW_ORDER_ENDPOINT, payload);

export const createOrder = (payload: OrderCreateRequest) =>
    axiosAuth.post<OrderModel>(ORDER_ENDPOINT, payload);
