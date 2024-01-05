import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ProfileAvatar from './ProfileAvatar';
import ProfileInfor from './ProfileInfor';
import ProfileAddress from './ProfileAddress';

export const Profile = () => {
    return (
        <Container sx={{ maxWidth: '960px !important', p: '30px 0' }}>
            <Stack direction='row' gap='40px' alignItems='flex-start'>
                <ProfileAvatar />
                <Stack direction='column' width='100%' pt='40px'>
                    <ProfileInfor />
                    <ProfileAddress />
                </Stack>
            </Stack>
        </Container>
    );
};