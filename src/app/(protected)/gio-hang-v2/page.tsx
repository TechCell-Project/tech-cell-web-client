'use client';

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCartItems } from '@store/slices/cartSlice';
import { Paging } from '@models/Common';
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
            console.log(session.user.accessToken);
            instanceAuth.defaults.headers.common.Authorization = `Bearer ${session.user.accessToken}`;
            console.log(instanceAuth.defaults.headers.common.Authorization);

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
