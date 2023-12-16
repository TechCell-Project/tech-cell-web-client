'use client';

import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';

import { BrandCategoryCompoment, CarouselComponent, ShopServicesComponent } from '@components/Form';
import FeaturedSection from './FeaturedSection';
import HotSalesSection from './HotSalesSection';

import Image from 'next/image';

import { Paging } from '@models/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';

import { formatProductLabel } from 'utils';
import { ProductLabel } from '@interfaces/product';
import { LoadingSection } from '../Display/LoadingSection';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const benefitSection = [
    {
        icon: RocketLaunchRoundedIcon,
        title: 'Vận chuyển nhanh',
        desc: 'Miễn phí vận chuyển cho đơn hàng từ 2 triệu',
    },
    {
        icon: CachedRoundedIcon,
        title: 'Đổi trả & hoàn tiền',
        desc: 'Quy trình đổi trả dễ dàng',
    },
    {
        icon: PhoneRoundedIcon,
        title: 'Liên hệ',
        desc: 'Chăm sóc khách hàng 24/7',
    },
    {
        icon: CreditCardRoundedIcon,
        title: 'Thanh toán',
        desc: 'VNPay & COD trả tiền khi nhận hàng',
    },
];

const HomePage = () => {
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
        <>
            <Typography
                textAlign='center'
                fontSize='13px'
                sx={{ bgcolor: '#0e0e0e', color: '#fff', p: '10px 0', display: { xs: 'none', sm: 'none', md: 'block' } }}
            >
                UPGRADE YOUR CONNECTIVITY: SMART DEALS, SMARTER PHONES!
            </Typography>
            <CarouselComponent />
            {/*<ShopServicesComponent />*/}
            <Container sx={{ maxWidth: '1320px !important' }}>
                <Stack spacing={3}>
                    {isLoading ? (
                        <LoadingSection isLoading={isLoading} />
                    ) : (
                        <FeaturedSection initialData={newestProducts} />
                    )}
                    <BrandCategoryCompoment />
                    <Box sx={{ maxWidth: { lg: '100%', xs: '100%' } }}>
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
                </Stack>
            </Container>

            <Box sx={{ bgcolor: '#fafafa', p: '40px 0' }}>
                <Container sx={{ maxWidth: '1320px !important' }}>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        {benefitSection.map((benefit) => (
                            <Grid item xs={6} md={3} key={benefit.title}>
                                <Stack direction='row' gap={3} alignItems='center'
                                       justifyContent={{ md: 'center', xs: 'flex-start' }}>
                                    <benefit.icon sx={{ height: '32px', width: 'auto' }} />
                                    <Stack direction='column'>
                                        <Typography fontSize='16px' fontWeight={600}
                                                    mb='4px'>{benefit.title}</Typography>
                                        <Typography fontSize='13px' sx={{ opacity: 0.9 }}>{benefit.desc}</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;