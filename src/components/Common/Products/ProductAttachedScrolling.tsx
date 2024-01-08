'use client';

import React, { FC, HTMLAttributes } from 'react';
import Paper from '@mui/material/Paper';
import { Box, styled } from '@mui/material';
import Image from 'next/image';
import { PRODUCT_ATTACHED } from '@constants/PhoneConstant';
import styles from '@styles/components/cart.module.scss';

const ProductAttached = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    border: `1px solid ${theme.color.lightGray}`,
    color: theme.color.black,
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    margin: '0px 10px 10px 0px',
    '& a': {
        display: 'flex',
        padding: '2px 4px',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

interface Props {
    className: string;
}

const ProductAttachedScrolling: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ className }) => {
    return (
        <Box className={className}>
            {PRODUCT_ATTACHED.map((product) => (
                <ProductAttached elevation={0} key={product.value}>
                    <div className={styles.cart_buy_card}>
                        <div className={styles.card_product}>
                            <div className={styles.card_product_img}>
                                <Image src={product.img} width={70} height={70} alt={product.alt} />
                            </div>
                            <div className={styles.card_product_name}>{product.name}</div>
                            <div className={styles.card_product_discount}>{product.discount}</div>
                            <div className={styles.card_product_btn}>Chọn sản phẩm</div>
                        </div>
                    </div>
                </ProductAttached>
            ))}
        </Box>
    );
};

export default ProductAttachedScrolling;
