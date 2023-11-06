import { Box } from '@mui/material';
import { Breadcrumbs } from '@mui/material';
import { Link } from '@mui/material';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import React from 'react';
import BackgroundImg from '../../../public/images/bread-crumb-img-test-crop.jpg';

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
                    <Stack spacing={0} justifyContent="center" alignItems="center">
                        <Typography variant="h5" align="center" fontWeight={600} color="white">
                            OUR STORE
                        </Typography>
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            separator="|"
                            sx={{ alignItems: 'center' }}
                            color="white"
                        >
                            <Typography variant="h6">
                                <Link underline="hover" color="#ee4949" href="/">
                                    Trang chủ
                                </Link>
                            </Typography>
                            <Typography variant="h6">Điện thoại</Typography>
                        </Breadcrumbs>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};
