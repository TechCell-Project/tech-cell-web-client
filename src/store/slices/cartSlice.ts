import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { AddCartItemModel, CartModel, CartsSlice } from '@models/Cart';
import { Paging } from '@models/Common';
import { addToCart, getCarts } from '@services/index';
import { AxiosInstance } from 'axios';
import { CART_ENDPOINT } from '@constants/Services';

const initialState: CartsSlice = {
    carts: new CartModel(),
    isLoading: false,
    isUpdating: false,
};

export const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        isAddingItem: (state) => {
            state.isUpdating = true;
        },
        getAllSuccess: (state, { payload }) => {
            state.carts = payload;
            state.isLoading = false;
        },
        getAllFailure: (state) => {
            state.carts = new CartModel();
            state.isLoading = false;
        },
        fetchedDone: (state) => {
            state.isLoading = false;
        },
        addedItemDone: (state) => {
            state.isUpdating = false;
        },
    },
});

// Thunk
export const getCartItems = (payload: Paging) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const response = await getCarts(payload);
        if (response.data) {
            dispatch(getAllSuccess(response.data));
        }
    } catch (error) {
        console.log(error);
        dispatch(getAllFailure());
    }
};

export const addItemToCart = (payload: AddCartItemModel) => async (dispatch: Dispatch) => {
    dispatch(isAddingItem());
    try {
        const response = await addToCart(payload);
        if (response.data) {
            return { success: true };
        }
    } catch (error) {
        return { success: false, error };
    } finally {
        dispatch(addedItemDone());
    }
};

export const authAddItemToCart = (payload: AddCartItemModel, instance: AxiosInstance) => async (dispatch: Dispatch) => {
    dispatch(isAddingItem());
    try {
        const response = await instance.post(`${CART_ENDPOINT}`, payload);
        if (response.data) {
            return { success: true };
        }
    } catch (error) {
        return { success: false, error };
    } finally {
        dispatch(addedItemDone());
    }
};

const { actions, reducer } = cartsSlice;

export const {
    isFetching,
    isAddingItem,
    getAllSuccess,
    getAllFailure,
    fetchedDone,
    addedItemDone,
} = actions;

export default reducer;
