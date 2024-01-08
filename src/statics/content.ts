import { CarouselComponentProps } from '@components/Form/CarouselComponent';
import { getPublicContents } from '@utils/directory.util';

export const carouselImages: CarouselComponentProps['carouselImages'] =
    getPublicContents('carousel_img');
