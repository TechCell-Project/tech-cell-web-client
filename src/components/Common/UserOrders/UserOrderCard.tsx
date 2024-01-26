import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import TechCellIcon from '@public/favicon.ico';

import {
    ORDER_STATUSES,
    PAYMENT_STATUSES,
    StatusLabel,
} from '@/constants/contents/common.constant';
import { OrderSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { currencyFormat, getAttributesToString, getSingleProductVariant } from '@/utils';
import { AddCartItemModel } from '@/models';
import { VariantInCart } from '@/interfaces';
import SkeletonCartItem from '../Display/SkeletonCartItem';

type OrderProps = {
    order: OrderSchemaDTO;
    // id:string;
};

const StyledButton = styled(Button)(({ theme }) => ({
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
}));

export const UserOrderCard = ({ order }: OrderProps) => {
    const [firstOrderProductVariantToDisplay, setFirstOrderProductVariantToDisplay] =
        useState<VariantInCart | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getLabel = (status: string, statusMap: Map<string, StatusLabel>) => {
        return statusMap.get(status)?.label;
    };

    const getVariantData = async (request: AddCartItemModel) => {
        return getSingleProductVariant(request);
    };

    useEffect(() => {
        if (firstOrderProductVariantToDisplay === null) {
            const firstOrderProduct: AddCartItemModel = {
                productId: order.products[0].productId,
                sku: order.products[0].sku,
                quantity: order.products[0].quantity,
            };

            setIsLoading(true);
            getVariantData(firstOrderProduct)
                .then((data) => setFirstOrderProductVariantToDisplay(data))
                .finally(() => setIsLoading(false));
        }
    }, [firstOrderProductVariantToDisplay, order.products]);

    console.log('id' + firstOrderProductVariantToDisplay?.name);

    return (
        <Stack
            spacing={{ sm: 3, xs: 2 }}
            sx={{
                width: '100%',
                marginBottom: { sm: '20px', xs: '10px' },
                padding: { sm: '16px', xs: '10px' },
                backgroundColor: 'white',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '60px',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Typography
                    variant='h4'
                    sx={{ fontWeight: 700, fontSize: { sm: '18px', xs: '16px' } }}
                >
                    TechCell
                </Typography>
                <Stack
                    direction='row'
                    spacing={{ sm: 3, xs: 2 }}
                    divider={<Divider orientation='vertical' flexItem />}
                    sx={{ fontSize: '14px', display: { sm: 'flex', xs: 'none' } }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#4aedc4',
                            fontSize: '14px',
                        }}
                    >
                        <LocalShippingIcon />
                        <Typography>
                            {getLabel(order.orderStatus, ORDER_STATUSES) as string}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            color: '#ee4949',
                        }}
                    >
                        {getLabel(order.paymentOrder?.status as string, PAYMENT_STATUSES) as string}
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        display: { sm: 'none', xs: 'flex' },
                        gap: '5px',
                        color: '#4aedc4',
                        alignItems: 'center',
                        fontSize: '14px',
                    }}
                >
                    <LocalShippingIcon />
                    <Typography>{getLabel(order.orderStatus, ORDER_STATUSES) as string}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: { sm: 'flex', xs: 'inline-block' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: { sm: '10px', xs: '5px' },
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                {isLoading && (
                    <Box sx={{ width: '100%' }}>
                        <SkeletonCartItem />
                    </Box>
                )}
                {firstOrderProductVariantToDisplay && (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: { sm: 'auto', xs: '100%' },
                            }}
                        >
                            <Box
                                sx={{
                                    display: { sm: 'block', xs: 'none' },
                                    width: '80px',
                                    height: '80px',
                                }}
                            >
                                <Image
                                    src={firstOrderProductVariantToDisplay?.data.images[0].url}
                                    width={80}
                                    height={80}
                                    alt=''
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: { sm: 'none', xs: 'block' },
                                    width: '65px !important',
                                    height: '65px',
                                }}
                            >
                                <Image
                                    src={firstOrderProductVariantToDisplay?.data.images[0].url}
                                    width={65}
                                    height={65}
                                    alt=''
                                />
                            </Box>
                            <Stack
                                spacing={0}
                                sx={{
                                    marginLeft: '10px',
                                    gap: { sm: '5px', xs: '3px' },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { sm: '18px', xs: '16px' },
                                        fontWeight: 600,
                                        color: '#ee4949',
                                    }}
                                >
                                    {firstOrderProductVariantToDisplay?.name}
                                </Typography>
                                <Typography sx={{ fontSize: '14px' }}>
                                    Phân loại:{' '}
                                    {getAttributesToString(firstOrderProductVariantToDisplay)}
                                </Typography>
                                <Typography sx={{ fontSize: '14px' }}>
                                    Số lượng: {firstOrderProductVariantToDisplay?.quantity}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: { sm: '20px', xs: '10px' },
                                fontSize: '14px',
                                width: { sm: 'auto', xs: '100%' },
                                justifyContent: 'flex-end',
                                marginTop: { sm: 0, xs: '12px' },
                                paddingTop: { sm: 0, xs: '5px' },
                                borderTop: { sm: 'none', xs: '1px solid #e0e0e0' },
                            }}
                        >
                            <Typography
                                sx={{
                                    textDecoration: 'lineThrough',
                                    color: '#757575',
                                    fontWeight: 600,
                                    position: 'relative',
                                }}
                            >
                                {currencyFormat(firstOrderProductVariantToDisplay?.data.price.base)}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        content: '""',
                                        display: 'block',
                                        width: '100%',
                                        height: '2px',
                                        backgroundColor: '#9e9e9e',
                                        top: '12px',
                                    }}
                                />
                            </Typography>
                            <Typography sx={{ color: '#ee4949', fontWeight: 600 }}>
                                {currencyFormat(
                                    firstOrderProductVariantToDisplay?.data.price.special,
                                )}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: { sm: '20px', xs: '10px' },
                    }}
                >
                    <Typography sx={{ fontSize: '14px', color: '#757575' }}>2 Sản phẩm</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { sm: '16px', xs: '8px' },
                            fontSize: { sm: '16px', xs: '14px' },
                        }}
                    >
                        <Image
                            src={TechCellIcon.src}
                            width={24}
                            height={24}
                            alt='TechCell icon'
                            style={{ height: '100%' }}
                        />
                        <Typography>Thành tiền:</Typography>
                        <Typography sx={{ color: '#ee4949', fontWeight: 600 }}>
                            {currencyFormat(order.checkoutOrder.totalPrice)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end',
                        gap: '10px',
                    }}
                >
                    <StyledButton variant='contained'>Đánh giá</StyledButton>
                    <StyledButton variant='outlined'>Mua lại</StyledButton>
                </Box>
            </Box>
        </Stack>
    );
};
