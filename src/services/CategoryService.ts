import { axiosPublic } from '@libs/axios';
import { CATEGORIES_ENDPOINT } from '@constants/Services';
import { Paging } from '@models/Common';

export const getCategories = (payload: Paging) => {
    const { page, pageSize, keyword } = payload;
    let url = `${CATEGORIES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return axiosPublic.get<Paging>(url);
};

export const getCategoryByLabel = (label: string) =>
    axiosPublic.get(`${CATEGORIES_ENDPOINT}/label/${label}`);
