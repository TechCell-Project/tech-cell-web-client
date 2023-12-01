import { AddCartItemModel, CartModel } from "@models/Cart";
import { CART_ENDPOINT } from "@constants/Services";
import { Paging } from "@models/Common";
import instanceAuth from "@config/instanceAuth.config";

export const addToCart = (payload: AddCartItemModel) =>
    instanceAuth.post(`${CART_ENDPOINT}`, payload);

export const getCarts = (payload: Paging) => {
    const { page, pageSize } = payload;

    const url = `${CART_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    return instanceAuth.get<CartModel>(url);
}