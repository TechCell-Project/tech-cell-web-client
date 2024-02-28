'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { BreadCrumbs } from '@components/Layout';

import BrandScrolling from './BrandScrolling';
import CategorySelect from './CategorySelect';
import SortingToolbar from './SortingToolbar';

import PaginationData from '../PaginationData/PaginationData';

import styles from '@styles/components/brands.module.scss';
import { Paging } from '@models/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { getThumbnail } from 'utils';

import { ProductLabel } from '@interfaces/product';
import { LoadingSection } from '../Display/LoadingSection';

interface ProductsPageProps {
    className?: string;
}

const Products: FC<ProductsPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());
    const [currentProducts, setCurrentProducts] = useState<ProductLabel[]>([]);

    useEffect(() => {
        dispatch(getAllProduct(searchProduct));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchProduct]);

    useEffect(() => {
        const productData = products.data.map((product) => {
            return {
                id: product._id ?? '',
                name: product.name ?? '',
                category: product.category?.name ?? '',
                price: product.variations[0].price,
                image: getThumbnail(product.generalImages),
            };
        });

        setCurrentProducts(productData);
    }, [products]);

    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        setSearchProduct({
            ...searchProduct,
            page: page - 1,
        });
    };

    return isLoading ? (
        <LoadingSection isLoading={isLoading} />
    ) : (
        <>
            <BreadCrumbs />
            <Box marginTop='20px'>
                {/*<Container maxWidth="lg">*/}
                <Container sx={{ maxWidth: '1320px !important' }}>
                    <Stack spacing={3}>
                        <Box sx={{ overflowX: 'auto' }}>
                            <BrandScrolling className={styles.list_brands.toString()} />
                            <CategorySelect />
                            <SortingToolbar className={styles.list_brands.toString()} />
                        </Box>
                        <PaginationData
                            initialData={currentProducts}
                            pagingData={{ page: searchProduct.page, totalPage: products.totalPage }}
                            handleChange={handleChange}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Products;
