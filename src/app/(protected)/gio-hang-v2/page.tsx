'use client';

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCartItems } from '@store/slices/cartSlice';
import { Paging } from '@models/Common';

const Cart = () => {
    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems(new Paging()));
    }, []);

    return isLoading ? (
        <LoadingPage isLoading={isLoading} />
    ) : (
        <CartPage />
    );
};

export default Cart;
