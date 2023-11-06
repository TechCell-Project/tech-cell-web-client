import { PRODUCTS_ENDPOINT } from '@constants/Services';
import instance from './Instance';
import { PagingProduct, ProductData } from '@models/Product';

import instancePublic from './InstancePublic';

export const getProducts = (payload: PagingProduct) => {
    const { page, pageSize, keyword } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return instance.get<PagingProduct>(url);
};

export const getProductsPublic = (payload: PagingProduct) => {
    const { page, pageSize, keyword } = payload;
    let url = `${PRODUCTS_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}&select_type=only_active`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return instancePublic.get<ProductData>(url);
};

export const getProductById = (id: string, isDetails?: boolean) => {
    let url = `${PRODUCTS_ENDPOINT}/${id}`;

    if (isDetails) {
        url += `?detail=${isDetails}`;
    }
    return instance.get(url);
}
