'use client';

import React, { useEffect } from 'react';

import { LoadingPage } from '@/components/Common/Display';

import { useAppDispatch, useAppSelector } from '@/store/store';

import { extractIdFromSlug } from '@utils';
import { getDetailsProduct } from '@/store/slices/productSlice';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';
import NotFound from './NotFound';

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
