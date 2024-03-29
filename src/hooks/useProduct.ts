import { useAppDispatch, useAppSelector } from '@store/store';
import {
    ProductState,
    getListProduct,
    getProductById as getProductByIdAction,
} from '@store/slices/productSlice.v2';
import { useCallback, useEffect } from 'react';

type UseProduct = ProductState & {
    getProductById: (id: string) => Promise<boolean>;
};

export function useProduct(): UseProduct {
    const dispatch = useAppDispatch();
    const productState = useAppSelector((state) => state['product-v2']);

    useEffect(() => {
        if (productState.status === 'idle') {
            dispatch(getListProduct({}));
        }
    }, [dispatch, productState.status]);

    // useEffect(() => {
    //     if (productState.listProducts) {
    //         productState.listProducts.forEach(({ data: products }) =>
    //             products.forEach((product) => {
    //                 dispatch(getProductById(product._id));
    //             }),
    //         );
    //     }
    // }, [dispatch, productState.listProducts]);

    const getProductById = useCallback(
        (id: string, isDetails?: boolean) => {
            return dispatch(getProductByIdAction(id, isDetails));
        },
        [dispatch],
    );

    return { ...productState, getProductById };
}
