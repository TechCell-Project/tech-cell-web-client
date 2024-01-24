import React from 'react';
import ProductDetail from '@components/Form/ProductDetails/ProductDetail';
import { extractIdFromSlug } from '@utils';

export default function Page({ params }: Readonly<{ params: { slug: string } }>) {
    return <ProductDetail id={extractIdFromSlug(params.slug)} />;
}
