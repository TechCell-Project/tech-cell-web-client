import React from 'react';
import Image from 'next/image';

import styles from '@styles/components/cart.module.scss';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CartSaleBanners = () => {
    return (
        <div className={styles.cart_buy_savings}>
            <div className={styles.cart_buy_header}>
                <div className={styles.cart_buy_header_icon}>
                    <ShoppingBagIcon />
                </div>
                <div className={styles.cart_buy_header_text}>Mua kèm tiết kiệm hơn</div>
            </div>

            <div className={styles.cart_buy_list}>
                <div className={styles.cart_buy_card}>
                    <div className={styles.card_product}>
                        <div className={styles.card_product_img}>
                            <Image
                                src='/img_productDetail/ip14_2.webp'
                                width={70}
                                height={70}
                                alt='product'
                            />
                        </div>
                        <div className={styles.card_product_name}>
                            Mua kèm bàn ghế công thái học
                        </div>
                        <div className={styles.card_product_discount}>Giảm thêm 10%</div>

                        <div className={styles.card_product_btn}>Chọn sản phẩm</div>
                    </div>
                </div>

                <div className={styles.cart_buy_card}>
                    <div className={styles.card_product}>
                        <div className={styles.card_product_img}>
                            <Image
                                src='/img_productDetail/ip14_2.webp'
                                width={70}
                                height={70}
                                alt='product'
                            />
                        </div>
                        <div className={styles.card_product_name}>
                            Mua kèm bàn ghế công thái học
                        </div>
                        <div className={styles.card_product_discount}>Giảm thêm 10%</div>

                        <div className={styles.card_product_btn}>Chọn sản phẩm</div>
                    </div>
                </div>

                <div className={styles.cart_buy_card}>
                    <div className={styles.card_product}>
                        <div className={styles.card_product_img}>
                            <Image
                                src='/img_productDetail/ip14_2.webp'
                                width={70}
                                height={70}
                                alt='product'
                            />
                        </div>
                        <div className={styles.card_product_name}>
                            Mua kèm bàn ghế công thái học
                        </div>
                        <div className={styles.card_product_discount}>Giảm thêm 10%</div>

                        <div className={styles.card_product_btn}>Chọn sản phẩm</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSaleBanners;
