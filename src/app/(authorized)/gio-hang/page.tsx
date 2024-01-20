'use client';

import React from 'react';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useAppSelector } from '@/store/store';

function Cart() {
    const { status } = useAppSelector((state) => state.carts);

    if (status === 'loading') {
        return <LoadingPage isLoading />;
    }

    return <CartPage />;
}

export default Cart;
