import { PagingResponse } from "@models/Common";
import { PriceModel, ProductModel, } from "@models/Product";

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
    variantThumbnail: string;
    storage: string;
    color: string;
    price: PriceModel;
    sku: string;
    isSelectedColor: boolean;
}

export interface ProductSearchingStatus {
    data: PagingResponse<ProductModel> | null;
    messageStatusCode: string;
}