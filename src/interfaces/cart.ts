import { VariationModel } from '@models/index';

export interface CartItemSelected {
    itemId: string;
    sku: string;
    quantity: number;
}

export interface VariantInCart {
    id: string;
    name: string;
    data: VariationModel;
    quantity: number;
}

export interface ShippingData {
    [key: string]: {
        total: number;
        service_fee: number;
    };
}
