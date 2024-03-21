import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ProductsSkeleton } from '@/components/Common/Products/Products';

const Loading = () => {
    return (
        <Box marginTop='20px'>
            <Container sx={{ maxWidth: '1320px !important' }}>
                <ProductsSkeleton />
            </Container>
        </Box>
    );
};

export default Loading;
