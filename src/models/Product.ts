import { AttributeDynamics } from "./Attribute";
import { CategoryModel } from "./Category";
import { Paging, PagingResponse } from "./Common";

export class PagingProduct extends Paging {
  detail?: boolean = false;
  select_type?: string | null = null;
}

export class PriceModel {
  base: number = 0;
  sale: number = 0;
  special: number = 0;
}

export class VariationModel {
  attributes: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  stock: number = 0;
  price: PriceModel = new PriceModel();
  images: Array<ImageModel> = new Array<ImageModel>();
  status: string | number | null = null;
  sku: string | null = null;
}

export class ImageModel {
  publicId: string = "";
  url: string = "";
  isThumbnail: boolean = false;
}

export class ProductRequest {
  name: string | null = null;
  description: string = "";
  status: number | null = null;
  category: CategoryModel = new CategoryModel();
  generalAttributes: Array<AttributeDynamics> = new Array<AttributeDynamics>();
  variations: Array<VariationModel> = new Array<VariationModel>();
  generalImages: Array<ImageModel> = new Array<ImageModel>();
  descriptionImages: Array<ImageModel> = new Array<ImageModel>();
}

// export class ProductDataRequest {
//   productData: ProductRequest = new ProductRequest();
//   general: Array<any> = [];
//   general_isthumbnail: Array<any> = [];
// }

export class ProductModel extends ProductRequest {
  _id: string | null = null;
  createdAt?: string;
  updatedAt?: string;
}

// export class ProductData extends PagingResponse {
//   data: Array<ProductModel> = [];
// }

export class ProductSlice {
  products: PagingResponse<ProductModel> = new PagingResponse<ProductModel>();
  product: ProductModel | null = null;
  isLoading: boolean = false;
  isLoadingDetails: boolean = false;
}