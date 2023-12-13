"use client";

import React, { FC, useEffect } from 'react';

import SkeletionCartItem from '../Display/SkeletionCartItem';

import { ItemCard } from './ItemCard';
import { CartItemModel } from '@models/Cart';
import { formatProductLabel, getCurrentVariant } from 'utils';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getDetailsProduct } from '@store/slices/productSlice';

interface CartItemPropsValues {
    itemData: CartItemModel;
    refreshCart: () => void;
    isSelected: boolean;
    handleCheckBox: (id: string) => void;
}

const CartItemCard: FC<CartItemPropsValues> = ({ itemData, refreshCart, isSelected, handleCheckBox }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (itemData.productId) {
            dispatch(getDetailsProduct(itemData.productId));
        }
    }, [itemData])

    const { product, isLoadingDetails } = useAppSelector((state) => state.product);

    // console.log(itemData);
    // console.log(product);

    return isLoadingDetails ? (
        <SkeletionCartItem />
    ) : (
        <>
            {product && (
                <>
                    <ItemCard
                        label={formatProductLabel(product)}
                        currentVariant={getCurrentVariant(product, itemData.sku!)}
                        itemData={itemData}
                        refreshCart={refreshCart}
                        isChecked={isSelected}
                        handleCheckBox={handleCheckBox}
                    />
                    {isLoadingDetails && (
                        <SkeletionCartItem />
                    )}
                </>
            )}
        </>
    );
};

export default CartItemCard;