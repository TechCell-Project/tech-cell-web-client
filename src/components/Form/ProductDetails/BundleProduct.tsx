import React from 'react';
import { product } from './product';
import Image from 'next/image';
import styles from '../../../styles/components/productdetail.module.scss';

export const BundleProduct = () => {
    return (
        <>
            {product.bundledItems.map((bundleds) => (
                <div key={bundleds.imgBundle} className={styles.product_bundled_content}>
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