'use client';

import React from 'react';

import { LoadingPage } from '@/components/Common/Display';

import { useAppDispatch, useAppSelector } from '@/store/store';

import { extractIdFromSlug } from '@utils';
import { getDetailsProduct } from '@/store/slices/productSlice';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
    const dispatch = useAppDispatch();
    const idExtractedFromSlug = extractIdFromSlug(params.slug);

    const { product } = useAppSelector((state) => state.product);

    if (!product || product._id !== idExtractedFromSlug) {
        dispatch(getDetailsProduct(idExtractedFromSlug));
    }

    if (!product) {
        return <LoadingPage />;
    }

    return <ProductDetail product={product} />;
}
