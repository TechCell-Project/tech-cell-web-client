'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/components/slider.module.scss';
// interface ProductCard{
//     img:String,
//     productName:String,
// }

export function CardRelatedProduct() {
    return (
        <>
            <div className={styles.product}>
                <div className={styles.product_silder_container}>
                    <Link href="">
                        <div className={styles.product_slider_info}>
                            <div className={styles.prouct_slider_img}>
                                <Image
                                    src="/product_img/phone1.webp"
                                    width={160}
                                    height={160}
                                    alt="phone1"
                                />
                            </div>
                            <div className={styles.product_slider_name}>
                                OPPO Reno8 T 5G (8GB - 128GB)
                            </div>
                            <div className={styles.product_slider_price}>
                                    9.490.000<sup>đ</sup>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
