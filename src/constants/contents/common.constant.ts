import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

export const HOME_SLOGAN = 'UPGRADE YOUR CONNECTIVITY: SMART DEALS, SMARTER PHONES!';
export const BENEFIT_SECTION: Array<{
    Icon: OverridableComponent<SvgIconTypeMap>;
    title: string;
    desc: string;
}> = [
    {
        Icon: RocketLaunchRoundedIcon,
        title: 'Vận chuyển nhanh',
        desc: 'Miễn phí vận chuyển cho đơn hàng từ 2 triệu',
    },
    {
        Icon: CachedRoundedIcon,
        title: 'Đổi trả & hoàn tiền',
        desc: 'Quy trình đổi trả dễ dàng',
    },
    {
        Icon: PhoneRoundedIcon,
        title: 'Liên hệ',
        desc: 'Chăm sóc khách hàng 24/7',
    },
    {
        Icon: CreditCardRoundedIcon,
        title: 'Thanh toán',
        desc: 'VNPay & COD trả tiền khi nhận hàng',
    },
];

export type StatusLabel = {
    key: string;
    label: string;
};

export const STATUS_ALL = 'all';
export const STATUS_PENDING = 'pending';
export const STATUS_PROCESSING = 'processing';
export const STATUS_COMPLETED = 'completed';
export const STATUS_CANCELLED = 'cancelled';
export const STATUS_REFUNDED = 'refunded';
export const STATUS_SHIPPING = 'shipping';
export const STATUS_WAIT_FOR_PAYMENT = 'wait_for_payment';

export const COMMON_STATUS_KEYS = [
    STATUS_ALL,
    STATUS_PENDING,
    STATUS_PROCESSING,
    STATUS_COMPLETED,
    STATUS_CANCELLED,
    STATUS_REFUNDED,
];

export const ORDER_STATUS_KEYS = [...COMMON_STATUS_KEYS, STATUS_SHIPPING];

export const PAYMENT_STATUS_KEYS = [...COMMON_STATUS_KEYS, STATUS_WAIT_FOR_PAYMENT];

const COMMON_STATUSES: Map<string, StatusLabel> = new Map<string, StatusLabel>([
    [
        STATUS_ALL,
        {
            key: STATUS_ALL,
            label: 'Tất cả',
        },
    ],
    [
        STATUS_PENDING,
        {
            key: STATUS_PENDING,
            label: 'Đang chờ xác nhận',
        },
    ],
    [
        STATUS_CANCELLED,
        {
            key: STATUS_CANCELLED,
            label: 'Đã hủy',
        },
    ],
    [
        STATUS_REFUNDED,
        {
            key: STATUS_REFUNDED,
            label: 'Đã hoàn tiền',
        },
    ],
]);

export const ORDER_STATUSES: Map<string, StatusLabel> = new Map(COMMON_STATUSES);
ORDER_STATUSES.set(STATUS_SHIPPING, {
    key: STATUS_SHIPPING,
    label: 'Đang giao hàng',
});
ORDER_STATUSES.set(STATUS_COMPLETED, {
    key: STATUS_COMPLETED,
    label: 'Đã giao hàng',
});
ORDER_STATUSES.set(STATUS_PROCESSING, {
    key: STATUS_PROCESSING,
    label: 'Đơn của bạn đang được xử lí',
});

export type ValidOrderStatus = keyof typeof ORDER_STATUSES;

export const PAYMENT_STATUSES: Map<string, StatusLabel> = new Map(COMMON_STATUSES);
PAYMENT_STATUSES.set(STATUS_WAIT_FOR_PAYMENT, {
    key: STATUS_WAIT_FOR_PAYMENT,
    label: 'Chờ thanh toán',
});
PAYMENT_STATUSES.set(STATUS_COMPLETED, {
    key: STATUS_COMPLETED,
    label: 'Đã thanh toán',
});
PAYMENT_STATUSES.set(STATUS_PROCESSING, {
    key: STATUS_PROCESSING,
    label: 'Đang xử lí',
});

export const PAYMENT_METHODS: Array<string> = ['COD', 'VNPAY', 'ATM', 'VISA', 'MASTERCARD', 'JCB'];
