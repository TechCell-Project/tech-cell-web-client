import React from 'react';
import Link from 'next/link';

import { RootPath } from '@/constants/enum';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NotFound = () => {
    return (
        <Box
            className='flex flex-col w-full h-full items-center justify-center'
            sx={{ minHeight: '100vh', gap: '12px' }}
        >
            <Typography variant='h4' fontSize={24}>
                Không tìm thấy sản phẩm
            </Typography>
            <Link href={RootPath.Home}>
                <Typography
                    variant='h5'
                    fontWeight={600}
                    sx={{
                        color: '#ee4949',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Trang chủ
                </Typography>
            </Link>
        </Box>
    );
};

export default NotFound;
