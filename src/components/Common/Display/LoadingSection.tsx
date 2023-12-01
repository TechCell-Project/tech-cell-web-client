'use client';

import { Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { MoonLoader } from 'react-spinners';

export const LoadingSection = ({ isLoading }: { isLoading: boolean }) => {
    const theme = useTheme();

    return (
        <Stack width="100%" height="50vh" justifyContent="center" alignItems="center" gap={3}>
            <MoonLoader
                color={theme.color.red}
                speedMultiplier={0.75}
                size={50}
                loading={isLoading}
            />
            <Typography variant='subtitle1'>
                Đang tải ...
            </Typography>
        </Stack>
    );
};

