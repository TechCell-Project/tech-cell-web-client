import Img1 from '@public/carousel_img/img1.png';
import Img2 from '@public/carousel_img/img2.png';
import Img3 from '@public/carousel_img/img3.png';
import Img4 from '@public/carousel_img/img4.png';

export type ImageLabel = {
    src: string;
    alt: string;
};

export const IMAGE_CAROUSEL: ImageLabel[] = [
    { src: Img1.src, alt: 'first' },
    { src: Img2.src, alt: 'second' },
    { src: Img3.src, alt: 'third' },
    { src: Img4.src, alt: 'fourth' },
];
