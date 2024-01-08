'use client';

import React, { ChangeEvent, FC } from 'react';
import Pagination from '@mui/material/Pagination';
import { theme } from '@components/Theme/MuiCustomTheme';

interface PaginationProps {
    pagingData: {
        page: number;
        totalPage: number;
    };
    handleChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const PaginationBar: FC<PaginationProps> = ({ pagingData, handleChange }) => {
    return (
        <Pagination
            sx={{
                //padding: '0 5px',
                '& ul': {
                    justifyContent: 'center',
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
    );
};

export default PaginationBar;
