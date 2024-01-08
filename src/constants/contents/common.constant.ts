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
