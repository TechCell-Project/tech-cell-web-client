import instancePublic from '@config/instancePublic.config';
import { IMAGES_ENDPOINT } from '@constants/Services';

export const getImageById = (id: string) => instancePublic.get(`${IMAGES_ENDPOINT}/${id}`);
