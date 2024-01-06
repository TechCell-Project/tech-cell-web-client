import { PagingAttribute } from '@models/Attribute';
import { ATTRIBUTES_ENDPOINT } from '@constants/Services';
import { axiosPublic } from '@libs/axios';

export const getAttributes = (payload: PagingAttribute) => {
    const { keyword, select_type, page, pageSize } = payload;

    let url = `${ATTRIBUTES_ENDPOINT}?page=${page + 1}&pageSize=${pageSize}`;

    if (select_type) {
        url += `&select_type=${select_type}`;
    }
    if (keyword) {
        url += `&keyword=${keyword}`;
    }

    return axiosPublic.get<PagingAttribute>(url);
};

export const getByIdAttribute = (id: string) => axiosPublic.get(`${ATTRIBUTES_ENDPOINT}/${id}`);

export const getByLabelAttribute = (label: string) =>
    axiosPublic.get(`${ATTRIBUTES_ENDPOINT}/label/${label}`);
