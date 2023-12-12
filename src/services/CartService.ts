import { AddCartItemModel, CartModel } from '@models/Cart';
import { CART_ENDPOINT } from '@constants/Services';
import { Paging } from '@models/Common';
import instanceAuth from '@config/instanceAuth.config';
import {
    CartsApi,
    AddCartRequestDTO,
    GetCartsXLangEnum,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { AxiosRequestConfig } from 'axios';

const cartSdk = new CartsApi(undefined, undefined, instanceAuth);

export function addToCartSdk(data: AddCartRequestDTO) {
    return cartSdk.addCart(data);
}

export function getCartsSdk(
    page?: number,
    pageSize?: number,
    xLang?: GetCartsXLangEnum,
    options?: AxiosRequestConfig,
) {
    return cartSdk.getCarts(page, pageSize, xLang, options);
}

export const addToCart = (payload: AddCartItemModel) =>
    instanceAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = (payload: Paging) => {
    const { page, pageSize } = payload;

    const url = `${CART_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    return instanceAuth.get<CartModel>(url);
};
