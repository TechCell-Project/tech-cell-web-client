import React from 'react';
import ProductDetail from '@components/Form/ProductDetails/ProductDetail';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <ProductDetail id={params.id} />
        </div>
    );
}
