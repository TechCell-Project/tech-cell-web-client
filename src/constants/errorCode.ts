import { ErrorLabel } from '@interfaces/error';

export const FOUND_CODE = 'found';

export const NOTFOUND_ERROR_CODE = 'notFoundError';

export const SERVER_ERROR_CODE = 'serverError';

export const MAP_STATUS_CODE_ON_FINDING = new Map<string, ErrorLabel>([
    [
        FOUND_CODE,
        {
            code: FOUND_CODE,
            message: 'Tìm thấy',
        },
    ],
    [
        NOTFOUND_ERROR_CODE,
        {
            code: NOTFOUND_ERROR_CODE,
            message: 'Không tìm thấy sản phẩm nào cho từ khóa',
        },
    ],
    [
        SERVER_ERROR_CODE,
        {
            code: SERVER_ERROR_CODE,
            message: 'Có lỗi xảy ra. Xin vui lòng thử lại sau',
        },
    ],
]);

export const INVALID = 400;
export const UNAUTHORIZED = 401;
export const NOTFOUND = 404;
export const OVERLOAD = 429;
export const SERVER_ERROR = 500;

export const CASE_CART = 'cart';
export const CASE_ORDER = 'order';
export const CASE_ORDER_CANCEL = 'order-cancel';
export const CASE_ORDER_NEW_PAYMENT_URL = 'order-new-payment-url';
export const CASE_ORDERS_FETCH = 'orders-fetch';
export const CASE_CART_DELETE_PRODUCT = 'order-delete-product';
export const CASE_DEFAULT = 'default';

export const ERROR_MSG = new Map<number, Record<string, string>>([
    [
        INVALID,
        {
            [CASE_DEFAULT]: 'Dữ liệu không hợp lệ',
        },
    ],
    [
        UNAUTHORIZED,
        {
            [CASE_DEFAULT]: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
        },
    ],
    [
        NOTFOUND,
        {
            [CASE_ORDER_CANCEL]: 'Hủy đơn thất bại. Không tìm thấy đơn hàng',
            [CASE_ORDER_NEW_PAYMENT_URL]: 'Chuyển hướng thất bại. Đơn hàng không tồn tại',
            [CASE_CART_DELETE_PRODUCT]: 'Sản phẩm không còn tồn tại',
            [CASE_ORDERS_FETCH]: 'Không tìm thấy đơn hàng nào',
            [CASE_DEFAULT]: 'Không tìm thấy dữ liệu',
        },
    ],
    [
        OVERLOAD,
        {
            [CASE_DEFAULT]: 'Quá nhiều yêu cầu. Vui lòng thử lại sau',
        },
    ],
    [
        SERVER_ERROR,
        {
            [CASE_DEFAULT]: 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút',
        },
    ],
]);
