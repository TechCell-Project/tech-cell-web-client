import { cache } from 'react';

import { HttpStatusCode, isAxiosError } from 'axios';

import { getProductsPublic } from '@services/ProductService';
import { PagingProduct } from '@models/Product';
import { Paging } from '@models/Common';

import { FOUND_CODE, NOTFOUND_ERROR_CODE, SERVER_ERROR_CODE } from '@/constants';
import { ProductSearchingStatus } from '@/interfaces';

export const revalidate = 3600; // revalidate the data at most every hour

export const getProductsCustom = cache(
    async (keyword: string): Promise<ProductSearchingStatus | undefined> => {
        const searchProduct: PagingProduct = {
            ...new Paging(),
            keyword,
        };

        try {
            const { status, data } = await getProductsPublic(searchProduct);

            if (status === HttpStatusCode.Ok) {
                return {
                    data,
                    messageStatusCode: FOUND_CODE,
                };
            }
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 404) {
                    return {
                        data: null,
                        messageStatusCode: NOTFOUND_ERROR_CODE,
                    };
                } else {
                    return {
                        data: null,
                        messageStatusCode: SERVER_ERROR_CODE,
                    };
                }
            }
        }
    },
);
