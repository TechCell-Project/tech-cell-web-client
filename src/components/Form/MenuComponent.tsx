'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from '@styles/components/button.module.scss';

import { IMenuOptions } from 'interfaces/form';

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

interface Props {
    // userdata : string;
    content: string;
    options?: IMenuOptions[];
    isBlackContent?: boolean;
    icon?: ReactNode;
    href?: string;
}

export function MenuComponent(props: Readonly<Props>) {
    const { content, options, isBlackContent, icon, href } = props;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { push } = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={styles.menu_nav} onClick={() => href && push(href)}>
            {/*{icon && (*/}
            {/*    <span>{icon}</span>*/}
            {/*)}*/}
            <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: isBlackContent ? theme.color.black : '#fff',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                }}
                className={styles.buttonMenu}
            >
                {content}
            </Button>
            {options && (
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        style: {
                            width: '22ch',
                        },
                    }}
                >
                    {options?.map((menuItem) => (
                        <MenuItem
                            key={menuItem.value}
                            sx={{ fontSize: '14px', fontWeight: 500, py: '8px' }}
                        >
                            {menuItem.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </Box>
    );
}
