export class AddCartItemModel {
    productId: string = '';
    sku: string = '';
    quantity: number = 0;
}

export class CartItemModel extends AddCartItemModel {
    updatedAt?: string | Date | null = null;
    createdAt?: string | Date | null = null;
}

export class CartRequest {
    userId: string | null = null;
    products: Array<CartItemModel> = new Array<CartItemModel>();
    cartState: string | null = null;
    cartCountProducts: number = 0;
    __v?: number | null = 0;
}

export class CartModel extends CartRequest {
    _id: string | null = null;
    createdAt: string | null = null;
    updatedAt: string | null = null;
}

export class CartsSlice {
    carts: CartModel = new CartModel();
    isLoading: boolean = false;
    isUpdating: boolean = false;
}
