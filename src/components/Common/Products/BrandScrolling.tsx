'use client';

import React, { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { BRANDS } from '@constants/PhoneConstant';

const Brand = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    border: `1px solid ${theme.color.lightGray}`,
    color: theme.color.black,
    height: '34px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0px 10px 10px 0px',
    '& a': {
        display: 'flex',
        padding: '2px 4px',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

interface Props {
    className: string;
}

export const BrandScrolling: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ className }) => {
    return (
        <Box className={className} sx={{ padding: '0 !important', marginBottom: '20px' }}>
            {BRANDS.map((brand) => (
                <Brand elevation={0} key={brand.value}>
                    <Link href={brand.to}>
                        <Image
                            src={brand.brandImg}
                            alt={brand.label}
                            height={20}
                            width={brand.setWidth ? brand.setWidth : 98}
                            style={{ maxWidth: 'none' }}
                        />
                    </Link>
                </Brand>
            ))}
        </Box>
    );
};
