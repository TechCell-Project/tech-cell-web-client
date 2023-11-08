
export class CartModel {
    productId ?: string;
    sku ?: string;
    quantity ?: number;

}

export class DataCart {
    data: Array<CartModel> = [];
}
