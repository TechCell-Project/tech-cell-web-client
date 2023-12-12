import { useSwrAuth } from './useSwrAuth';
import { CART_ENDPOINT } from '@constants/Services';
import { AddCartItemModel, CartModel } from '@models/Cart';
import { useAxiosAuth } from './useAxiosAuth';

export function useCart() {
    const useAxios = useAxiosAuth();
    const swrCart = useSwrAuth<CartModel>(CART_ENDPOINT);

    const updateCart = async (cart: AddCartItemModel) => {
        const { data } = await useAxios.post<CartModel>(CART_ENDPOINT, cart);
        swrCart.mutate(data);
        return data;
    };

    const refreshCart = async () => {
        return swrCart.mutate();
    };

    return { ...swrCart, updateCart, refreshCart };
}
