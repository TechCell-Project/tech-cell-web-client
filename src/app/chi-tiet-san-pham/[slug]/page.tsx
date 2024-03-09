'use client';

import React from 'react';

import { LoadingPage } from '@/components/Common/Display';

import { useAppDispatch, useAppSelector } from '@/store/store';

import { extractIdFromSlug } from '@utils';
import { getDetailsProduct } from '@/store/slices/productSlice';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';
import NotFound from './NotFound';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
    const dispatch = useAppDispatch();
    const idExtractedFromSlug = extractIdFromSlug(params.slug);

    const { product, isLoading } = useAppSelector((state) => state.product);

    if (!product || product._id !== idExtractedFromSlug) {
        dispatch(getDetailsProduct(idExtractedFromSlug));
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!product) {
        return <NotFound />;
    }

    return <ProductDetail product={product} />;
}
