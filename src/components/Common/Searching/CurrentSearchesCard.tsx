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
            {currentProducts.map((product) => (
                <MenuItem
                    key={product.id}
                    onClick={() => router.push(`/chi-tiet-san-pham/${product.id}`)}
                >
                    <Stack spacing={2} direction='row'>
                        <Box>
                            <Image src={product.image} alt={product.name} height={64} width={64} />
                        </Box>
                        <Stack
                            sx={{
                                width: '100%',
                                paddingLeff: '10px',
                            }}
                            alignItems='flex-start'
                            justifyContent='center'
                            spacing={1}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    gap: '8px',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '17px',
                                        color: '#ee4949',
                                    }}
                                >
                                    {currencyFormat(product.price.sale)}
                                </Typography>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        color: '#777777',
                                        textDecoration: 'line-through',
                                    }}
                                >
                                    {currencyFormat(product.price.base)}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </MenuItem>
            ))}
        </>
    );
};

export default CurrentSearchesCard;
