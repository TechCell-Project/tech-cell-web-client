export const CATEGORY = [
    { label: 'Điện thoại, Tablet', value: 1, to: '/phone' },
    { label: 'Laptop', value: 2, to: '/laoptop' },
    { label: 'Tai nghe', value: 3, to: '/tainghe' },
    { label: 'Đồng hồ, Máy ảnh', value: 4, to: '/dongho&mayanh' },
    { label: 'Phụ kiện', value: 5, to: '/phukien' },
    { label: 'PC, Màn hình', value: 6, to: '/pc&manhinh' },
    { label: 'Tivi', value: 7, to: '/tivi' },
    { label: 'Hàng cũ', value: 8, to: '/hangcu' },
    { label: 'Chương trình khuyến mãi', value: 9, to: '/khuyenmai' },
    { label: 'Tin công nghệ', value: 10, to: '/tintuc' },
];

export const BRANDS = [
    {
        label: 'Apple',
        value: 1,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-1_txqyc5.webp',
        to: '/apple',
    },
    {
        label: 'Samsung',
        value: 2,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-2_hzsaee.webp',
        to: '/samsung',
    },
    {
        label: 'Xiaomi',
        value: 3,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-3_nrvhev.webp',
        to: '/xiaomi',
    },
    {
        label: 'Oppo',
        value: 4,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-4_drysg3.webp',
        to: '/oppo',
    },
    {
        label: 'Realme',
        value: 7,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-5_y2aihk.webp',
        to: '/realme',
    },
    {
        label: 'Nokia',
        value: 6,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-6_jqwqee.webp',
        to: '/nokia',
    },
    {
        label: 'Oneplus',
        value: 9,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-7_zvbyo1.webp',
        to: '/oneplus',
    },
    {
        label: 'Asus',
        value: 8,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-8_luwhky.webp',
        to: '/asus',
    },
    {
        label: 'Vivo',
        value: 5,
        brandImg:
            'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-9_gi96qu.webp',
        setWidth: 76.4,
        to: '/vivo',
    },
];

// sản phẩm đính kèm attached
export const PRODUCT_ATTACHED = [
    {
        value: 1,
        img: '/img_productDetail/ip14_2.webp',
        name: 'Mua kèm bàn ghế công thái học',
        discount: 'Giảm thêm 10%',
        alt: 'img',
    },
    {
        value: 2,
        img: '/img_productDetail/ip14_2.webp',
        name: 'Mua kèm bàn ghế công thái học',
        discount: 'Giảm thêm 10%',
        alt: 'img',
    },
    {
        value: 3,
        img: '/img_productDetail/ip14_2.webp',
        name: 'Mua kèm bàn ghế công thái học',
        discount: 'Giảm thêm 10%',
        alt: 'img',
    },
    {
        value: 4,
        img: '/img_productDetail/ip14_2.webp',
        name: 'Mua kèm bàn ghế công thái học',
        discount: 'Giảm thêm 10%',
        alt: 'img',
    },
];

export const DETAIL_CATEGORIES = [
    {
        key: 'mobile-demand',
        title: 'Nhu cầu sử dụng',
        categories: [
            {
                key: 'gaming',
                value: 'Chơi game',
            },
            {
                key: 'high-end',
                value: 'Cấu hình cao',
            },
            {
                key: 'high-battery',
                value: 'Pin trâu',
            },
            {
                key: 'comfortable',
                value: 'Mỏng nhẹ',
            },
            {
                key: 'photography',
                value: 'Chụp ảnh đẹp',
            },
        ],
    },
    {
        key: 'mobile-type',
        title: 'Loại điện thoại',
        categories: [
            {
                key: 'iOS',
                value: 'iPhone(iOS)',
            },
            {
                key: 'android',
                value: 'Android',
            },
            {
                key: 'popular-mobile',
                value: 'Điện thoại phổ thông',
            },
        ],
    },
    {
        key: 'mobile-ability',
        title: 'Tính năng đặc biệt',
        categories: [
            {
                key: 'wireless-charging',
                value: 'Sạc không dây',
            },
            {
                key: 'fingerprint-security',
                value: 'Bảo mật vân tay',
            },
            {
                key: 'face-id',
                value: 'Face ID',
            },
            {
                key: 'waterproof',
                value: 'Chống nước',
            },
            {
                key: '5g-support',
                value: 'Hỗ trợ 5G',
            },
        ],
    },
];
