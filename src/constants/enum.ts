export enum Roles {
    User = 'User',
    Admin = 'Admin',
    Mod = 'Mod',
    SuperAdmin = 'SuperAdmin',
}

export enum ProductStatus {
    ComingSoon = 1,
    NewArrival = 2,
    Pre_order = 3,
    OnSales = 4,
    Hide = 5,
    NotSales = 6,
    LowStock = 7,
    TemporarilyOutOfStock = 8,
}

export enum RootPath {
    Home = '/',
    Login = '/dang-nhap',
    Register = '/dang-ky-tai-khoan',
    Cart = '/gio-hang',
    Search = '/tim-kiem',
    ProductList = '/danh-sach-san-pham',
    ProductDetails = '/chi-tiet-san-pham',
    Profile = '/ho-so',
    Order = '/don-hang',
    OrderDetails = '/chi-tiet-don-hang',
}
