import { cache } from 'react';

import { getProductsPublic } from '@services/ProductService';
import { PagingProduct } from '@models/Product';
import { Paging } from '@models/Common';

export const revalidate = 3600; // revalidate the data at most every hour

export const getProductsCustom = cache(async (keyword: string) => {
    const searchProduct: PagingProduct = {
        ...new Paging(),
        keyword,
    };
    const { data } = await getProductsPublic(searchProduct);
    return data;
});