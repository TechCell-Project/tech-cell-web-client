import React, { Suspense } from 'react';

import { getProductsCustom } from 'utils/get-products';
import ResultsPage from '@components/Common/Searching/ResultsPage';
import {
    FOUND_CODE,
    NOTFOUND_ERROR_CODE,
    SERVER_ERROR_CODE,
} from '@constants/errorCode';
import { ProductSearchingStatus } from '@interfaces/product';
import Loading from './loading';

const SearchPage = async ({ searchParams }: { searchParams: { search?: string } }) => {
    const searchQuery = searchParams.search ?? '';

    const decodeKeyword = decodeURIComponent(searchQuery);

    const searchData: ProductSearchingStatus = await getProductsCustom(searchQuery)
        .then((res) => {
            return {
                data: res,
                messageStatusCode: FOUND_CODE,
            };
        })
        .catch((err) => {
            if (err.response.status === 404) {
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
        });
    console.log(searchData);
    
    return (
        <Suspense fallback={<Loading />}>
            <ResultsPage searchData={searchData} keyword={decodeKeyword} />
        </Suspense>
    );
};

export default SearchPage;