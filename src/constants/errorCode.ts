import { ErrorLabel } from '@interfaces/error';

export const FOUND_CODE = 'found';

export const NOTFOUND_ERROR_CODE = 'notFoundError';

export const SERVER_ERROR_CODE = 'serverError';

export const MAP_STATUS_CODE = new Map<string, ErrorLabel>([
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

export const CUSTOM_STATUS_CODE = [
    {
        code: FOUND_CODE,
        message: 'Tìm thấy',
    },
    {
        code: NOTFOUND_ERROR_CODE,
        message: 'Không tìm thấy sản phẩm nào cho từ khóa',
    },
    {
        code: SERVER_ERROR_CODE,
        message: 'Có lỗi xảy ra. Xin vui lòng thử lại sau',
    },
];
