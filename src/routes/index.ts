import { CART_ENDPOINT, CHANGE_PASSWORD_ENDPOINT, IMAGES_ENDPOINT, ORDER_ENDPOINT, PROFILE_ENDPOINT, REVIEW_ORDER_ENDPOINT, UPDATE_PROFILE_ADDRESS_ENDPOINT, UPDATE_PROFILE_INFO_ENDPOINT } from '@/constants';
import { RootPath } from '@/constants/enum';

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    RootPath.Home,
    RootPath.Login,
    RootPath.ProductDetails,
    RootPath.ProductList,
    RootPath.Register,
    RootPath.Search,
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [RootPath.Cart, RootPath.Profile];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = [
    CHANGE_PASSWORD_ENDPOINT,
    IMAGES_ENDPOINT,
    CART_ENDPOINT,
    PROFILE_ENDPOINT,
    UPDATE_PROFILE_ADDRESS_ENDPOINT,
    UPDATE_PROFILE_INFO_ENDPOINT,
    ORDER_ENDPOINT,
    REVIEW_ORDER_ENDPOINT,
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = RootPath.Home;
