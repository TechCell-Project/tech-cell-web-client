import { ProductStatus } from '@constants/enum';
import { ImageModel, PriceModel, ProductModel, VariationModel } from '@models/Product';
import { AttributeDynamics } from '@models/Attribute';
import { VariantStorage } from '@interfaces/product';
import {
    FOUND_CODE,
    MAP_STATUS_CODE,
    NOTFOUND_ERROR_CODE,
    SERVER_ERROR_CODE,
} from '@constants/errorCode';
import { getCurrentUserRole } from './local';
import { PagingResponse } from '@models/Common';
import { UserAccount } from '@models/Account';
import { UserModel } from '@models/Profile';
import slugify from 'slugify';
import { VariantInCart } from '@/interfaces';
import { OrderSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

// common functions
export const getRole = (role?: string | null) => {
    switch (role) {
        case 'User' || 'User'.toLowerCase():
            return 'Khách hàng';
        case 'Admin' || 'Admin'.toLowerCase():
            return 'Quản trị viên';
        case 'Mod' || 'Mod'.toLowerCase():
            return 'Điều hành viên';
        case 'SuperAdmin' || 'SuperAdmin'.toLowerCase():
            return 'Quản lý';
        default:
            return '';
    }
};

export const formatDateViVN = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return date.toLocaleString('vi-VN', options);
};

export const isRoleAccepted = (role?: string): boolean => {
    const currentRole = getCurrentUserRole();

    switch (currentRole) {
        case 'SuperAdmin':
            return true;
        case 'Admin':
            return role !== getRole('SuperAdmin') && role !== getRole('Admin');
        case 'Mod':
            return role === getRole('User');
        default:
            return false;
    }
};

// get status product
const productStatusMapping: { [key: number]: string } = {
    [ProductStatus.ComingSoon]: 'Sắp ra mắt',
    [ProductStatus.NewArrival]: 'Hàng mới về',
    [ProductStatus.Pre_order]: 'Đặt hàng trước',
    [ProductStatus.OnSales]: 'Đang bán',
    [ProductStatus.Hide]: 'Ẩn',
    [ProductStatus.NotSales]: 'Không bán',
    [ProductStatus.LowStock]: 'Còn ít hàng',
    [ProductStatus.TemporarilyOutOfStock]: 'Tạm thời hết hàng',
};

//get thumbnail image
export const getThumbnail = (images?: ImageModel[]) => {
    let thumbnail = '';

    if (images) {
        if (images.length === 0) {
            thumbnail = '/product_img/phone1.webp';
        }

        images.forEach((image) => {
            if (image.isThumbnail) {
                thumbnail = image.url ? image.url : '/product_img/phone1.webp';
            }
        });
    } else {
        thumbnail = '/public/img_productDetail/ip14_2.webp';
    }

    return thumbnail;
};

//format currency
export const currencyFormat = (price: number | null): string => {
    if (typeof price !== 'number') {
        throw new Error('Invalid input. Please provide a number.');
    }

    // Convert the number to a string
    const numberString: string = price.toString();

    // Format the integer part with dots every three digits
    const formattedIntegerPart: string = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formattedIntegerPart;
};

// format products data list
export const formatProductLabel = (product: ProductModel) => {
    return {
        id: product._id ?? '',
        name: product.name ?? '',
        category: product.category?.name ?? '',
        price: product.variations !== undefined ? product.variations[0].price : new PriceModel(),
        image: getThumbnail(product.generalImages),
    };
};

//get attribute from product details
export const getSingleAttribute = (attributes: AttributeDynamics[], name: string) => {
    const specificAttribute = attributes.find((attribute) => attribute.k === name)!;

    return specificAttribute;
};

// //get blur image data url
// export async function getBase64(imageUrl: string) {
//     try {
//         const res = await fetch(imageUrl);

//         if (!res.ok) {
//             throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
//         }

//         const buffer = await res.arrayBuffer();

//         const { base64 } = await getPlaiceholder(Buffer.from(buffer));

//         //console.log(`base64: ${base64}`)

//         return base64;
//     } catch (e) {
//         if (e instanceof Error) console.log(e.stack);
//     }
// }

// Sorting Product variation 's storage
export const sortByCustomOrder = (arr: VariantStorage[]) => {
    const customOrder: { [key: string]: number } = {
        '128 GB': 1,
        '256 GB': 2,
        '512 GB': 3,
        '1 TB': 4,
        // Add more storage sizes and weights as needed
    };

    return arr
        .slice()
        .sort((a, b) => (customOrder[a.storage] || 0) - (customOrder[b.storage] || 0));
};

