'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from '@styles/components/button.module.scss';

import { IMenuOptions } from 'interfaces/form';

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    // userdata : string;
    content: string;
    options?: IMenuOptions[];
    isBlackContent?: boolean;
    icon?: ReactNode;
    href: string;
}

export function MenuComponent(props: Readonly<Props>) {
    const { content, options, isBlackContent, icon, href } = props;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Link href={href} className={styles.menu_nav}>
            {icon && (
                <span>{icon}</span>
            )}
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
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
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        style: {
                            maxHeight: 300,
                            width: '20ch',
                        },
                    }}
                >
                    {options?.map((menuItem) => (
                        <MenuItem key={menuItem.value} sx={{ fontSize: '14px', fontWeight: 500 }}>
                            {menuItem.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </Link>
    );
}
