import { ProductStatus } from '@constants/enum';
import { IUser } from '@interfaces/auth'
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ImageModel } from '@models/Product';

// get information from local storage
export const getCurrentUserId = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user._id;
    return id;
  }
  return null;
};

export const getCurrentUserRole = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const id = user.role;
    return id;
  }
  return null;
};

export const getAccessToken = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const accessToken = user.accessToken;
    return accessToken;
  }
  return null;
};

export const getRefreshToken = () => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    const refreshToken = user.refreshToken;
    return refreshToken;
  }
  return null;
};

// authentication
export const setToken = (accessToken: string, refreshToken: string) => {
  const userObj = localStorage.getItem("user");
  if (userObj) {
    const user: IUser = JSON.parse(userObj);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(user));
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
    case "User":
      return "Khách hàng";
    case "Admin":
      return "Quản trị viên";
    case "Mod":
      return "Điều hành viên";
    case "SuperAdmin":
      return "Quản lý";
    default:
      return "";
  }
}; 

export const formatDateViVN = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("vi-VN", options);
};

export const isRoleAccepted = (role?: string): boolean => {
  const currentRole = getCurrentUserRole();

  switch (currentRole) {
    case "SuperAdmin":
      return true;
    case "Admin":
      return role !== getRole("SuperAdmin") && role !== getRole("Admin");
    case "Mod":
      return role === getRole("User");
    default:
      return false;
  }
};

// get status product
const productStatusMapping: { [key: number]: string } = {
  [ProductStatus.ComingSoon]: "Sắp ra mắt",
  [ProductStatus.NewArrival]: "Hàng mới về",
  [ProductStatus.Pre_order]: "Đặt hàng trước",
  [ProductStatus.OnSales]: "Đang bán",
  [ProductStatus.Hide]: "Ẩn",
  [ProductStatus.NotSales]: "Không bán",
  [ProductStatus.LowStock]: "Còn ít hàng",
  [ProductStatus.TemporarilyOutOfStock]: "Tạm thời hết hàng",
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
export const currencyFormat = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}