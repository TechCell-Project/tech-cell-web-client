import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonCartItem = () => {
    return (
        <Stack spacing={2} direction='row' alignItems='center' justifyContent='center'>
            <Skeleton animation='wave' variant='rectangular' width={80} height={80} />
            <Stack
                alignItems='flex-start'
                justifyContent='flex-start'
                sx={{ width: '100%', height: '80px' }}
            >
                <Skeleton animation='wave' sx={{ height: '28px', width: '80%' }} />
                <Skeleton animation='wave' sx={{ height: '22px', width: '60%' }} />
                {/* <Box sx={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 0, }}>
              <Skeleton animation='wave' sx={{ height: '28px', width: '20%', }} />
            </Box> */}
            </Stack>
        </Stack>
    );
};

export default SkeletonCartItem;
