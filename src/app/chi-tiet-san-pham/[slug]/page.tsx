'use client';

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { getDetailsProduct } from '@/store/slices/productSlice';

import { extractIdFromSlug } from '@utils';

import { LoadingPage } from '@/components/Common/Display';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';
import NotFound from '@/components/Common/Display/NotFound';
import { RootPath } from '@/constants/enum';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
    const dispatch = useAppDispatch();
    const idExtractedFromSlug = extractIdFromSlug(params.slug);

    const { product, isLoadingDetails } = useAppSelector((state) => state.product);

    useEffect(() => {
        if (!product || product._id !== idExtractedFromSlug) {
            dispatch(getDetailsProduct(idExtractedFromSlug));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoadingDetails) return <LoadingPage />;

    if (!product)
        return (
            <NotFound
                description='Không tìm thấy sản phẩm'
                redirectTitle='Trang chủ'
                redirect={RootPath.Home}
            />
        );

    return <ProductDetail product={product} />;
}
