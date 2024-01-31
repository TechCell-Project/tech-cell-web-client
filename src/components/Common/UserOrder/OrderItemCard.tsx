import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { VariantInCart } from '@/interfaces';
import { currencyFormat, upperCase } from '@/utils/funcs';

type ItemCardProps = {
    item: VariantInCart;
};

const OrderItemCard = ({ item }: ItemCardProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '10px',
                borderBottom: '1px solid #e0e0e0',
                marginBottom: '10px',
            }}
        >
            <Box sx={{ display: { sm: 'block', xs: 'none' }, width: '80px', height: 'auto' }}>
                <Image src={item.data.images[0].url} width={80} height={80} alt='img' />
            </Box>
            <Box sx={{ display: { sm: 'none', xs: 'block' }, width: '60px', height: 'auto' }}>
                <Image src={item.data.images[0].url} width={60} height={60} alt='img' />
            </Box>
            <Stack
                direction={{ sm: 'row', xs: 'column' }}
                sx={{
                    marginLeft: { sm: '20px', xs: '10px' },
                    width: '100%',
                    justifyContent: { sm: 'space-between', xs: 'center' },
                    alignItems: { sm: 'center', xs: 'flex-start' },
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: { sm: '16px', xs: '14px' }, fontWeight: 600 }}>
                        Iphone 14 Pro max
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { sm: '14px', xs: '12px' },
                            fontWeight: 500,
                            color: '#ee4949',
                        }}
                    >
                        {item.data.attributes.map((attr, index) => {
                            let str = '';
                            const unit = attr.u ?? '';
                            const separate = index !== 0 ? ' - ' : ('' as string);
                            str += separate + upperCase(attr.v) + unit;
                            return str;
                        })}
                    </Typography>
                    <Typography sx={{ fontSize: { sm: '14px', xs: '12px' }, fontWeight: 500 }}>
                        x1
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        '& p': {
                            fontSize: { sm: '16px', xs: '14px' },
                            fontWeight: 500,
                        },
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
                        {currencyFormat(item.data.price.base)}
                    </Box>
                    <Box
                        sx={{
                            color: '#ee4949',
                            marginLeft: '15px',
                        }}
                    >
                        {currencyFormat(item.data.price.special)}
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default OrderItemCard;
