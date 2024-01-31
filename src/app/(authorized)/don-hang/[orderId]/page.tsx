'use client';

import { useEffect } from 'react';
import { LoadingPageMnt } from '@/components/Common/Display/loading';
import OrderDetails from '@/components/Common/UserOrder/OrderDetails';
import { getOrder } from '@/store/slices/orderSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const OrderDetail = ({ params }: Readonly<{ params: { orderId: string } }>) => {
    const dispatch = useAppDispatch();
    const { isLoadingDetails } = useAppSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrder(params.orderId));
    }, [params.orderId, dispatch]);

    return isLoadingDetails ? <LoadingPageMnt isLoading={isLoadingDetails} /> : <OrderDetails />;
};

export default OrderDetail;
