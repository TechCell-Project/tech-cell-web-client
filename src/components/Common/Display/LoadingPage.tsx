'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MoonLoader from 'react-spinners/MoonLoader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const LoadingPage = () => {

    return (
        <Box marginTop='20px'>
            {/*<Container maxWidth="lg">*/}
            <Container sx={{ maxWidth: '1320px !important' }}>
                <Stack
                    sx={{
                        minHeight: '80vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    spacing={3}
                >
                    <MoonLoader color='#ee4949' speedMultiplier={0.75} size={60} />
                    <Typography variant='subtitle1'>Đang tải ...</Typography>
                </Stack>
            </Container>
        </Box>
    );
};
