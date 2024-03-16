'use client';

import UserOrders from '@/components/Common/UserOrders/UserOrders';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { getAllOrder } from '@/store/slices/orderSlice';
import { Paging } from '@/models/Common';
import { LoadingPageMnt } from '@/components/Common/Display';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { RootPath } from '@/constants/enum';

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { orders } = useAppSelector((state) => state.order);

    useEffect(() => {
        const getOrders = async () => {
            const res = await dispatch(getAllOrder({ ...new Paging(), page: 1 }));
            if (res && !res.success) {
                if (res.errorCode === 401) {
                    signOut();
                } else if (res.errorCode === 429) {
                    router.push(RootPath.Home);
                }
            }
            setIsFetching(false);
        };

        if (orders.data.length === 0) {
            setIsFetching(true);
            getOrders();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isFetching ? <LoadingPageMnt isLoading /> : <UserOrders />;
};

export default Page;
