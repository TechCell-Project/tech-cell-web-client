import React, { useState } from 'react';
import { product } from './product';
import styles from '../../../styles/components/productdetail.module.scss';

export const ChosseProduct = () => {
    // Xử lý click chọn dung lượng sản phẩm
    const [selectedInternal, setselectedInternal] = useState(product.internal[0].capacity);
    return (
        <>
            <div className={styles.product_internal_}>
                {product.internal.map((internal) => (
                    <div key={internal.capacity}>
                        <button
                            className={`${
                                internal.capacity === selectedInternal
                                    ? `${styles.activeInternal}`
                                    : ''
                            }`}
                            onClick={() => setselectedInternal(internal.capacity)}
                        >
                            <div className={styles.product_internal_text}>
                                <p>{internal.capacity}</p>
                                <p>{internal.price_capacity}</p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};