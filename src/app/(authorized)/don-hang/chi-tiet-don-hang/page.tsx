'use client';

import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useProfile } from '@hooks/useProfile';
import StepperOrderDetail from '@/components/Common/OrderPreview/StepperOrderDetail';
import Image from 'next/image';

const OrderDetail = () => {
    const { profile: user } = useProfile();
    const profileOrder = user?.address.find((item, i) => item.isDefault);
    console.log(profileOrder?.customerName);
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
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ArrowBackIosIcon /> Trở lại
                        </Box>
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
                                <StepperOrderDetail />
                            </Box>
                        </Box>
                    </Box>

                    {/* Footer OrderDetail */}
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
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '70%',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    src={'/img_productDetail/ip14_1.webp'}
                                    width={80}
                                    height={80}
                                    alt='img'
                                />
                                <Box
                                    sx={{
                                        marginLeft: '15px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            marginBottom: '10px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Iphone 14 Pro max
                                    </Box>
                                    <Box>x1</Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '30%',
                                    height: '30px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        opacity: '0.5',
                                        position: 'relative',
                                        '&:before': {
                                            position: 'absolute',
                                            display: 'block',
                                            content: '""',
                                            top: '8px',
                                            width: '100%',
                                            height: '1px',
                                            backgroundColor: 'black',
                                        },
                                    }}
                                >
                                    20.000.000đ
                                </Box>
                                <Box
                                    sx={{
                                        color: '#ee4949',
                                        marginLeft: '15px',
                                    }}
                                >
                                    18.000.000đ
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
