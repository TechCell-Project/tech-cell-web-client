import { cache } from 'react';

import { Paging } from '@models/Common';
import { getCartsSdk } from '@services/CartService';
import { CartModel } from '@models/Cart';

export const revalidateCart = 300;

export const getCartItemsCustom = cache(async () => {
    const { page, pageSize } = new Paging();
    const response = await getCartsSdk(page, pageSize)
        .then((res) => res.data)
        .catch((err) => {
            console.log('error: ', err);
            return new CartModel();
        });

    console.log(response);

    return response;
});
