'use client';

import React, { ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import PaginationBar from '@/components/Common/PaginationData/PaginationBar';
import Box from '@mui/material/Box';

interface PaginationProps {
    page: number;
    totalPage: number;
}

const Pagination = ({ page, totalPage }: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        push(`${pathname}?${params.toString()}`);
    };

    return (
        <Box sx={{ marginTop: { sm: '24px', xs: '12px' } }}>
            <PaginationBar pagingData={{ page, totalPage }} handleChange={handleChangePage} />
        </Box>
    );
};

export default Pagination;