//Urlify a given string
export const Urlify = (str: string) => {
    return encodeURI(str.trim());
};

//Render message when searching products
export const getMessage = (messageStatusCode: string, keyword: string, totalRecord?: number) => {
    let message = '';
    switch (messageStatusCode) {
        case FOUND_CODE:
            message = `Tìm thấy <span>${totalRecord}</span> sản phẩm cho từ khóa <span>'${keyword}'</span>`;
            break;
        case NOTFOUND_ERROR_CODE:
            message =
                MAP_STATUS_CODE.get(NOTFOUND_ERROR_CODE)!.message + ` <span>'${keyword}'</span>`;
            break;
        case SERVER_ERROR_CODE:
            message = MAP_STATUS_CODE.get(SERVER_ERROR_CODE)!.message;
    }

    return message;
};

export const getCurrentVariant = (details: ProductModel, sku: string) => {
    return details.variations.find((variant) => variant.sku === sku)!;
};

export const addOrRemoveFromArray = (arr: string[], str: string): string[] => {
    const index = arr.indexOf(str);

    if (index !== -1) {
        // If the string is already in the array, remove it
        arr.splice(index, 1);
    } else {
        // If the string is not in the array, add it
        arr.push(str);
    }

    return arr;
};

export function convertToUserModel(userAccount: UserAccount): UserModel {
    return new UserModel({
        _id: userAccount._id!,
        email: userAccount.email!,
        userName: userAccount.userName!,
        password: userAccount.password!,
        emailVerified: userAccount.emailVerified,
        firstName: userAccount.firstName!,
        lastName: userAccount.lastName!,
        address: userAccount.address,
        createdAt: userAccount.createdAt ? new Date(userAccount.createdAt) : undefined,
        updatedAt: userAccount.updatedAt ? new Date(userAccount.updatedAt) : undefined,
        // Add other fields as necessary
    });
}

export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<F>): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => func(...args), waitFor);
    };
}

// Scroll to top of page
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Function to get unique attribute keys from all variations
export const getUniqueAttributeKeys = (variations: VariationModel[]) =>
    Array.from(
        new Set(variations.flatMap((variation) => variation.attributes.map((attr) => attr.k))),
    );

// Uppercase first letter
export const upperCase = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
};

export const getSearchParams = <T extends number | string = any>(
    payload: Record<string, T>,
): string => {
    const url = new URLSearchParams();

    Object.entries(payload).map(([key, value]) => {
        if (key === 'page') {
            value = (parseInt(value as string, 10) + 1) as T;
        }
        if (value === null || !value) {
            return;
        }
        url.append(key, value.toString());
    });

    return url.toString();
};

export function padWithZero(num: number) {
    return num.toString().padStart(2, '0');
}

export function isEmail(email: string): boolean {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

export const convertSlugUrl = (str: string) => {
    return slugify(str, {
        locale: 'vi',
        trim: true,
        lower: true,
    });
};

export const extractIdFromSlug = (slug: string) => {
    const id = slug.split('-');
    return id[id.length - 1];
};

export const getAttributesToString = (variant: VariantInCart) => {
    let str = '';
    variant.data.attributes.forEach((attr, index) => {
        const unit = attr.u ?? '';
        const separate = index !== 0 ? ' - ' : ('' as string);
        str += separate + upperCase(attr.v) + unit;
    });
    return str;
};

export const getTotalProductQuantity = (order: OrderSchemaDTO) => {
    let totalQuantity = 0;
    order.products.forEach((product) => (totalQuantity += product.quantity));
    return totalQuantity;
};

export function getMatchProductColorsToImages(variants: VariationModel[]): ImageModel[] {
    const uniqueColors: Set<string> = new Set();
    const images: ImageModel[] = [];

    if (variants.length > 1) {
        for (const variant of variants) {
            if (variant.attributes.length > 1) {
                const color = variant.attributes.find((att) => att.k === 'color');

                if (color) {
                    if (!uniqueColors.has(color.v.toLowerCase())) {
                        images.push(variant.images[0]);
                        uniqueColors.add(color.v.toLocaleLowerCase());
                    }
                }
            }
        }
    } else {
        images.push(variants[0].images[0]);
    }

    return images;
}

export function getArrayAttributesByKey(attributes: AttributeDynamics[], key: string) {
    const specifics: AttributeDynamics[] = [];
    const rest: AttributeDynamics[] = [];

    attributes.forEach((attr) => {
        if (attr.k.startsWith(key)) {
            specifics.push(attr);
        } else {
            rest.push(attr);
        }
    });

    return {
        specifics,
        rest,
    };
}
