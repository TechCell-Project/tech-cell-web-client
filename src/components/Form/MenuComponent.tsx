'use client';

import * as React from 'react';
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
    icon?: React.ReactNode;
    href: string;
}

export function MenuComponent(props: Readonly<Props>) {
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
        <Link href={props.href} className={styles.menu_nav}>
            {props.icon && props.icon}
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: props.isBlackContent ? theme.color.black : '#fff',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                }}
                className={styles.buttonMenu}
            >
                {props.content}
            </Button>
            {props.options && (
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
                    {props.options?.map((menuItem, i) => (
                        <MenuItem key={i} sx={{ fontSize: '14px', fontWeight: 500 }}>
                            {menuItem.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </Link>
    );
}
