import { PRODUCTS_ENDPOINT } from '@constants/Services';
import { PagingProduct, ProductModel } from '@models/Product';
import { PagingResponse } from '@models/Common';
import { axiosPublic } from '@libs/axios';
import { ProductsApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const productApi = new ProductsApi(undefined, undefined, axiosPublic);

export const getProducts = (payload: PagingProduct) => {
    const { page, pageSize, keyword } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return axiosPublic.get<PagingProduct>(url);
};

export const getProductsPublic = (payload: PagingProduct) => {
    const { page, pageSize, keyword, select_type, category } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}&select_type=${
        select_type ?? 'only_active'
    }`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    if (category) {
        url += `&category=${category}`;
    }

    return axiosPublic.get<PagingResponse<ProductModel>>(url);
};

export const getProductById = (id: string, isDetails?: boolean) => {
    let url = `${PRODUCTS_ENDPOINT}/${id}`;
    url += `?detail=${isDetails ?? true}`;

    return axiosPublic.get<ProductModel>(url);
};
