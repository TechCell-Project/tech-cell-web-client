'use client';

import React, { useEffect, useState } from 'react';

import { ProductCartSchemaDTO, ProductDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

import { SkeletonCartItem } from '../Display/SkeletonCartItem';
import { ItemCard } from './ItemCard';

import { useProduct } from '@hooks/useProduct';

interface CartItemPropsValues {
    itemData: ProductCartSchemaDTO;
    isSelected: boolean;
    handleCheckBox: (id: string) => void;
    passThisItemPrice: (id: string, sku: string, price: number) => void;
}

function CartItemCard({
    itemData,
    isSelected,
    handleCheckBox,
    passThisItemPrice,
}: CartItemPropsValues) {
    const { status, products, getProductById } = useProduct();
    const [currentProduct, setCurrentProduct] = useState<ProductDTO | undefined>(undefined);

    useEffect(() => {
        if (itemData && !currentProduct) {
            getProductById(itemData.productId);
            setCurrentProduct(products[itemData.productId]);
        }
    }, [getProductById, itemData, currentProduct, products]);

    return status === 'loading' ? (
        <SkeletonCartItem />
    ) : (
        <>
            {currentProduct && (
                <ItemCard
                    currentProduct={currentProduct}
                    productCart={itemData}
                    isChecked={isSelected}
                    handleCheckBox={handleCheckBox}
                    passThisItemPrice={passThisItemPrice}
                />
            )}
        </>
    );
}

export default CartItemCard;
