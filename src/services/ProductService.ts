import { PRODUCTS_ENDPOINT } from '@constants/Services';
import { PagingProduct, ProductModel } from '@models/Product';
import { PagingResponse } from '@models/Common';
import { axiosPublic } from '@libs/axios';

export const getProducts = (payload: PagingProduct) => {
    const { page, pageSize, keyword } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return axiosPublic.get<PagingProduct>(url);
};

export const getProductsPublic = (payload: PagingProduct) => {
    const { page, pageSize, keyword } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}&select_type=only_active`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return axiosPublic.get<PagingResponse<ProductModel>>(url);
};

export const getProductById = (id: string, isDetails?: boolean) => {
    let url = `${PRODUCTS_ENDPOINT}/${id}`;

    if (isDetails) {
        url += `?detail=${isDetails}`;
    }
    return axiosPublic.get<ProductModel>(url);
};
