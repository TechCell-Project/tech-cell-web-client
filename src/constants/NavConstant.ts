import { CATEGORY_PARAM, PHONE_CATEGORIES } from './ValidApisParams';
import { upperCase } from '@/utils/funcs';

export interface NavLinks {
    label: string;
    value: string;
    searchQuery: URLSearchParams;
}

export const DRAWER_WIDTH: number = 280;

function getSearchParamsQuery(key: string, value: string): URLSearchParams {
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append(key, value);

    return searchParams;
}

export const NAV_CATEGORIES: NavLinks[] = PHONE_CATEGORIES.map((cat) => {
    return {
        label: upperCase(cat),
        value: cat,
        searchQuery: getSearchParamsQuery(CATEGORY_PARAM, cat),
    };
});
