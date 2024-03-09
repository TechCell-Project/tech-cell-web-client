import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/store/store';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { convertSlugUrl, currencyFormat } from '@/utils';
import { RootPath } from '@/constants/enum';

interface ProductsSuggestionProps {
    label: string;
}

export const ProductsSuggestion = ({ label }: ProductsSuggestionProps) => {
    const { products, isLoading } = useAppSelector((state) => state.product);

    if (isLoading) {
        return (
            <>
                <ProductSuggestingSkeleton />
                <ProductSuggestingSkeleton />
                <ProductSuggestingSkeleton />
                <ProductSuggestingSkeleton />
            </>
        );
    }

    return (
        <div className='w-full'>
            <Typography
                variant='h4'
                fontSize={{ sm: 16, xs: 14 }}
                fontWeight={600}
                sx={{ mb: '10px', width: '100%' }}
            >
                Sản phẩm tương tự
            </Typography>
            <div className='flex flex-col w-full'>
                {products.data.map((product) => {
                    const special = product.variations[0].price.special;
                    const base = product.variations[0].price.base;
                    const slug = convertSlugUrl(product.name!) + '-' + product._id;

                    return (
                        <Box
                            key={product._id}
                            className='flex w-full items-center'
                            sx={{ mb: '10px' }}
                        >
                            <Link href={`${RootPath.ProductDetails}/${slug}`}>
                                <Box
                                    className='flex items-center justify-center'
                                    sx={{
                                        width: { sm: '80px', xs: '60px' },
                                        padding: '8px',
                                        border: '1px solid #3b3b3b',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <Image
                                        src={
                                            product.generalImages.find((img) => img.isThumbnail)!
                                                .url
                                        }
                                        alt='product'
                                        width={60}
                                        height={60}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Link>
                            <Box className='flex flex-col w-full' sx={{ gap: '6px', ml: '10px' }}>
                                <Link href={`${RootPath.ProductDetails}/${slug}`}>
                                    <Typography
                                        variant='h4'
                                        fontSize={{ sm: 16, xs: 14 }}
                                        fontWeight={600}
                                    >
                                        {product.name}
                                    </Typography>
                                </Link>
                                <Typography
                                    variant='body1'
                                    fontSize={{ sm: 14, xs: 12 }}
                                    fontWeight={500}
                                    sx={{
                                        color: '#ee4949',
                                        '& del': {
                                            color: '#535353',
                                            ml: '10px',
                                            position: 'relative',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                width: '100%',
                                                height: '1.5px',
                                                backgroundColor: '#777777',
                                                top: '50%',
                                            },
                                        },
                                    }}
                                >
                                    {currencyFormat(special !== 0 ? special : base)}
                                    {'đ'}
                                    {special !== 0 && (
                                        <del>
                                            {currencyFormat(base)}
                                            {'đ'}
                                        </del>
                                    )}
                                </Typography>
                            </Box>
                            <Button
                                variant='outlined'
                                sx={{
                                    width: { sm: '200px', xs: 'auto' },
                                    display: 'flex',
                                    flexDirection: { sm: 'row', xs: 'column' },
                                    alignItems: 'center',
                                    textTransform: 'capitalize',
                                    gap: { sm: '5px', xs: 0 },
                                    borderRadius: '5px',
                                    padding: { sm: '5 12px', xs: '4px' },
                                }}
                            >
                                <AddShoppingCartIcon />
                                <Typography
                                    variant='body1'
                                    fontSize={{ sm: 14, xs: 10 }}
                                    fontWeight={500}
                                >
                                    Giỏ hàng
                                </Typography>
                            </Button>
                        </Box>
                    );
                })}
            </div>
        </div>
    );
};

export const ProductSuggestingSkeleton = () => {
    return (
        <Box className='flex w-full items-center' sx={{ mb: '10px' }}>
            <Skeleton variant='rectangular' width={80} height={80} />
            <Box className='flex flex-col w-full' sx={{ gap: '6px', ml: '10px' }}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '100%' }} />
            </Box>
        </Box>
    );
};
