'use client';

import UserOrders from '@/components/Common/UserOrders/UserOrders';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { getAllOrder } from '@/store/slices/orderSlice';
import { Paging } from '@/models/Common';
import { LoadingPageMnt } from '@/components/Common/Display';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { orders } = useAppSelector((state) => state.order);

    useEffect(() => {
        if (orders.data.length === 0) {
            setIsFetching(true);
            dispatch(getAllOrder({ ...new Paging(), page: 1 }))
                .catch(() => router.refresh())
                .finally(() => setIsFetching(false));
        }
    }, [orders, dispatch]);

    return isFetching ? <LoadingPageMnt isLoading /> : <UserOrders />;
};

export default Page;
