import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
    AddCartRequestDTO,
    CartDTO,
    DeleteProductsCartRequestDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { cartApi } from '@services/CartService';
import { isStatusSuccess } from '@utils/shared.util';
import { isAxiosError } from 'axios';

export type CartState = {
    carts?: CartDTO;
    status: 'loading' | 'success' | 'error' | 'idle';
};

const initialState: CartState = {
    carts: undefined,
    status: 'idle',
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
        resetCart: (state) => {
            state.carts = initialState.carts;
            state.status = initialState.status;
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
        if (isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                dispatch(setStatus({ status: 'success' }));
            }
        }
    }
};

export const addItemToCart = (addCartData: AddCartRequestDTO) => async (dispatch: Dispatch) => {
    dispatch(setStatus({ status: 'loading' }));
    try {
        const { status } = await cartApi.addCart({
            addCartRequestDTO: addCartData,
        });
        if (!isStatusSuccess(status)) {
            return false;
        }
        // refresh data
        getCart()(dispatch);
        dispatch(setStatus({ status: 'success' }));
        return true;
    } catch (error) {
        dispatch(setStatus({ status: 'error' }));
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

export function resetCart() {
    return (dispatch: Dispatch) => {
        dispatch(cartsSlice.actions.resetCart());
    };
}

const { actions, reducer } = cartsSlice;
export const { setStatus, setCart } = actions;
export default reducer;
