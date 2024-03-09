import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { PagingProduct, ProductModel, ProductSlice } from '@models/Product';
import { PagingResponse } from '@models/Common';

import { getProductById, getProductsPublic } from '@services/index';

const initialState: ProductSlice = {
    products: new PagingResponse<ProductModel>(),
    product: null,
    isLoading: false,
    isLoadingDetails: false,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        isFetchingDetails: (state) => {
            state.isLoadingDetails = true;
        },
        getAllSuccess: (state, { payload }: PayloadAction<PagingResponse<ProductModel>>) => {
            state.products = payload;
            state.isLoading = false;
        },
        getAllFailure: (state) => {
            state.products = new PagingResponse<ProductModel>();
            state.isLoading = false;
        },
        getDetailsSuccess: (state, { payload }: PayloadAction<ProductModel>) => {
            state.product = payload;
            state.isLoadingDetails = false;
        },
        getDetailsFailure: (state) => {
            state.product = null;
            state.isLoadingDetails = false;
        },
        fetchedDone: (state) => {
            state.isLoading = false;
        },
        fetchedDetailsDone: (state) => {
            state.isLoadingDetails = false;
        },
    },
});

//Thunk
export const getAllProduct = (payload: PagingProduct) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const response = await getProductsPublic(payload);
        if (response.data) {
            dispatch(getAllSuccess(response.data));
        }
    } catch (error) {
        console.log(error);
        dispatch(getAllFailure());
    } finally {
        dispatch(fetchedDone());
    }
};

export const getDetailsProduct =
    (id: string, isDetails: boolean = true) =>
    async (dispatch: Dispatch) => {
        dispatch(isFetchingDetails());
        try {
            const response = await getProductById(id, isDetails);
            if (response.data) {
                dispatch(getDetailsSuccess(response.data));
            }
        } catch (error) {
            dispatch(getDetailsFailure());
        } finally {
            dispatch(fetchedDetailsDone());
        }
    };

const { actions, reducer } = productSlice;

export const {
    isFetching,
    fetchedDone,
    fetchedDetailsDone,
    getAllSuccess,
    getAllFailure,
    isFetchingDetails,
    getDetailsSuccess,
    getDetailsFailure,
} = actions;
export default reducer;
