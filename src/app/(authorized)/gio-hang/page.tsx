'use client';

import React from 'react';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useCart } from '@hooks/userCart';

function Cart() {
    const { status } = useCart();

    if (status === 'loading') {
        return <LoadingPage isLoading />;
    }

    return <CartPage />;
}

export default Cart;
