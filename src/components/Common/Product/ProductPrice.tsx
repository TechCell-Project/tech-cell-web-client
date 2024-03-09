import React from 'react';

import { PriceModel } from '@/models';

import { currencyFormat } from '@/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ProductPriceProps {
    price: PriceModel;
}

export const ProductPrice = ({ price }: ProductPriceProps) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-end'>
                <Typography
                    variant='h4'
                    sx={{ fontSize: { sm: '30px', xs: '20px' }, fontWeight: 700, color: '#ee4949' }}
                >
                    {currencyFormat(price.special !== 0 ? price.special : price.base)}
                    {' ₫'}
                </Typography>
                {price.special !== 0 && (
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: { sm: '18px', xs: '12px' },
                            fontWeight: 400,
                            color: '#535353',
                            marginLeft: { sm: '20px', xs: '10px' },
                            position: 'relative',
                        }}
                    >
                        {currencyFormat(price.base)}
                        {' ₫'}
                        <Divider
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                border: '1px solid #777777',
                                width: '100%',
                            }}
                        />
                    </Typography>
                )}
            </div>
            {price.special !== 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        padding: { sm: '10px 20px', xs: '6px' },
                        backgroundColor: '#ee4949',
                        color: 'white',
                        borderRadius: '5px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LocalOfferIcon />
                    <Typography variant='body1' fontSize={{ sm: 14, xs: 12 }}>
                        {100 - Math.round((price.special / price.base) * 100)}
                        {'% Discount'}
                    </Typography>
                </Box>
            )}
        </div>
    );
};
