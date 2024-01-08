import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import ProfileAddress from './ProfileAddress';

export const Profile = () => {
    return (
        <Container sx={{ maxWidth: '960px !important', p: '30px 0' }}>
            <Stack
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: { xs: '20px', md: '40px' },
                }}
            >
                <ProfileAvatar />
                <Stack direction='column' width='100%' pt='40px'>
                    <ProfileInfo />
                    <ProfileAddress />
                </Stack>
            </Stack>
        </Container>
    );
};
