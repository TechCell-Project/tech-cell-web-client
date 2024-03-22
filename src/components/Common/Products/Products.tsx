import React, { ChangeEvent } from 'react';

import Box from '@mui/material/Box';

import PaginationData from '../PaginationData/PaginationData';

import { ProductLabel } from '@interfaces/product';
import Skeleton from '@mui/material/Skeleton';

interface ProductsPageProps {
    products: ProductLabel[];
    page: number;
    totalPage: number;
    handleChangePage: (event: ChangeEvent<unknown>, page: number) => void;
}

export const Products = ({ products, page, totalPage, handleChangePage }: ProductsPageProps) => {
    return (
        <PaginationData
            initialData={products}
            pagingData={{ page, totalPage }}
            handleChange={handleChangePage}
        />
    );
};

export const ProductCardSkeletion = () => {
    return (
        <Box sx={{ maxHeight: '400px' }}>
            <Skeleton
                variant='rounded'
                animation='wave'
                width='100%'
                sx={{ height: { lg: '400px', xs: '320px' } }}
            />
        </Box>
    );
};

export const ProductsSkeleton = () => {
    return (
        <div className='w-full'>
            <Box
                sx={{
                    maxWidth: '100%',
                    display: 'grid',
                    gap: '10px',
                    gridTemplateColumns: {
                        lg: 'repeat(4, 1fr)',
                        md: 'repeat(3, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        xs: 'repeat(1, 1fr)',
                    },
                }}
            >
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
                <ProductCardSkeletion />
            </Box>
        </div>
    );
};
