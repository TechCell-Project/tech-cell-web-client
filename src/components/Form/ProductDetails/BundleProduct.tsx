import React from 'react';
import { product } from './product';
import Image from 'next/image';
import styles from '@styles/components/productdetail.module.scss';

const bundledItems = [
    {
        imgBundle: '/img_productDetail/ip14_1.webp',
        nameBundle: 'Iphone14',
        priceBundle: 1200000,
        priceBundle_old: 2300000,
    },
    {
        imgBundle: '/img_productDetail/ip14_1.webp',
        nameBundle: 'Iphone14',
        priceBundle: 1200000,
        priceBundle_old: 2300000,
    },
    {
        imgBundle: '/img_productDetail/ip14_1.webp',
        nameBundle: 'Iphone14',
        priceBundle: 1200000,
        priceBundle_old: 2300000,
    },
];

export const BundleProduct = () => {
    return (
        <>
            {bundledItems.map((bundleds, index) => (
                <div key={`${bundleds.imgBundle}/${index}`} className={styles.product_bundled_content}>
                    <div className={styles.product_bundled_left}>
                        <div className={styles.product_bundled_img}>
                            <Image src={bundleds.imgBundle} width={68} height={68} alt="" />
                        </div>
                    </div>
                    <div className={styles.product_bundled_right}>
                        <div className={styles.product_bundled_info}>
                            <div className={styles.product_bundled_name}>{bundleds.nameBundle}</div>
                            <div className={styles.product_bundled_price_btn}>
                                <div className={styles.product_bundled_price}>
                                    {bundleds.priceBundle}đ
                                    <div className={styles.product_bundled_old}>
                                        {bundleds.priceBundle_old}đ
                                    </div>
                                </div>

                                <div className={styles.product_bundled_btn}>
                                    <a href="#">Thêm vào giỏ hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
