import instance from './Instance';
import { CATEGORIES_ENDPOINT } from '@constants/Services';
import { Paging } from '@models/Common';

export const getCategories = (payload: Paging) => {
    const { page, pageSize, keyword } = payload;
    let url = `${CATEGORIES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return instance.get<Paging>(url);
};

export const getCategoryByLabel = (label: string) =>
    instance.get(`${CATEGORIES_ENDPOINT}/label/${label}`);
