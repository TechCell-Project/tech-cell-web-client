import { AddCartItemModel, CartModel } from '@models/Cart';
import { CART_ENDPOINT } from '@constants/Services';
import { axiosAuth } from '@libs/axios';
import { CartsApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const cartApi = new CartsApi(undefined, undefined, axiosAuth);
export const addToCart = (payload: AddCartItemModel) => axiosAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = () => axiosAuth.get<CartModel>(CART_ENDPOINT);
