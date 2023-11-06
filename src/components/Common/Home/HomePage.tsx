"use client";

import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { BrandCategoryCompoment, CarouselComponent, ShopServicesComponent } from '@components/Form';
import FeaturedSection from './FeaturedSection';
import HotSalesSection from './HotSalesSection';

import Image from 'next/image';

import { Paging } from '@models/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';

import { formatProductLabel, getThumbnail } from 'utils';
import { ProductLabel } from '@interfaces/product';
import LoadingSection from '../Display/LoadingSection';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());

    const [newestProducts, setNewestProducts] = useState<ProductLabel[]>([]);

    useEffect(() => {
        dispatch(getAllProduct(searchProduct)).then();
    }, [searchProduct]);

    useEffect(() => {
        const productData = formatProductLabel(products).slice(0, 4);

        setNewestProducts(productData);

    }, [products]);
    
  return (
    <>
        <CarouselComponent />
        <ShopServicesComponent />
        <Container maxWidth="lg">
                <Stack spacing={3}>
                    {isLoading ? (
                        <LoadingSection isLoading={isLoading} />
                    ) : (
                        <FeaturedSection initialData={newestProducts} />
                    )}
                    <BrandCategoryCompoment />
                    <Box sx={{ maxWidth: { lg: '100%', xs: '100%' } }}>
                        <Image
                            src="/background_img/2.webp"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                            alt="img1"
                        />
                    </Box>
                    <HotSalesSection />
                </Stack>
            </Container>
    </>
  );
}

export default HomePage;