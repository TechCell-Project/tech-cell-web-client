'use client';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import FeaturedSection from './FeaturedSection';
import HotSalesSection from './HotSalesSection';
import BannerSection from './BannerSection';

import Image from 'next/image';
import { Paging } from '@models/Common';
import { useAppDispatch, useAppSelector } from '@store/store';

import { getAllProduct } from '@store/slices/productSlice';
import { formatProductLabel } from 'utils';
import { ProductLabel } from '@interfaces/product';
import { LoadingSection } from '../Display/LoadingSection';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());
    const [newestProducts, setNewestProducts] = useState<ProductLabel[]>([]);

    useEffect(() => {
        dispatch(getAllProduct(searchProduct)).then();
    }, [searchProduct]);

    useEffect(() => {
        const productData = products.data.map((product) => formatProductLabel(product)).slice(0, 4);
        setNewestProducts(productData);
    }, [products]);

    return (
        <Container sx={{ maxWidth: '1320px !important' }}>
            <BannerSection />
            {isLoading ? (
                <LoadingSection isLoading={isLoading} />
            ) : (
                <FeaturedSection initialData={newestProducts} />
            )}
            {/*<BrandCategoryComponent />*/}
            <Box sx={{ maxWidth: { lg: '100%', xs: '100%' }, mt: 8 }}>
                <Image
                    src='/background_img/2.webp'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                    alt='img1'
                />
            </Box>
            <HotSalesSection />
        </Container>
    );
};
