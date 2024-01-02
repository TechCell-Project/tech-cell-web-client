'use client';

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useSession } from 'next-auth/react';
import { getCartItemsCustom } from 'utils/get-cartItems';
import instanceAuth from '@config/instanceAuth.config';
import { debounce } from 'utils/funcs';

const Cart = () => {
    const { data: session } = useSession();

    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [currentCartData, setCurrentCartData] = useState<CartModel | null>(null);

    useEffect(() => {
        const fetchCartData = debounce(async () => {
            const cartData = await getCartItemsCustom();
            setCurrentCartData(cartData);
            setIsDataFetched(true);
        }, 5000);

        if (session) {
            instanceAuth.defaults.headers.common.Authorization = `Bearer ${session.user.accessToken}`;

            if (!isDataFetched) {
                fetchCartData();
            }
        }
    }, [isDataFetched, session]);

    console.log(currentCartData);

    if (!isDataFetched) {
        return <LoadingPage isLoading />;
    }

    return <CartPage userCartData={currentCartData} />;
};

export default Cart;
