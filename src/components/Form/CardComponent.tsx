import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@styles/components/product.module.scss';

import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { PriceModel } from '@models/Product';
import { RootPath } from '@constants/enum';
import { convertSlugUrl, currencyFormat } from 'utils';

interface ProductDataProps {
    initialData: {
        id: string;
        name: string;
        category: string;
        price: PriceModel;
        image: string;
    };
}

const CardComponent: FC<ProductDataProps> = ({ initialData }) => {
    return (
        <div className={styles.product}>
            <div className={styles.productInfoContainer}>
                <Link
                    href={`${RootPath.ProductDetails}/${convertSlugUrl(initialData.name)}-${
                        initialData.id
                    }`}
                >
                    <div className={styles.productInfo}>
                        <div className={styles.productImgContent}>
                            <div className={styles.productImgitem}>
                                <Image
                                    src={
                                        initialData !== undefined
                                            ? initialData.image
                                            : '/product_img/phone1.webp'
                                    }
                                    width={160}
                                    height={160}
                                    alt='product thumbnail'
                                />
                            </div>
                        </div>
                        <h3 className={styles.productNameproduct}>{initialData.name}</h3>
                        <div className={styles.productPrice}>
                            <div className={styles.productNewprice}>
                                {currencyFormat(
                                    Number(
                                        initialData.price.special !== 0
                                            ? initialData.price.special
                                            : initialData.price.base,
                                    ),
                                )}
                                <sup>đ</sup>
                            </div>
                            {initialData.price.special !== 0 && (
                                <div className={styles.productOldprice}>
                                    {currencyFormat(Number(initialData.price.base))}
                                    <sup>đ</sup>
                                </div>
                            )}
                        </div>
                        <div className={styles.productContentpromotion}>
                            <div className={styles.productPromotion}>
                                <p>Khuyến mãi</p>
                            </div>
                        </div>
                        <div className={styles.productRating}>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                        </div>
                    </div>
                    <div className={styles.productWishlist}>
                        <span>Yêu thích</span>
                        <div className={styles.productIconheart}>
                            <FavoriteIcon />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardComponent;
