export const API_ENDPOINT = process.env.API_ENDPOINT;

export const AUTH_LOGIN = `${API_ENDPOINT}/auth/login`;
export const AUTH_LOGIN_GOOGLE = `${API_ENDPOINT}/auth/google`;

// Authentication
export const LOGIN_ENDPOINT = '/auth/login';
export const REGISTER_ENDPOINT = '/auth/register';
export const VERIFY_EMAIL_ENDPOINT = '/auth/verify-email';
export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token';
export const FORGOT_PASSWORD = '/auth/forgot-password';
export const VERIFY_FORGOT_PASSWORD = '/auth/verify-forgot-password';

// Management Account
export const USERS_ENDPOINT = '/users';

// Management Product
export const PRODUCTS_ENDPOINT = '/products';

// Categories
export const CATEGORIES_ENDPOINT = '/categories';

// Attributes
export const ATTRIBUTES_ENDPOINT = '/attributes';

// Images
export const IMAGES_ENDPOINT = '/images';

// Carts Management
export const CART_ENDPOINT = '/carts';

// get provinces
export const LOCATION_PROVINCES_ENDPOINT = '/address/provinces';

// current user profile
export const PROFILE_ENDPOINT = '/profile';