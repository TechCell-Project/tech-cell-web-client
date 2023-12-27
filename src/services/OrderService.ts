import instanceAuth from '@config/instanceAuth.config';
import { ORDER_ENDPOINT } from '@constants/Services';
import { PagingResponse } from '@models/Common';
import { OrderCreateRequest, OrderModel, OrderReviewRequest, OrderReviewResponse } from '@models/Order';

export const getUserOrders = () => instanceAuth.get<PagingResponse<OrderModel>>(ORDER_ENDPOINT);

export const reviewOrder = (payload: OrderReviewRequest) =>
    instanceAuth.post<OrderReviewResponse>(`${ORDER_ENDPOINT}/review`, payload);

export const createOrder = (payload: OrderCreateRequest) => 
    instanceAuth.post<OrderModel>(ORDER_ENDPOINT, payload);