import React from 'react';
import styles from '@styles/components/product.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    image: string;
    name: string;
    price: number;
    star: string;
    whislist: string;
}

const CardComponent = () => {
    return (
        <div className={styles.product}>
            <div className={styles.productInfoContainer}>
                <Link href="/productdetail">
                    <div className={styles.productInfo}>
                        <div className={styles.productImgContent}>
                            <div className={styles.productImgitem}>
                                <Image
                                    src="/product_img/phone1.webp"
                                    width={160}
                                    height={160}
                                    alt="phone1"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className={styles.productNameproduct}>
                                OPPO Reno8 T 5G (8GB - 128GB)
                            </h3>
                        </div>
                        <div className={styles.productPrice}>
                            <div className={styles.productNewprice}>
                                9.490.000<sup>đ</sup>
                            </div>
                            <div className={styles.productOldprice}>
                                9.990.000
                                <sup>đ</sup>
                            </div>
                        </div>
                        <div className={styles.productContentpromotion}>
                            <div className={styles.productPromotion}>
                                <p>Tặng thêm dịch vụ bảo hành Vip 12 tháng 1 đổi 1</p>
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