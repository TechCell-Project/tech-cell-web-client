'use client';

import React, { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { ShippingData, VariantInCart } from '@interfaces/cart';
import { AddCartItemModel } from '@models/Cart';
import { currencyFormat, getSingleProductVariant } from 'utils';

import OrderListItems from './OrderListItems';
import SkeletonCartItem from '../Display/SkeletonCartItem';

const SaleButton = styled(Button)(({ theme }) => ({
    border: `1px solid ${theme.color.red}`,
    background: theme.color.red,
    color: 'white',
    '&:hover': { color: theme.color.red },
}));

const PaymentInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px 0',
    borderBottom: `1px solid ${theme.color.lightGray}`,
    fontSize: '15px',
    fontWeight: '400',
    color: theme.color.gray,
    '& div': {
        display: 'flex',
        justifyContent: 'space-between',
    },
    '& .discount': {
        color: theme.color.red,
    },
    '& .total': {
        '& span': { fontWeight: '400' },
        fontWeight: '600',
        color: theme.color.black,
    },
}));

export const OrderListTitle = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.color.red}`,
    borderRadius: '3px',
    margin: '15px 0',
    padding: '6px 0',
    '& .MuiTypography-root': {
        textTransform: 'capitalize',
        fontWeight: 600,
        fontSize: '14px',
        color: theme.color.red,
    },
}));

interface OrderProps {
    items: AddCartItemModel[];
    totalProductPrice: number;
    shipping: ShippingData | null;
}

const OrderList: FC<OrderProps> = ({ items, totalProductPrice, shipping }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [variants, setVariants] = useState<VariantInCart[]>([]);

    useEffect(() => {
        if (items.length !== 0) {
            const fetches = items.map((item) => getSingleProductVariant(item));
            Promise.all(fetches)
                .then((variants) => {
                    setVariants(variants);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch product details:', error);
                    setIsLoading(false);
                });
        }
    }, [items]);

    console.log(variants);

    const getTotalQuantity = (orderItems: AddCartItemModel[]) => {
        let totalQuantity = 0;
        orderItems.forEach((item) => {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    };

    console.log(shipping);

    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px 15px' }}>
            <OrderListTitle>
                <Typography variant='subtitle1' fontSize='14px'>
                    Danh sách sản phẩm
                </Typography>
            </OrderListTitle>
            {isLoading &&
                items.map((item) => <SkeletonCartItem key={item.productId! + item.sku!} />)}
            <OrderListItems list={variants} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <TextField
                    id='standard-basic'
                    label='Nhập mã giảm giá'
                    variant='standard'
                    sx={{ width: '85%' }}
                />
                <SaleButton>Áp dụng</SaleButton>
            </Box>
            {isLoading ? (
                <Skeleton
                    variant='rounded'
                    animation='wave'
                    sx={{ width: '100%', height: '200px' }}
                />
            ) : (
                <Box sx={{ margin: '15px 0' }}>
                    <PaymentInfoBox>
                        <Box>
                            <p>Số lượng sản phẩm</p>
                            <p>{getTotalQuantity(items)}</p>
                        </Box>
                        <Box>
                            <p>Tiền hàng (tạm tính)</p>
                            <p>{currencyFormat(totalProductPrice)}</p>
                        </Box>
                        <Box>
                            <p>Phí vận chuyển</p>
                            <p>
                                {shipping
                                    ? currencyFormat(shipping[Object.keys(shipping)[0]].total)
                                    : 'Miễn phí'}
                            </p>
                        </Box>
                    </PaymentInfoBox>
                    <PaymentInfoBox>
                        <Box>
                            <p>Giảm giá khuyến mãi</p>
                            <p className='discount'>- 1.000.000</p>
                        </Box>
                    </PaymentInfoBox>
                    <PaymentInfoBox>
                        <Box className='total'>
                            <p>
                                Tổng tiền <span>(đã gồm VAT)</span>
                            </p>
                            <p>
                                {currencyFormat(
                                    shipping
                                        ? totalProductPrice -
                                              shipping[Object.keys(shipping)[0]].total
                                        : totalProductPrice,
                                )}
                            </p>
                        </Box>
                    </PaymentInfoBox>
                </Box>
            )}
        </Box>
    );
};

export default OrderList;
