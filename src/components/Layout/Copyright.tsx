import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const Copyright = (props: any) => {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link href='https://techcell.cloud/' style={{ color: '#ee4949' }}>
                Techcell VTC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};
