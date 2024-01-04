import { AddCartItemModel, CartModel } from '@models/Cart';
import { CART_ENDPOINT } from '@constants/Services';
import { axiosAuth } from '@libs/axios';

export const addToCart = (payload: AddCartItemModel) => axiosAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = () => axiosAuth.get<CartModel>(CART_ENDPOINT);
