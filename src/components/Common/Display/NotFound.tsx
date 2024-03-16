import React from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface NotFoundPageProps {
    description: string;
    redirectTitle: string;
    redirect: string;
}

const NotFound = ({ description, redirectTitle, redirect }: NotFoundPageProps) => {
    return (
        <Box
            className='flex flex-col w-full h-full items-center justify-center'
            sx={{ minHeight: '100vh', gap: '12px' }}
        >
            <Typography variant='h4' fontSize={24}>
                {description}
            </Typography>
            <Link href={redirect}>
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
                    {redirectTitle}
                </Typography>
            </Link>
        </Box>
    );
};

export default NotFound;
