'use client';

import React, { ChangeEvent, FC } from 'react';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

import CardComponent from '@components/Form/CardComponent';
import { theme } from '@components/Theme';

import { ProductLabel } from '@/interfaces';

interface PaginationProps {
    initialData: ProductLabel[];
    pagingData: {
        page: number;
        totalPage: number;
    };
    handleChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const PaginationData: FC<PaginationProps> = ({ initialData, pagingData, handleChange }) => {
    return (
        <Box className='flex flex-col w-full' sx={{ gap: '20px' }}>
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
                {initialData?.map((product) => (
                    <Box key={product.id}>
                        <CardComponent initialData={product} />
                    </Box>
                ))}
            </Box>
            <Pagination
                sx={{
                    '& ul': {
                        justifyContent: 'flex-end',
                    },
                    '& .MuiButtonBase-root': {
                        backgroundColor: `#f3f4f6 !important`,
                    },
                    '& .Mui-selected': {
                        backgroundColor: `${theme.color.red} !important`,
                        color: 'white',
                    },
                    '& .MuiPaginationItem-previousNext': {
                        backgroundColor: `${theme.color.red} !important`,
                        color: 'white',
                    },
                }}
                shape='rounded'
                onChange={handleChange}
                page={pagingData.page + 1}
                count={pagingData.totalPage}
            />
        </Box>
    );
};

export default PaginationData;
