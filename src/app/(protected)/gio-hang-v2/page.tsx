"use client";

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { getCartItemsCustom } from 'utils/get-cartItems';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';

const Cart = () => {
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [currentCartData, setCurrentCartData] = useState<CartModel | null>(null);

    useEffect(() => {
        const fetchCartData = async () => {
            if (!isDataFetched) {
                const cartData = await getCartItemsCustom().then((res) => res);
                setCurrentCartData(cartData);
                setIsDataFetched(true);
            }
        };

        fetchCartData();
    }, [isDataFetched]);

    //console.log(currentCartData);

    if (!isDataFetched) {
        return <LoadingPage />;
    }

    return (
        <CartPage userCartData={currentCartData} />
    )
};

export default Cart;
