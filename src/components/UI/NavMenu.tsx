import { useState, MouseEvent } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { NavLinks } from '@/constants/NavConstant';
import { RootPath } from '@/constants/enum';

export interface NavMenuProps {
    content: string;
    redirectLinks: NavLinks[];
}

const NavMenu = ({ content, redirectLinks }: NavMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id='nav-button'
                aria-controls={open ? 'nav-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Typography variant='body1'>{content}</Typography>
            </Button>
            <Menu
                id='nav-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'nav-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: '240px',
                    },
                    '& .MuiTypography-body2': {
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'none',
                        color: '#3b3b3b',
                    },
                }}
            >
                {redirectLinks.map((link) => (
                    <MenuItem key={link.value}>
                        <Link
                            className='w-full'
                            href={`${RootPath.ProductList}?${link.searchQuery.toString()}`}
                        >
                            <Button
                                className='w-full'
                                onClick={handleClose}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                <Typography variant='body2'>{link.label}</Typography>
                            </Button>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export { NavMenu };
