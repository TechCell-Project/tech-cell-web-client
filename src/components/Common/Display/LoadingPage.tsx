'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MoonLoader from 'react-spinners/MoonLoader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const LoadingPage = () => {
    const theme = useTheme();

    return (
        <Box marginTop="20px">
            <Container maxWidth="lg">
                <Stack
                    sx={{
                        minHeight: '80vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    spacing={3}
                >
                    <MoonLoader color={theme.color.red} speedMultiplier={0.75} size={60} />
                    <Typography variant="subtitle1">Đang tải ...</Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default LoadingPage;
