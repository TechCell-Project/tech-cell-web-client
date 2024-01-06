import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
    ListProductResponseDTO,
    ProductDTO,
    ProductsApiGetProductsRequest,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { productApi } from '@services/ProductService';

export type ProductState = {
    status: 'loading' | 'success' | 'error';
    products: Record<string, ProductDTO>;
    listProducts: Record<string, ListProductResponseDTO>;
};

const initialState: ProductState = {
    status: 'loading',
    products: {},
    listProducts: {},
};

export const productSlice = createSlice({
    name: 'product-v2',
    initialState,
    reducers: {
        setStatus: (state, { payload }: PayloadAction<Pick<ProductState, 'status'>>) => {
            state.status = payload.status;
        },
        setProduct: (state, { payload }: PayloadAction<ProductDTO>) => {
            state.products[payload._id] = payload;
        },
        setListProduct: (
            state,
            { payload }: PayloadAction<{ key: string; data: ListProductResponseDTO }>,
        ) => {
            state.listProducts[payload.key] = payload.data;
        },
    },
});

// Thunk
export const getProductById =
    (id: string, isDetails = true) =>
    async (dispatch: Dispatch) => {
        dispatch(setStatus({ status: 'loading' }));
        return productApi
            .getProductById({
                productId: id,
                detail: isDetails,
            })
            .then((res) => {
                if (!res.data) {
                    return false;
                }

                dispatch(setProduct(res.data));
                dispatch(setStatus({ status: 'success' }));
                return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch(setStatus({ status: 'error' }));
                return false;
            });
    };

export const getListProduct =
    (requests?: ProductsApiGetProductsRequest) => async (dispatch: Dispatch) => {
        dispatch(setStatus({ status: 'loading' }));
        return productApi
            .getProducts({ ...requests })
            .then((res) => {
                if (res.data) {
                    const key = JSON.stringify(requests);
                    dispatch(setListProduct({ key, data: res.data }));
                    dispatch(setStatus({ status: 'success' }));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(setStatus({ status: 'error' }));
            });
    };

const { actions, reducer } = productSlice;
export const { setStatus, setProduct, setListProduct } = actions;
export default reducer;
