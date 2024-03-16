'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { getOrder } from '@/store/slices/orderSlice';

import { OrderSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

import { LoadingPageMnt } from '@/components/Common/Display/loading';
import OrderDetails from '@/components/Common/UserOrder/OrderDetails';
import NotFound from '@/components/Common/Display/NotFound';

import { RootPath } from '@/constants/enum';

const OrderDetail = ({ params }: Readonly<{ params: { orderId: string } }>) => {
    const dispatch = useAppDispatch();
    const { order, isLoadingDetails } = useAppSelector((state) => state.order);

    useEffect(() => {
        if (!order || order._id !== params.orderId) {
            dispatch(getOrder(params.orderId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.orderId, dispatch]);

    if (isLoadingDetails) {
        return <LoadingPageMnt isLoading={isLoadingDetails} />;
    }

    if (!order) {
        return (
            <NotFound
                description='Không tìm thấy đơn hàng'
                redirectTitle='Quay lại'
                redirect={RootPath.Order}
            />
        );
    }

    return <OrderDetails order={order as OrderSchemaDTO} />;
};

export default OrderDetail;
