import React, { Suspense } from 'react';

import { getProductsCustom } from 'utils/get-products';
import ResultsPage from '@components/Common/Searching/ResultsPage';

import { ProductSearchingStatus } from '@/interfaces/product';
import { LoadingPage } from '@/components/Common/Display';

const SearchPage = async ({ searchParams }: { searchParams: { search?: string } }) => {
    const searchQuery = searchParams.search ?? '';

    const decodeKeyword = decodeURIComponent(searchQuery);

    const searchData = (await getProductsCustom(searchQuery)) as ProductSearchingStatus;
    console.log(searchData);

    return (
        <Suspense fallback={<LoadingPage />}>
            <ResultsPage searchData={searchData} keyword={decodeKeyword} />
        </Suspense>
    );
};

export default SearchPage;
