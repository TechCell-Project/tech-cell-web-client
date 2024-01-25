import * as React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Button } from '@mui/material';
const TableOrderList = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
            }}
        >
            <Box sx={{ padding: '20px' }}>
                {/* Header order */}
                <Box
                    sx={{
                        width: '100%',
                        height: '60px',
                        padding: '10px 0px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #e0e0e0',
                    }}
                >
                    <Box
                        sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        TechCell
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '14px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#4aedc4',
                                marginRight: '25px',
                                paddingRight: '15px',
                                borderRight: '1px solid #e0e0e0',
                            }}
                        >
                            <Box
                                sx={{
                                    marginRight: '10px',
                                }}
                            >
                                <LocalShippingIcon />
                            </Box>
                            Đơn hàng đã giao thành công{' '}
                        </Box>
                        <Box
                            sx={{
                                color: '#ee4949',
                                textTransform: 'uppercase',
                            }}
                        >
                            Hoàn Thành
                        </Box>
                    </Box>
                </Box>

                {/* Body order */}
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        padding: '15px 0px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #e0e0e0',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Image src={'/product_img/phone1.webp'} width={80} height={80} alt='' />
                        <Box
                            sx={{
                                marginLeft: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '16px',
                                    fonstweight: 'bold',
                                }}
                            >
                                Iphone 14 Pro Max
                            </Box>
                            <Box
                                sx={{
                                    color: '#bdbdbd',
                                    fontSize: '14px',
                                }}
                            >
                                Phân loại : Đen
                            </Box>
                            <Box
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                Số lượng : 1
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                color: '#757575',
                                position: 'relative',
                                fontSize: '14px',
                            }}
                        >
                            28.000.000đ
                            <Box
                                sx={{
                                    position: 'absolute',
                                    content: '""',
                                    display: 'block',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: '#9e9e9e',
                                    top: '8px',
                                }}
                            ></Box>
                        </Box>
                        <Box
                            sx={{
                                color: '#ee4949',
                                marginLeft: '15px',
                            }}
                        >
                            24.000.000đ
                        </Box>
                    </Box>
                </Box>

                {/* Footer order */}
                <Box
                    sx={{
                        padding: '15px 0px',
                        display: 'flex',
                        justifyContent: 'right',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                color: '#ee4949',
                                textAlign: 'right',
                                padding: '10px 0px',
                            }}
                        >
                            Thành tiền : 24.000.000đ
                        </Box>

                        <Box>
                            <Button
                                sx={{
                                    fontSize: '18px',
                                    padding: '10px 25px',
                                    borderRadius: '5px',
                                    border: '1px solid #eeeeee',
                                    color: 'black',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#ee4949 !important',
                                        border: '1px solid #ee4949',
                                        color: 'white',
                                    },
                                }}
                            >
                                Đánh giá
                            </Button>
                            <Button
                                sx={{
                                    fontSize: '18px',
                                    padding: '10px 25px',
                                    borderRadius: '10px',
                                    border: '1px solid #eeeeee',
                                    marginLeft: '15px',
                                    color: 'black',
                                    textTransform: 'none',
                                    transition: 'all 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#ee4949 !important',
                                        border: '1px solid #ee4949',
                                        color: 'white',
                                    },
                                }}
                            >
                                Mua lại
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TableOrderList;
