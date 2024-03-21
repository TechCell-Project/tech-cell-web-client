'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ProductLabel } from '@interfaces/product';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { currencyFormat } from 'utils/funcs';

interface CurrentSearchesProps {
    currentProducts: ProductLabel[];
}

const CurrentSearchesCard: FC<CurrentSearchesProps> = ({ currentProducts }) => {
    const router = useRouter();

    return (
        <>
            {currentProducts.length !== 0 && (
                <Paper
                    sx={{
                        padding: '0 10px',
                        display: 'flex',
                        alignItems: 'center',
                        height: '40px',
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            fontWeight: 700,
                            fontSize: '16px',
                        }}
                    >
                        Sản phẩm gợi ý
                    </Typography>
                </Paper>
            )}
            {currentProducts.map((product) => {
                const special = product.price.special;
                const base = product.price.base;

                return (
                    <MenuItem
                        key={product.id}
                        onClick={() => router.push(`/chi-tiet-san-pham/${product.id}`)}
                        sx={{
                            width: '100%',
                            padding: '5px 10px',
                            display: 'inline-block !important',
                            whiteSpace: 'normal',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '64px 1fr',
                                width: '100%',
                                maxHeight: '64px',
                            }}
                        >
                            <Box sx={{ width: '64px' }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    height={64}
                                    width={64}
                                    style={{ width: '64px', height: 'auto' }}
                                />
                            </Box>
                            <Box
                                className='flex flex-col justify-center'
                                sx={{ marginLeft: { xs: '8px', sm: '12px' }, maxWidth: '100%' }}
                            >
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: '16px',
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '17px',
                                        color: '#ee4949',
                                        '& span': {
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            color: '#777777',
                                            textDecoration: 'line-through',
                                        },
                                    }}
                                >
                                    {currencyFormat(special !== 0 ? special : base)}{' '}
                                    {special !== 0 && (
                                        <span>{currencyFormat(product.price.base)}</span>
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                );
            })}
        </>
    );
};

export default CurrentSearchesCard;
