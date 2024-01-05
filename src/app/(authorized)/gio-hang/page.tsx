'use client';

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useSession } from 'next-auth/react';
import { getCartItemsCustom } from 'utils/get-cartItems';
import { debounce } from 'utils/funcs';
import { axiosAuth } from '@libs/axios';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getCartItems } from '@/store/slices/cartSlice';

const Cart = () => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector((state) => state.cart);

    useEffect(() => {
        if (session) {
            axiosAuth.defaults.headers.common.Authorization = `Bearer ${session.user.accessToken}`;

            dispatch(getCartItems());
        }
    }, [session]);

    if (isLoading) {
        return <LoadingPage isLoading />;
    }

    return <CartPage />;
};

export default Cart;
