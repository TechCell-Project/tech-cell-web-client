import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AlternateAvatar from '@public/images/avatarColor.webp';

export const UserAvatar = ({ url, name }: { url?: string; name?: string }) => {
    return (
        <Stack
            direction='row'
            spacing={{ sm: 4, xs: 2 }}
            alignItems='center'
            justifyContent='flex-start'
        >
            <Avatar
                src={url ?? AlternateAvatar.src}
                alt='User Avatar'
                sx={{
                    height: { sm: '70px', xs: '45px' },
                    width: { sm: '70px', xs: '45px' },
                    cursor: 'pointer',
                }}
            />
            <Box>
                <Typography
                    variant='h5'
                    sx={{
                        fontSize: { sm: '20px', xs: '16px' },
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: '-4px',
                            width: { sm: '65%', xs: '60%' },
                            height: '2px',
                            backgroundColor: '#ee4949',
                        },
                    }}
                >
                    {name ?? 'User Name'}
                </Typography>
            </Box>
        </Stack>
    );
};
