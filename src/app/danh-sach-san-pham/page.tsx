import dynamic from 'next/dynamic';

import styles from '@styles/components/brands.module.scss';

import Pagination from './pagination';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BreadCrumbs } from '@/components/Common/Products/BreadCrumbs';
import { BrandScrolling } from '@/components/Common/Products/BrandScrolling';
import CategorySelect from '@/components/Common/Products/CategorySelect';
import SortingToolbar from '@/components/Common/Products/SortingToolbar';
import { ProductsSkeleton } from '@/components/Common/Products/Products';

import { getProductsPublic } from '@/services';
import { PagingProduct } from '@/models';
import { filterSearchParams, formatProductLabel } from '@/utils/funcs';
import { VALID_GET_PRODUCTS_PARAMS } from '@/constants/ValidApisParams';

const ProductsList = dynamic(() => import('@components/Common/Products/ProductsList'), {
    loading: () => <ProductsSkeleton />,
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

    const { data: res } = await getProductsPublic(payload);

    return (
        <>
            <BreadCrumbs />
            <Box marginTop='20px'>
                <Container sx={{ maxWidth: '1320px !important' }}>
                    <Box className='flex flex-col w-full' sx={{ paddingBottom: '20px' }}>
                        <Box sx={{ overflowX: 'auto' }}>
                            <BrandScrolling className={styles.list_brands.toString()} />
                            <CategorySelect />
                            <SortingToolbar className={styles.list_brands.toString()} />
                        </Box>
                        <ProductsList
                            products={
                                res.totalRecord !== 0
                                    ? res.data.map((product) => formatProductLabel(product))
                                    : []
                            }
                        />
                        <Pagination page={Number.parseInt(page)} totalPage={res.totalPage} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
