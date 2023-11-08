import React, { FC, useRef } from 'react';

import { useOnClickOutside } from 'usehooks-ts';

import Popper, { PopperProps } from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface RecentSearchValueProps {
    onClose(): void;
    getHistoryKey(searched: string): void;
    recentSearches: string[];
    removeItem(searchTerm: string): void;
}

const RecentSearches: FC<RecentSearchValueProps & PopperProps> = ({
    open,
    anchorEl,
    onClose,
    getHistoryKey,
    recentSearches,
    removeItem,
}) => {
    const paperRef = useRef<HTMLDivElement>(null);

    const el = anchorEl as HTMLElement;

    useOnClickOutside(paperRef, onClose);
    if (!anchorEl) return null;

    return (
        <Popper open={open} anchorEl={anchorEl} disablePortal placement="bottom-start">
            <Paper sx={{ width: el.clientWidth, marginTop: '5px' }} ref={paperRef}>
                <MenuList sx={{ padding: 0 }}>
                    {!recentSearches.length ? (
                        <></>
                    ) : (
                        <>
                            <Paper
                                sx={{
                                    padding: '0 10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 700, fontSize: '16px', color: '#777777' }}
                                >
                                    Lịch sử tìm kiếm
                                </Typography>
                                <IconButton sx={{ backgroundColor: 'inherit !important' }}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Paper>
                            {recentSearches.map((searchTerm, i) => (
                                <MenuItem
                                    divider
                                    key={i}
                                    sx={{ alignItems: 'center', padding: '0px 10px' }}
                                >
                                    <ListItemIcon>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText onClick={() => getHistoryKey(searchTerm)}>
                                        {searchTerm}
                                    </ListItemText>
                                    <IconButton
                                        sx={{ backgroundColor: 'inherit !important' }}
                                        onClick={() => removeItem(searchTerm)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </MenuItem>
                            ))}
                        </>
                    )}
                </MenuList>
            </Paper>
        </Popper>
    );
};

export default RecentSearches;
