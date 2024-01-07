import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';

import {
    AddCartRequestDTO,
    DeleteProductsCartRequestDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import {
    CartState,
    getCart,
    addItemToCart as addItemToCartAction,
    deleteProductCart as deleteProductCartAction,
    resetCart as resetCartAction,
} from '@store/slices/cartSlice';

type UseCart = CartState & {
    refreshCart: () => void;
    addItemToCart: (addCartData: AddCartRequestDTO) => Promise<boolean>;
    deleteProductCart: (deleteCartData: DeleteProductsCartRequestDTO) => Promise<boolean>;
    resetCart: () => Promise<void>;
};

/**
 * A hook that provides access to the user's profile data
 *
 * @returns {UseCart} An object containing the user's profile data
 */
export function useCart(): UseCart {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector((state) => state.carts);

    useEffect(() => {
        if (cartState.status === 'idle') {
            dispatch(getCart());
        }
    }, [dispatch, cartState.status]);

    const refreshCart = useCallback(() => {
        dispatch(getCart());
    }, [dispatch]);

    const addItemToCart = useCallback(
        async (addCartData: AddCartRequestDTO): Promise<boolean> => {
            const result = await dispatch(addItemToCartAction(addCartData));
            return result;
        },
        [dispatch],
    );

    const deleteProductCart = useCallback(
        async (deleteCartData: DeleteProductsCartRequestDTO): Promise<boolean> => {
            const result = await dispatch(deleteProductCartAction(deleteCartData));
            return result;
        },
        [dispatch],
    );

    const resetCart = useCallback(async (): Promise<void> => {
        return dispatch(resetCartAction());
    }, [dispatch]);

    return { ...cartState, refreshCart, addItemToCart, deleteProductCart, resetCart };
}
