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
                '& li': {
                    '& .MuiButtonBase-root': {
                        backgroundColor: `white`,
                    },
                    '& .Mui-selected': {
                        backgroundColor: `${theme.color.red}`,
                        color: 'white',
                    },
                    '& .MuiPaginationItem-previousNext': {
                        backgroundColor: `${theme.color.red}`,
                        color: 'white',
                    },
                },
            }}
            shape='rounded'
            onChange={handleChange}
            page={pagingData.page}
            count={pagingData.totalPage}
        />
    );
};

export default PaginationBar;
