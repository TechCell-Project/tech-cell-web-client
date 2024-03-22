import { Fragment } from 'react';
import dynamic from 'next/dynamic';

import Pagination from './pagination';
import Loading from './loading';

import { PagingProduct } from '@/models';
import { filterSearchParams } from '@/utils/funcs';
import { getAllProductsCustom } from '@/utils/get-products';
import { VALID_GET_PRODUCTS_PARAMS } from '@/constants/ValidApisParams';

const ProductsList = dynamic(() => import('@components/Common/Products/ProductsList'), {
    ssr: true,
    loading: () => <Loading />,
});

export default async function Page({
    searchParams,
}: Readonly<{ searchParams?: { [key: string]: string } }>) {
    const page = searchParams?.page ?? '1';

    const payload = {
        ...new PagingProduct(),
        page: Number.parseInt(page) - 1,
        ...(searchParams && filterSearchParams(searchParams, VALID_GET_PRODUCTS_PARAMS)),
    };

    const res = await getAllProductsCustom(payload);

    return (
        <Fragment>
            <ProductsList productsResponse={res} />
            <Pagination page={Number.parseInt(page)} totalPage={res.totalPage} />
        </Fragment>
    );
}
