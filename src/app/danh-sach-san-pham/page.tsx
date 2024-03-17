import { Suspense } from 'react';

import styles from '@styles/components/brands.module.scss';

import Pagination from './pagination';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BreadCrumbs } from '@/components/Common/Products/BreadCrumbs';
import { BrandScrolling } from '@/components/Common/Products/BrandScrolling';
import CategorySelect from '@/components/Common/Products/CategorySelect';
import SortingToolbar from '@/components/Common/Products/SortingToolbar';
import { ProductsSkeleton } from '@/components/Common/Products/Products';
import { ProductsList } from '@/components/Common/Products/ProductsList';

import { getProductsPublic } from '@/services';
import { PagingProduct } from '@/models';
import { filterSearchParams, getThumbnail } from '@/utils/funcs';
import { VALID_GET_PRODUCTS_PARAMS } from '@/constants/ValidApisParams';

export default async function Product({
    searchParams,
}: {
    searchParams?: { [key: string]: string };
}) {
    const page = searchParams?.page || '1';

    const { data: res } = !searchParams
        ? await getProductsPublic(new PagingProduct())
        : await getProductsPublic({
              ...new PagingProduct(),
              page: Number.parseInt(page) - 1,
              ...filterSearchParams(searchParams, VALID_GET_PRODUCTS_PARAMS),
          });

    const productsList =
        res.totalRecord !== 0
            ? res.data.map((product) => {
                  return {
                      id: product._id ?? '',
                      name: product.name ?? '',
                      category: product.category?.name ?? '',
                      price: product.variations[0].price,
                      image: getThumbnail(product.generalImages),
                  };
              })
            : [];

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
                        <Suspense fallback={<ProductsSkeleton />}>
                            <ProductsList products={productsList} />
                        </Suspense>
                        <Pagination page={Number.parseInt(page)} totalPage={res.totalPage} />
                    </Box>
                </Container>
            </Box>
        </>
    );
}
