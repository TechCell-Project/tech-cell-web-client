'use client';

import React, { MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCurrentUser } from '@store/slices/authSlice';
import { Address } from '@models/Account';
import Skeleton from '@mui/material/Skeleton';
import ShippingInfo from './ShippingInfo';
import OrderList from './OrderList';
import PaymentMethodDialog from './PaymentDialog';
import { OrderCreateRequest, OrderReviewResponse } from '@models/Order';
import { createNewOrder } from '@store/slices/orderSlice';
import { toast } from 'react-toastify';
import { debounce } from 'utils';
import { CommonBtn } from '../FormGroup/CommonBtn';

const BoxOrderContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.color.rice,
    '& .payment_content': {
        padding: '25px 0px',
    },
    '& .payment_block': {
        borderRadius: theme.spacing(1),
        margin: 'auto',
        maxWidth: '700px',
        padding: theme.spacing(2),
    },
}));

const CheckoutButton = styled(Box)(({ theme }) => ({
    marginTop: '15px',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '5px 15px',
}));

const PreviewPage = () => {
    const router = useRouter();

    // useEffect(() => {
    //     const timer = setTimeout(
    //         () => {
    //             router.push('/gio-hang');
    //         },
    //         2 * 60 * 1000,
    //     );

    //     return () => clearTimeout(timer);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const dispatch = useAppDispatch();

    const [userAddress, setUserAddress] = useState<Address | null>(null);
    const [currentOrder, setCurrentOrder] = useState<OrderReviewResponse | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>('COD');

    const { user, isLoadingProfile } = useAppSelector((state) => state.auth);

    const { reviewedOrder, isLoadingDetails } = useAppSelector((state) => state.order);

    useEffect(() => {
        if (!user || !userAddress) {
            dispatch(getCurrentUser());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!currentOrder) {
            if (reviewedOrder) {
                if (reviewedOrder.productSelected === null) {
                    handleBackToCart();
                }
                setCurrentOrder(reviewedOrder);
            }
        }
    }, [reviewedOrder, currentOrder]);

    useEffect(() => {
        if (user) {
            if (currentOrder) {
                setUserAddress(user.address[currentOrder.addressSelected!]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingProfile, currentOrder]);

    const handleBackToCart = () => {
        router.back();
    };

    const handleClickCheckout = debounce(async (e: MouseEvent<HTMLElement>) => {
        if (currentOrder) {
            const payload: OrderCreateRequest = {
                addressSelected: currentOrder.addressSelected,
                productSelected: currentOrder.productSelected,
                paymentMethod,
            };

            const response = await dispatch(createNewOrder(payload));
            if (response?.success) {
                toast.success('Đặt hàng thành công. Đơn hàng của bạn đang được xử lý...');
                router.push('/');
            } else {
                toast.error('Có lỗi xảy ra. Xin vui lòng thử lại sau...');
            }
        }
    }, 1500);

    return (
        <BoxOrderContainer>
            <Box className='payment_content'>
                <Box className='payment_block'>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ width: '20%' }}>
                            <Button onClick={handleBackToCart} sx={{ color: 'black' }}>
                                <ArrowBackIcon />
                            </Button>
                        </Box>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: '500', fontSize: '20px' }}>
                                Thanh toán
                            </Typography>
                        </Box>
                        <Box sx={{ width: '20%' }}></Box>
                    </Box>
                    {isLoadingProfile ? (
                        <Box sx={{ padding: '15px' }}>
                            <Skeleton
                                animation='wave'
                                variant='rectangular'
                                height={200}
                                sx={{ width: '100%' }}
                            />
                        </Box>
                    ) : (
                        <>
                            {userAddress && (
                                <ShippingInfo
                                    address={userAddress}
                                    email={user?.email ?? 'example@email.com'}
                                />
                            )}
                        </>
                    )}

                    {currentOrder && (
                        <OrderList
                            items={currentOrder.productSelected}
                            totalProductPrice={currentOrder.totalProductPrice!}
                            shipping={currentOrder.shipping}
                        />
                    )}

                    <PaymentMethodDialog />

                    <CheckoutButton>
                        <CommonBtn
                            content='Đặt Hàng'
                            loading={isLoadingDetails}
                            disabled={isLoadingDetails}
                            styles={{ width: '100%' }}
                            handleClick={handleClickCheckout}
                        />
                    </CheckoutButton>
                </Box>
            </Box>
        </BoxOrderContainer>
    );
};

export default PreviewPage;
