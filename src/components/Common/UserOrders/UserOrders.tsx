'use client';

import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { useAppDispatch, useAppSelector } from '@/store/store';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import { UserAvatar } from '@/components/Layout/UserAvatar';
import {
    ORDER_STATUS_KEYS,
    STATUS_ALL,
    ORDER_STATUSES,
    STATUS_PROCESSING,
} from '@/constants/contents';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
    GetUserOrdersOrderStatusEnum,
    ListUserOrderResponseDTO,
    OrderApiGetUserOrdersRequest,
    OrderSchemaDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';

import { Paging } from '@/models';

import { UserOrderCard } from './UserOrderCard';
import PaginationBar from '../PaginationData/PaginationBar';

import { useSkipFirstRender } from '@/hooks';
import { getAllOrder } from '@/store/slices/orderSlice';
import { LoadingSection } from '../Display';
import { RootPath } from '@/constants/enum';

const OverviewOrdersPlaced = styled(Box)(({ theme }) => ({
    width: '45%',
    textAlign: 'center',
    '& h4': {
        fontWeight: 700,
        fontSize: '18px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '24px',
        },
    },
    '& p': {
        fontWeight: 500,
        fontSize: '14px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '18px',
        },
    },
}));

const ToggleOrderStatusGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
    justifyContent: 'center',
    gap: '16px',
    alignItems: 'center',
    '& button': {
        color: theme.color.black,
        fontWeight: 600,
        textTransform: 'capitalize !important',
        fontSize: '14px',
        backgroundColor: 'white',
        borderRadius: '4px !important',
        padding: '7px 15px',
        border: `1px solid ${theme.color.lightBlack} !important`,
        '&: hover': {
            border: `1px solid ${theme.color.red}`,
            backgroundColor: theme.color.red,
            color: 'white',
        },
    },
    '& .Mui-selected': {
        border: `1px solid ${theme.color.red} !important`,
        backgroundColor: theme.color.red + '!important',
        color: 'white',
        '&: hover': {
            border: `1px solid ${theme.color.red}`,
            backgroundColor: theme.primary.darker,
            color: 'white',
        },
    },
}));

const UserOrders = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [pagingOrder, setPagingOrder] = useState<OrderApiGetUserOrdersRequest>({
        ...new Paging(),
        page: 1,
    });
    const [orderStatus, setOrderStatus] = useState<(typeof ORDER_STATUS_KEYS)[number]>(STATUS_ALL);
    const [prevOrderStatus, setPrevOrderStatus] =
        useState<(typeof ORDER_STATUS_KEYS)[number]>(STATUS_ALL);

    const { profile } = useAppSelector((state) => state.profile);
    const { orders, isLoading } = useAppSelector((state) => state.order);

    const [currentOrders, setCurrentOrders] = useState<ListUserOrderResponseDTO>(
        orders as ListUserOrderResponseDTO,
    );

    const handleSelect = (event: MouseEvent<HTMLElement>, newStatus: string | null) => {
        if (newStatus !== null) {
            setOrderStatus((old) => {
                setPrevOrderStatus(old);
                return newStatus;
            });
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setOrderStatus((old) => {
            setPrevOrderStatus(old);
            return event.target.value;
        });
    };

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setPagingOrder({
            ...pagingOrder,
            page: page,
        });
    };

    useSkipFirstRender(() => {
        if (orderStatus === STATUS_ALL) {
            setPagingOrder({
                ...pagingOrder,
                page: 1,
                orderStatus: undefined,
            });
        } else {
            setPagingOrder({
                ...pagingOrder,
                page: 1,
                orderStatus: orderStatus as GetUserOrdersOrderStatusEnum,
            });
        }
    }, [orderStatus]);

    useSkipFirstRender(() => {
        const getOrdersOnChanging = async () => {
            const res = await dispatch(getAllOrder(pagingOrder));

            if (res && !res.success) {
                if (Number.isInteger(res.errorCode)) {
                    const code = res.errorCode;

                    switch (code) {
                        case 401:
                            signOut();
                            break;
                        case 404:
                            setOrderStatus(prevOrderStatus);
                            break;
                        default:
                            router.push(RootPath.Home);
                            break;
                    }
                }
            }
        };

        getOrdersOnChanging();
    }, [pagingOrder]);

    useSkipFirstRender(() => {
        if (!isLoading) {
            setCurrentOrders(orders as ListUserOrderResponseDTO);
        }
    }, [isLoading]);

    console.log('current: ' + orderStatus + ' prev: ' + prevOrderStatus);
    // console.log(pagingOrder);
    // console.log(orders);

    const buttons = ORDER_STATUS_KEYS.map((status) => (
        <ToggleButton value={status} key={status}>
            <Typography>
                {status !== STATUS_PROCESSING ? ORDER_STATUSES.get(status)?.label : 'Đang xử lí'}
            </Typography>
        </ToggleButton>
    ));

    const items = ORDER_STATUS_KEYS.map((status) => (
        <MenuItem value={status} key={status}>
            <Typography>
                {status !== STATUS_PROCESSING ? ORDER_STATUSES.get(status)?.label : 'Đang xử lí'}
            </Typography>
        </MenuItem>
    ));

    return (
        <Container
            maxWidth='lg'
            sx={{ padding: { sm: 0, xs: '10px' }, paddingTop: '20px !important' }}
        >
            <Stack>
                {profile ? (
                    <UserAvatar
                        url={profile.avatar?.url}
                        name={`${profile.lastName} ${profile.firstName}`}
                    />
                ) : (
                    <UserAvatar />
                )}
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: { sm: '15px', xs: '10px' },
                        marginTop: '30px',
                        width: '100%',
                        borderRadius: '3px',
                    }}
                >
                    <Stack
                        direction='row'
                        divider={<Divider orientation='vertical' flexItem />}
                        spacing={0}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <OverviewOrdersPlaced>
                            <h4>0</h4>
                            <p>Đơn hàng</p>
                        </OverviewOrdersPlaced>
                        <OverviewOrdersPlaced>
                            <h4>0đ</h4>
                            <p>Tổng tiền</p>
                        </OverviewOrdersPlaced>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        padding: '20px 0',
                    }}
                >
                    <ToggleOrderStatusGroup value={orderStatus} onChange={handleSelect} exclusive>
                        {buttons}
                    </ToggleOrderStatusGroup>
                    <FormControl sx={{ display: { sm: 'none', xs: 'flex' }, width: '100%' }}>
                        <Select
                            value={orderStatus}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                width: '100%',
                                backgroundColor: 'white',
                                '& .MuiSelect-select': {
                                    backgroundColor: 'white',
                                    padding: '10px 12px',
                                    border: '2px solid #ee4949',
                                    '& p': {
                                        fontSize: '16px',
                                    },
                                },
                            }}
                        >
                            {items}
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        margin: { sm: '50px 0', xs: '30px 0' },
                        borderRadius: '3px',
                    }}
                >
                    {isLoading ? (
                        <LoadingSection isLoading />
                    ) : (
                        <>
                            {currentOrders.data.map((order) => (
                                <UserOrderCard key={order._id} order={order as OrderSchemaDTO} />
                            ))}
                        </>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: { sm: 'flex-end', xs: 'center' },
                        }}
                    >
                        <PaginationBar
                            pagingData={{
                                page: pagingOrder.page ?? 1,
                                totalPage: orders.totalPage,
                            }}
                            handleChange={handleChangePage}
                        />
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
};

export default UserOrders;
