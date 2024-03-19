import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const HotSalesSection = () => {
    return (
        <Box
            sx={{
                marginTop: '20px',
                marginBottom: '15px',
                color: '#ee4949',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <LocalMallIcon sx={{ display: 'inline-block' }} />
            <Typography
                variant='h4'
                sx={{
                    fontSize: { sm: '22px', xs: '18px' },
                    display: 'inline-block',
                    marginLeft: '15px',
                    fontWeight: 500,
                }}
            >
                Khuyến Mãi HOT
            </Typography>
        </Box>
    );
};

export default HotSalesSection;
