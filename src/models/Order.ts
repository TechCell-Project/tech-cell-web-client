import { ShippingData } from '@interfaces/cart';
import { Address } from './Account';
import { AddCartItemModel, CartItemModel } from './Cart';
import { PagingResponse } from './Common';

export class OrderModel {
    _id: string | null = null;
    userId: string | null = null;
    products: Array<CartItemModel> = new Array<CartItemModel>();
    checkoutOrder: OrderCheckout = new OrderCheckout();
    shippingOrder: OrderShipping = new OrderShipping();
    paymentOrder?: OrderPayment = new OrderPayment();
    trackingCode: string | null = null;
    orderStatus: string | null = null;
    createdAt: string | null = null;
    updatedAt: string | null = null;
}

export class OrderShipping {
    fromAddress?: Address = new Address();
    toAddress: Address = new Address();
}

export class OrderCheckout {
    shippingFee: number | null = null;
    totalApplyDiscount: number | null = null;
    totalPrice: number | null = null;
}

export class OrderPayment {
    method: string | null = null;
    status: string | null = null;
    paymentUrl?: string | null;
    orderData?: object | null;
}

export class OrderReviewRequest {
    addressSelected: number | null = null;
    productSelected: Array<AddCartItemModel> = new Array<AddCartItemModel>();
}

export class OrderCreateRequest extends OrderReviewRequest {
    paymentMethod: string | null = null;
}

export class OrderReviewResponse extends OrderReviewRequest {
    totalProductPrice: number | null = null;
    shipping: ShippingData | null = null;
}

export class OrderSlice {
    orders: PagingResponse<OrderModel> = new PagingResponse<OrderModel>();
    order?: OrderModel | null = null;
    reviewedOrder: OrderReviewResponse | null = null;
    isLoading: boolean = false;
    isLoadingDetails: boolean = false;
}
