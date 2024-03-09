'use client';

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { getDetailsProduct } from '@/store/slices/productSlice';

import { extractIdFromSlug } from '@utils';

import { LoadingPage } from '@/components/Common/Display';
import NotFound from './NotFound';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';

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

    if (!product) return <NotFound />;

    return <ProductDetail product={product} />;
}
