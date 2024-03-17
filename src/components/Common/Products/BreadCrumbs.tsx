import React from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import BackgroundImg from '@public/images/bread-crumb-img-test-crop.jpg';

export const BreadCrumbs = () => {
    return (
        <Box>
            <Box
                sx={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${BackgroundImg.src.toString()}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: '50%', lg: '30%' },
                    }}
                >
                    <Stack spacing={0} justifyContent='center' alignItems='center'>
                        <Typography variant='h5' align='center' fontWeight={600} color='white'>
                            OUR STORE
                        </Typography>
                        <Breadcrumbs
                            aria-label='breadcrumb'
                            separator='|'
                            sx={{ alignItems: 'center' }}
                            color='white'
                        >
                            <Link href='/'>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        '&:hover': { textDecoration: 'underline' },
                                        color: '#ee4949',
                                    }}
                                >
                                    Trang chủ
                                </Typography>
                            </Link>
                            <Typography variant='h6'>Điện thoại</Typography>
                        </Breadcrumbs>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};
