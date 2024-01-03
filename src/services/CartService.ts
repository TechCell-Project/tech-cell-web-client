import { AddCartItemModel, CartModel } from '@models/Cart';
import { CART_ENDPOINT } from '@constants/Services';
import { Paging } from '@models/Common';
import { axiosAuth } from '@libs/axios';

export const addToCart = (payload: AddCartItemModel) => axiosAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = (payload: Paging) => {
    const { page, pageSize } = payload;

    const url = `${CART_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    return axiosAuth.get<CartModel>(url);
};
