import { IMAGES_ENDPOINT } from '@constants/Services';
import { axiosAuth } from '@libs/axios';
import { ImageModel } from '@models/Product';

export const getImageById = (id: string) => axiosAuth.get(`$${IMAGES_ENDPOINT}/${id}`);

export const postImage = (payload: FormData) =>
    axiosAuth.post<ImageModel>(IMAGES_ENDPOINT, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    });
