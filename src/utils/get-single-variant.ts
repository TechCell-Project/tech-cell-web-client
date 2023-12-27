import { getProductById } from '@services/ProductService';
import { getCurrentVariant } from './funcs';
import { VariantInCart } from '@interfaces/cart';
import { AddCartItemModel } from '@models/Cart';

export async function getSingleProductVariant(cartItems: AddCartItemModel, isDetails: boolean = true): Promise<VariantInCart> {
    try {
        const response = await getProductById(cartItems.productId!, isDetails);

        return {
            id: response.data._id as string,
            name: response.data.name as string,
            data: getCurrentVariant(response.data, cartItems.sku!),
            quantity: cartItems.quantity,
        };
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}
