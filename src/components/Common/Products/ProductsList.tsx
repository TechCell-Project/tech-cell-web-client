import React from 'react';

import Box from '@mui/material/Box';
import CardComponent from '@/components/Form/CardComponent';
import NotFound from '../Display/NotFound';

import { RootPath } from '@/constants/enum';
import { PagingResponse, ProductModel } from '@/models';
import { formatProductLabel } from '@/utils';

interface ProductsListProps {
    productsResponse: PagingResponse<ProductModel>;
}

export default function ProductsList({ productsResponse }: Readonly<ProductsListProps>) {
    return (
        <Box className='w-full' sx={{ gap: '20px' }}>
            {productsResponse.data.length === 0 ? (
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
                    {productsResponse.data.map((product) => {
                        const label = formatProductLabel(product);

                        return (
                            <Box key={label.id}>
                                <CardComponent initialData={label} />
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}
