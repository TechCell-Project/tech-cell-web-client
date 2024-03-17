import React from 'react';

import { ProductLabel } from '@/interfaces';

import Box from '@mui/material/Box';
import CardComponent from '@/components/Form/CardComponent';
import NotFound from '../Display/NotFound';

import { RootPath } from '@/constants/enum';

interface ProductsListProps {
    products: ProductLabel[];
}

export default function ProductsList({ products }: ProductsListProps) {
    return (
        <Box className='flex flex-col w-full' sx={{ gap: '20px' }}>
            {products.length === 0 ? (
                <NotFound
                    description='Không có sản phẩm phù hợp với tiêu chí bạn tìm'
                    redirectTitle='Xem tất cả sản phẩm'
                    redirect={RootPath.ProductList}
                />
            ) : (
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
                    {products.map((product) => (
                        <Box key={product.id}>
                            <CardComponent initialData={product} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
