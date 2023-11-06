import instance from './Instance';
import { IMAGES_ENDPOINT } from '@constants/Services';

export const getImageById = (id: string) => instance.get(`${IMAGES_ENDPOINT}/${id}`);
