import React from 'react';

import styles from '@styles/components/cart.module.scss';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CartPromotions = () => {
    return (
        <div className={styles.cart_promotions}>
            <div className={styles.cart_promotion_header}>
                <div className={styles.cart_promotion_icon}>
                    <ShoppingBagIcon />
                </div>
                <div className={styles.cart_promotion_text}>Chương trình khuyến mãi</div>
            </div>
            <ul className={styles.cart_promotion_list}>
                <span></span>
                <li>Mua Office Home & Student 2021 kèm Macbook chỉ còn 2,090,000</li>
            </ul>
        </div>
    );
};

export default CartPromotions;