'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box, Container, Grid, Pagination, Stack } from '@mui/material';

import CardComponent from '@components/Form/CardComponent';
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

interface ProductsPageProps {
    className?: string;
}

const Products: FC<ProductsPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);
    const router = useRouter();

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());
    const [currentProducts, setCurrentProducts] = useState<ProductLabel[]>([]);

    useEffect(() => {
        dispatch(getAllProduct(searchProduct));
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

        console.log(productData);

        setCurrentProducts(productData);
    }, [products]);

    console.log(searchProduct);
    console.log(currentProducts);

    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        setSearchProduct({
            ...searchProduct,
            page: page - 1,
        });
    };

    return (
        <>
            <BreadCrumbs />
            <Box marginTop="20px">
                <Container maxWidth="lg">
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
