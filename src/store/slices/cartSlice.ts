import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
    AddCartRequestDTO,
    CartDTO,
    DeleteProductsCartRequestDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { cartApi } from '@services/CartService';
import { isStatusSuccess } from '@utils/shared.util';

export type CartState = {
    carts?: CartDTO;
    status: 'loading' | 'success' | 'error';
};

const initialState: CartState = {
    carts: undefined,
    status: 'loading',
};

export const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        setStatus: (state, { payload }: PayloadAction<Pick<CartState, 'status'>>) => {
            state.status = payload.status;
        },
        setCart: (state, { payload }: PayloadAction<Pick<CartState, 'carts'>>) => {
            state.carts = payload.carts;
        },
    },
});

// Thunk
export const getCart = () => async (dispatch: Dispatch) => {
    dispatch(setStatus({ status: 'loading' }));
    try {
        const { data } = await cartApi.getCarts();
        if (data) {
            dispatch(setCart({ carts: data }));
            dispatch(setStatus({ status: 'success' }));
        }
    } catch (error) {
        dispatch(setStatus({ status: 'error' }));
    }
};

export const addItemToCart = (addCartData: AddCartRequestDTO) => async (dispatch: Dispatch) => {
    try {
        const { status } = await cartApi.addCart({
            addCartRequestDTO: addCartData,
        });
        if (!isStatusSuccess(status)) {
            return false;
        }
        // refresh data
        getCart()(dispatch);
        return true;
    } catch (error) {
        return false;
    }
};

export function deleteProductCart(deleteCartData: DeleteProductsCartRequestDTO) {
    return async (dispatch: Dispatch) => {
        try {
            const { status } = await cartApi.deleteProductsCart({
                deleteProductsCartRequestDTO: deleteCartData,
            });
            if (!isStatusSuccess(status)) {
                return false;
            }
            // refresh data
            getCart()(dispatch);
            return true;
        } catch (error) {
            return false;
        }
    };
}

const { actions, reducer } = cartsSlice;
export const { setStatus, setCart } = actions;
export default reducer;
