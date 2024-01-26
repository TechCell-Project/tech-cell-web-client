'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@styles/components/cart.module.scss';
import { toast } from 'react-toastify';
import {
    ProductDTO,
    ProductCartSchemaDTO,
    ProductVariationDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';

import { AddCartItemModel } from '@models/Cart';
import { currencyFormat, upperCase } from 'utils/funcs';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import { useCart } from '@hooks/userCart';
import { Box } from '@mui/material';

type productDataProps = {
    currentProduct: ProductDTO;
    productCart: ProductCartSchemaDTO;
    isChecked: boolean;
    handleCheckBox: (id: string) => void;
    passThisItemPrice: (id: string, sku: string, price: number) => void;
};

export const ItemCard = (props: productDataProps) => {
    const { currentProduct, productCart, isChecked, handleCheckBox, passThisItemPrice } = props;

    const { refreshCart, addItemToCart } = useCart();
    const [updateInfo, setUpdateInfo] = useState<AddCartItemModel | null>(null);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [currentVariant, setCurrentVariant] = useState<ProductVariationDTO | undefined>(
        undefined,
    );

    useEffect(() => {
        if (currentProduct && productCart) {
            setCurrentVariant(
                currentProduct.variations.find((variation) => variation.sku === productCart.sku),
            );
        }
    }, [currentProduct, productCart]);

    useEffect(() => {
        if (updateInfo) {
            const timer1 = setTimeout(() => {
                addItemToCart({
                    productId: updateInfo.productId ?? '',
                    sku: updateInfo.sku ?? '',
                    quantity: updateInfo.quantity,
                });

                const timer2 = setTimeout(() => {
                    refreshCart();
                }, 300);

                return () => clearTimeout(timer2);
            }, 600);

            return () => clearTimeout(timer1);
        }
    }, [updateInfo]);

    useEffect(() => {
        if (currentVariant) {
            setTotalAmount(
                currentVariant?.price?.saleOff
                    ? currentVariant.price.saleOff * productCart.quantity
                    : currentVariant.price.base * productCart.quantity,
            );
        }
    }, [currentVariant, productCart]);

    useEffect(() => {
        passThisItemPrice(productCart.productId!, productCart.sku!, totalAmount);
    }, [totalAmount]);

    const handleUpdateQuantity = (quantityUpdate: number) => {
        if (!currentVariant) {
            return;
        }

        const currentQuantity = updateInfo !== null ? updateInfo.quantity : productCart.quantity;
        let newQuantity = currentQuantity + quantityUpdate;

        if (newQuantity <= 0) {
            newQuantity = 1;
        }
        if (newQuantity > currentVariant.stock) {
            toast.info('Số lượng sản phẩm không đủ để đáp ứng!');
            newQuantity = currentVariant.stock;
        }
        setUpdateInfo({
            ...productCart,
            quantity: newQuantity,
        });
    };

    const handleChange = () => {
        handleCheckBox(`${productCart.productId}-/-${productCart.sku}-/-${productCart.quantity}`);
    };

    return (
        currentVariant && (
            <div className={styles.cart_content}>
                <div className={styles.product_cart}>
                    <div className={styles.product_cart_check}>
                        <Checkbox
                            checked={isChecked}
                            onChange={handleChange}
                            sx={{
                                color: 'rgba(238, 73, 73, 0.8)',
                                '&.Mui-checked': {
                                    color: 'rgba(238, 73, 73)',
                                },
                            }}
                        />
                    </div>
                    {/* <div className={styles.product_cart_img}> */}
                    <Box
                        sx={{
                            display: { sm: 'block', xs: 'none' },
                        }}
                    >
                        <Image
                            src={
                                currentVariant?.images[0].url ??
                                currentProduct?.generalImages[0].url
                            }
                            height={80}
                            width={80}
                            alt='product image'
                        />
                    </Box>

                    <Box
                        sx={{
                            display: { sm: 'none', xs: 'block' },
                        }}
                    >
                        <Image
                            src={
                                currentVariant?.images[0].url ??
                                currentProduct?.generalImages[0].url
                            }
                            height={45}
                            width={60}
                            alt='product image'
                        />
                    </Box>
                    {/* </div> */}

                    <div className={styles.product_info}>
                        <div className={styles.product_text}>
                            <div className={styles.product_heading}>{currentProduct.name}</div>
                            <Typography
                                sx={{
                                    fontSize: {
                                        sm: '14px',
                                        xs: '10px',
                                    },
                                    fontWeight: 'bold',
                                }}
                            >
                                {currentVariant.attributes.map((attr, index) => {
                                    let str = '';
                                    const unit = attr.u ?? '';
                                    const separate = index !== 0 ? ' - ' : ('' as string);
                                    str += separate + upperCase(attr.v) + unit;
                                    return str;
                                })}
                            </Typography>
                            <div className={styles.product_price}>
                                <div className={styles.product_price_new}>
                                    {currencyFormat(
                                        currentVariant.price.saleOff
                                            ? currentVariant.price.saleOff * productCart.quantity
                                            : currentVariant.price.base * productCart.quantity,
                                    )}{' '}
                                    VND
                                </div>
                                <div className={styles.product_price_old}>
                                    <span>
                                        {currencyFormat(
                                            currentVariant.price.base * productCart.quantity,
                                        )}{' '}
                                        VND
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_quanity}>
                            <button
                                type='button'
                                className={styles.product_quanity_btn}
                                onClick={() => handleUpdateQuantity(-1)}
                            >
                                -
                            </button>
                            <div className={styles.product_quanity_number}>
                                {updateInfo ? updateInfo.quantity : productCart.quantity}
                            </div>
                            <button
                                type='button'
                                className={styles.product_quanity_btn}
                                onClick={() => handleUpdateQuantity(1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.product_cart_delete}>
                        <IconButton
                            aria-label='delete'
                            color='primary'
                            onClick={() => setUpdateInfo({ ...productCart, quantity: 0 })}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    );
};
