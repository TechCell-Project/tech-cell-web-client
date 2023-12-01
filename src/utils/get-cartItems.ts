import { cache } from 'react';

import { Paging } from '@models/Common';
import { getCarts } from '@services/CartService';
import { CartModel } from '@models/Cart';

export const revalidateCart = 300;

export const getCartItemsCustom = cache(async () => {
    const response = await getCarts(new Paging())
        .then((res) => res.data)
        .catch((err) => {
            console.log('error: ', err);
            return new CartModel();
        });

    console.log(response);

    return response;
});
