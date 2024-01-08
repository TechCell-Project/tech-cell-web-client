import { IMAGES_ENDPOINT } from '@constants/Services';
import { ImageModel } from '@models/Product';
import { axiosAuth } from '@libs/axios';

export const getImageById = (id: string) => axiosAuth.get(`${IMAGES_ENDPOINT}/${id}`);

export const postImage = (payload: FormData) =>
    axiosAuth.post<ImageModel>(IMAGES_ENDPOINT, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    });

export const postImages = (payload: FormData) =>
    axiosAuth.post(`${IMAGES_ENDPOINT}/array`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    });
