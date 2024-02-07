import { Box } from '@mui/material';
import Image from 'next/image';

const OrderDetailProduct = ({ id }: { id: string }) => {
    return (
        <>
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
                        <Box>Đen</Box>
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
        </>
    );
};

export default OrderDetailProduct;
