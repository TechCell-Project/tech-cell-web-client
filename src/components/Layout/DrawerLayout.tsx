import React from 'react';
import { Box, Link, Stack } from '@mui/material';
import Image from 'next/image';
import { NAV_ITEMS } from '@constants/NavConstant';
import { AccordionComponent } from '@components/Form';

interface Props {
    handleDrawerToggle: () => void;
}

export const DrawerLayout = ({ handleDrawerToggle }: Props) => {
    return (
        <Box sx={{ color: '#ee4949' }}>
            <Stack flexDirection="row" justifyContent="flex-start">
                <Link href="/">
                    <Image src="/logo-red.png" alt="Logo Techcell" width={150} height={50} />
                </Link>
            </Stack>
            {NAV_ITEMS.map((item) => {
                return item.isNav ? (
                    <AccordionComponent key={item.name} content={item.name} options={item?.menu} />
                ) : (
                    <Box key={item.name} sx={{ margin: '20px 0px' }}>
                        <Link sx={{ textDecoration: 'none', color: '#ee4949' }} href={item.href}>
                            {item.name}
                        </Link>
                    </Box>
                );
            })}
        </Box>
    );
};
