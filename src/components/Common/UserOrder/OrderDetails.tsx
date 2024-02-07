import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import StepperOrderDetail from './StepperOrderDetail';

import { useAppSelector } from '@/store/store';
import Grid from '@mui/material/Grid';
import { ORDER_STATUSES } from '@/constants/contents';
import { buildAddressString, getSingleProductVariant } from '@/utils';
import OrderItemCard from './OrderItemCard';
import { VariantInCart } from '@/interfaces/cart';
import SkeletonCartItem from '../Display/SkeletonCartItem';
import { RootPath } from '@/constants/enum';

const OrderDetails = () => {
    const router = useRouter();
    const { order } = useAppSelector((state) => state.order);

    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
    const [variants, setVariants] = useState<VariantInCart[]>([]);

    useEffect(() => {
        if (order) {
            const fetches = order.products.map((item) => getSingleProductVariant(item));
            Promise.all(fetches)
                .then((variants) => {
                    setVariants(variants);
                    setIsLoadingItems(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch product details:', error);
                    setIsLoadingItems(false);
                });
        }
    }, [order]);

    const handleClickItem = (slug: string) => {
        router.push(`${RootPath.ProductDetails}/${slug}`);
    };

    console.log(order);

    return (
        <Container maxWidth='lg' sx={{ marginTop: '20px', paddingBottom: '20px' }}>
            {/* Header OrderDetail */}

            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: { sm: '15px 20px', xs: '10px 15px' },
                    '& p': {
                        fontSize: { sm: '16px', xs: '14px' },
                        fontWeight: 500,
                    },
                }}
            >
                <Button startIcon={<ArrowBackIosIcon />} onClick={() => router.back()}>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            display: { sm: 'block', xs: 'none' },
                        }}
                    >
                        Quay lại
                    </Typography>
                </Button>
                <Box
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        '& span': {
                            color: '#ee4949',
                        },
                    }}
                >
                    <Typography>
                        Mã đơn hàng : <span>{order?._id}</span>
                    </Typography>
                </Box>
            </Box>

            {/* Body OrderDetail */}
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: 'white',
                    marginTop: { sm: '20px', xs: '10px' },
                    padding: '20px 24px',
                    '& p': {
                        fontSize: { sm: '16px', xs: '14px' },
                        fontWeight: 500,
                    },
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '600 !important',
                        '& span': {
                            textTransform: 'uppercase',
                            color: '#ee4949',
                        },
                        marginBottom: { sm: '20px', xs: '12px' },
                    }}
                >
                    Tình trạng :{' '}
                    <span>
                        {order?.orderStatus && ORDER_STATUSES.get(order?.orderStatus)?.label}
                    </span>
                </Typography>
                {order?.shippingOrder && (
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <Typography
                                sx={{
                                    fontWeight: '600 !important',
                                }}
                            >
                                Địa Chỉ Nhận Hàng:
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px 0px',
                                }}
                            >
                                <Box
                                    sx={{
                                        marginBottom: '5px',
                                    }}
                                >
                                    Tên : {order.shippingOrder.toAddress.customerName}
                                </Box>
                                <Box
                                    sx={{
                                        marginBottom: '5px',
                                    }}
                                >
                                    Số điện thoại : {order.shippingOrder.toAddress.phoneNumbers}
                                </Box>
                                <Box>
                                    Địa chỉ : {buildAddressString(order.shippingOrder.toAddress)}
                                </Box>
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: '600 !important',
                                    '& span': {
                                        textTransform: 'uppercase',
                                        color: '#ee4949',
                                    },
                                }}
                            >
                                Phương thức thanh toán:{' '}
                                <span>
                                    {order.paymentOrder?.method !== 'COD'
                                        ? order.paymentOrder?.method
                                        : 'Thanh toán khi nhận hàng'}
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <StepperOrderDetail />
                        </Grid>
                    </Grid>
                )}
            </Box>

            {/* Footer OrderDetail */}
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: 'white',
                    marginTop: { sm: '20px', xs: '10px' },
                    padding: '10px 0',
                }}
            >
                {isLoadingItems &&
                    order?.products.map((item) => (
                        <SkeletonCartItem key={item.productId! + item.sku!} />
                    ))}
                {variants.map((variant) => (
                    <OrderItemCard
                        key={variant.id + variant.data.sku}
                        item={variant}
                        handleClick={handleClickItem}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default OrderDetails;
