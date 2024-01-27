'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useProfile } from '@hooks/useProfile';
import Image from 'next/image';
import { styled } from '@mui/system';
import OrderDetailProduct from '@/components/Form/Order/OrderDetail';
import { extractIdFromSlug } from '@/utils';
import Link from 'next/link';
import { RootPath } from '@/constants/enum';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TechCellIcon from '@public/favicon.ico';
import axios from 'axios';
import { API_ENDPOINT } from '@/constants';

const TableOrder = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'right',
    // padding: '10px 0px 10px 0px',
    borderTop: '1px dotted rgba(0,0,0,.09);',
});

const TableLabel = styled('div')({
    width: '70%',
    padding: '10px',
    fontSize: '12px',
    color: 'rgba(0,0,0,.54)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
});

const TableMoney = styled('div')({
    width: '30%',
    padding: '10px',
    fontSize: '14px',
    borderLeft: '1px dotted rgba(0,0,0,.09);',
    '&.active': {
        fontSize: '24px',
        color: '#ee4949',
    },
});

// const getOrderDetailId = async (id: string) => {
//     const { data } = await axios.get(`https://api.techcell.cloud/order/${id}`);
//     return data?.product;
// };

const OrderDetail = ({ params }: Readonly<{ params: { slug: string } }>) => {
    // const getOrder = getOrderDetailId(params.slug);
    // console.log('Order' + getOrder);
    const { profile: user } = useProfile();
    const profileOrder = user?.address.find((item, i) => item.isDefault);
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                }}
            >
                <Box
                    sx={{
                        width: '1200px',
                        margin: '0px auto',
                        padding: '30px 0px 30px 0px',
                    }}
                >
                    {/* Header OrderDetail */}

                    <Box
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            height: '64px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px 24px',
                        }}
                    >
                        <Link href={`${RootPath.Order}`}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <ArrowBackIosIcon /> Trở lại
                            </Box>
                        </Link>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'uppercase',
                            }}
                        >
                            <Box>Mã đơn hàng : SADFSDGGFSGDSDFSD</Box>
                            <Box
                                sx={{
                                    margin: '0px 20px',
                                }}
                            >
                                |
                            </Box>
                            <Box
                                sx={{
                                    color: '#ee4949',
                                }}
                            >
                                Đơn hàng đã hoàn thành
                            </Box>
                        </Box>
                    </Box>

                    {/* Body OrderDetail */}
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            backgroundColor: 'white',
                            marginTop: '10px',
                            padding: '20px 24px',
                        }}
                    >
                        <Box
                            sx={{
                                fontWeight: 'bold',
                                padding: '0px 0px 12px 0px',
                            }}
                        >
                            Địa Chỉ Nhận Hàng
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '40%',
                                    padding: '10px 24px 0px 0px',
                                }}
                            >
                                <Box
                                    sx={{
                                        marginBottom: '5px',
                                    }}
                                >
                                    Tên : {profileOrder?.customerName}
                                </Box>
                                <Box
                                    sx={{
                                        marginBottom: '5px',
                                    }}
                                >
                                    Số điện thoại : {profileOrder?.phoneNumbers}
                                </Box>
                                <Box>
                                    Địa chỉ :{' '}
                                    {[
                                        profileOrder?.detail,
                                        profileOrder?.provinceLevel.province_name,
                                        profileOrder?.districtLevel.district_name,
                                        profileOrder?.wardLevel.ward_name,
                                    ].join(', ')}
                                </Box>
                            </Box>
                            <Box sx={{ width: '60%', padding: '10px 0px 0px 24px' }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        backgroundColor: 'white',
                                        marginTop: '10px',
                                        padding: '20px 24px',
                                    }}
                                >
                                    {/*  */}
                                    <OrderDetailProduct id={extractIdFromSlug(params.slug)} />
                                </Box>

                                <Box
                                    sx={{
                                        width: '100%',
                                        margin: '10px 0px',
                                    }}
                                >
                                    <TableOrder>
                                        <TableLabel>Tổng tiền hàng</TableLabel>
                                        <TableMoney>17.000.000đ</TableMoney>
                                    </TableOrder>

                                    <TableOrder>
                                        <TableLabel>Phí vận chuyển </TableLabel>
                                        <TableMoney>17.000.000đ</TableMoney>
                                    </TableOrder>

                                    <TableOrder>
                                        <TableLabel>
                                            Giảm giá phí vận chuyển{' '}
                                            <Box sx={{ marginLeft: '5px' }}>
                                                <ErrorOutlineIcon />
                                            </Box>
                                        </TableLabel>
                                        <TableMoney>17.000.000đ</TableMoney>
                                    </TableOrder>

                                    <TableOrder>
                                        <TableLabel>Thành tiền </TableLabel>
                                        <TableMoney>17.000.000đ</TableMoney>
                                    </TableOrder>

                                    <TableOrder>
                                        <TableLabel>
                                            <Image
                                                src={TechCellIcon.src}
                                                width={20}
                                                height={20}
                                                alt='TechCell icon'
                                                style={{ height: '100%', marginRight: '5px' }}
                                            />{' '}
                                            Phương thức thanh toán{' '}
                                        </TableLabel>
                                        <TableMoney className='active'>17.000.000đ</TableMoney>
                                    </TableOrder>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default OrderDetail;
