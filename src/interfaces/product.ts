import { PriceModel, ProductData } from "@models/Product";

export interface CategorySelecting {
    key: string;
    value: string;
    chosen: boolean;
}

export interface ProductLabel {
    id: string;
    name: string;
    category: string;
    price: PriceModel;
    image: string;
}

export interface VariantStorage {
    storage: string;
    outOfStock: boolean;
    price: PriceModel;
}

export interface VariantInfo {
    storage: string;
    color: string;
    price: PriceModel;
    isSelectedColor: boolean;
}

export interface ProductSearchingStatus {
    data: ProductData | null;
    messageStatusCode: string;
}