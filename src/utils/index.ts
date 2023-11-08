import { ProductStatus } from '@constants/enum';
import { IUser } from '@interfaces/auth';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ImageModel, ProductData } from '@models/Product';
import { AttributeDynamics } from '@models/Attribute';
import { VariantStorage } from '@interfaces/product';
import { FOUND_CODE, MAP_STATUS_CODE, NOTFOUND_ERROR_CODE, SERVER_ERROR_CODE } from '@constants/errorCode';

export * from './get-products';

// get information from local storage
export const getCurrentUserId = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const id = user._id;
        return id;
    }
    return null;
};

export const getCurrentUserRole = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const id = user.role;
        return id;
    }
    return null;
};

export const getAccessToken = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const accessToken = user.accessToken;
        return accessToken;
    }
    return null;
};

export const getRefreshToken = () => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        const refreshToken = user.refreshToken;
        return refreshToken;
    }
    return null;
};

// authentication
export const setToken = (accessToken: string, refreshToken: string) => {
    const userObj = localStorage.getItem('user');
    if (userObj) {
        const user: IUser = JSON.parse(userObj);
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        localStorage.setItem('user', JSON.stringify(user));
    }
};

export const decodeAccessToken = () => {
    const accessToken = getAccessToken();

    if (accessToken) {
        return jwtDecode<JwtPayload>(accessToken);
    }

    return null;
};

export const isAccessTokenExpired = () => {
    const accessTokenData = decodeAccessToken();

    if (accessTokenData) {
        const { exp } = accessTokenData;
        const currentTime = Math.floor(Date.now() / 1000);

        return Number(exp) < currentTime;
    }

    return true; // Trả về true nếu không có access token hoặc không thể giải mã
};

// common functions
export const getRole = (role?: string | null) => {
    switch (role) {
        case 'User':
            return 'Khách hàng';
        case 'Admin':
            return 'Quản trị viên';
        case 'Mod':
            return 'Điều hành viên';
        case 'SuperAdmin':
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
export const getThumbnail = (images: ImageModel[]) => {
    let thumbnail = '';

    if (images.length === 0) {
        thumbnail = '/product_img/phone1.webp';
    }

    images.forEach((image) => {
        if (image.isThumbnail) {
            thumbnail = image.url ? image.url : '/product_img/phone1.webp';
        }
    });

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
export const formatProductLabel = (products: ProductData) => {
    return products.data.map((product) => {
        return {
            id: product._id ?? '',
            name: product.name ?? '',
            category: product.category?.name ?? '',
            price: product.variations[0].price,
            image: getThumbnail(product.generalImages),
        };
    });
}

//get attribute from product details
export const getSingleAttribute = (attributes: AttributeDynamics[], type: string) => {
    const specificAttribute = attributes.filter((attribute) => attribute.k === type).shift();

    return specificAttribute ?? new AttributeDynamics();
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

    return arr.slice().sort((a, b) => (customOrder[a.storage] || 0) - (customOrder[b.storage] || 0));
}

//Urlify a given string 
export const Urlify = (str: string) => {
    return encodeURI(str.trim());
}

//Render message when searching products 
export const getMessage = (messageStatusCode: string, keyword: string, totalRecord?: number) => {
    let message = ''
    switch (messageStatusCode) {
        case FOUND_CODE: 
            message = `Tìm thấy <span>${totalRecord}</span> sản phẩm cho từ khóa <span>'${keyword}'</span>`;
            break;
        case NOTFOUND_ERROR_CODE: 
            message = MAP_STATUS_CODE.get(NOTFOUND_ERROR_CODE)!.message + ` <span>'${keyword}'</span>`;
            break;
        case SERVER_ERROR_CODE:
            message = MAP_STATUS_CODE.get(SERVER_ERROR_CODE)!.message;
    }

    return message;
}