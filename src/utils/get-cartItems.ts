import { cache } from 'react';

import { Paging } from '@models/Common';
import { CartModel } from '@models/Cart';
import { getCarts } from '@services/CartService';

import { CART_PAGING } from '@constants/CartPaging';

export const revalidateCart = 300;

export const getCartItemsCustom = cache(async () => {
    const response = await getCarts(CART_PAGING)
        .then((res) => res.data)
        .catch((err) => {
            console.log('error: ', err);
            return new CartModel();
        });

    console.log(response);

    return response;
});
