import { CATEGORY } from './PhoneConstant';
import { Article, Shipping, ShoppingCart } from '@components/svgs';
// import ArticleIcon from '@mui/icons-material/ArticleOutlined';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
// import LocalShippingIcon from '@mui/icons-material/LocalShippingRounded';


export const DRAWER_WIDTH: number = 240;

export const NAV_ITEMS = [
    { name: 'Danh mục', menu: CATEGORY, icon: Article, isNav: true },
    { name: 'Tra cứu đơn hàng', icon: Shipping },
    { name: 'Giỏ hàng', icon: ShoppingCart, href: '/gio-hang' },
];
