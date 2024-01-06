import { AddCartItemModel, CartModel } from '@models/Cart';
import { CART_ENDPOINT } from '@constants/Services';
import { Paging } from '@models/Common';
import { axiosAuth } from '@libs/axios';
import { CartsApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const cartApi = new CartsApi(undefined, undefined, axiosAuth);
export const addToCart = (payload: AddCartItemModel) => axiosAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = (payload: Paging) => {
    const { page, pageSize } = payload;

    const url = `${CART_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    return axiosAuth.get<CartModel>(url);
};
