'use client';

import React, { FC, useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts';

import Popper, { PopperProps } from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { PulseLoader } from 'react-spinners';

import { ProductLabel } from '@interfaces/product';

import { useAppSelector } from '@store/store';

import { formatProductLabel } from 'utils';
import CurrentSearchesCard from './CurrentSearchesCard';

interface RecentSearchValueProps {
    onClose(): void;
    getHistoryKey(searched: string): void;
    recentSearches: string[];
    removeItem(searchTerm: string): void;
}

const CurrentSearches: FC<RecentSearchValueProps & PopperProps> = ({
    anchorEl,
    open,
    onClose,
    recentSearches,
    removeItem,
    getHistoryKey,
}) => {

    const paperRef = useRef<HTMLDivElement>(null);

    const [currentProducts, setCurrentProducts] = useState<ProductLabel[]>([]);

    const { products, isLoading } = useAppSelector((state) => state.product);

    useEffect(() => {
        const productLabels = products.data
            .map((product) => formatProductLabel(product))
            .slice(0, 4);

        setCurrentProducts(productLabels);
    }, [products, isLoading]);

    useOnClickOutside(paperRef, onClose);
    if (!anchorEl) return null;

    return (
        <Popper open={open} anchorEl={anchorEl} disablePortal placement="bottom-start">
            <Paper sx={{ width: '500px', marginTop: '5px' }} ref={paperRef}>
                <MenuList sx={{ padding: 0 }}>
                    {isLoading ? (
                        <MenuItem sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <PulseLoader
                                color="#ee4949"
                                cssOverride={{}}
                                margin={10}
                                size={10}
                                speedMultiplier={0.5}
                            />
                        </MenuItem>
                    ) : (
                        <>
                            {!recentSearches.length ? (
                                <CurrentSearchesCard currentProducts={currentProducts} />
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
                                            height: '40px',
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '16px',
                                            }}
                                        >
                                            Lịch sử tìm kiếm
                                        </Typography>
                                        <Button
                                            size="small"
                                            endIcon={<DeleteOutlineIcon />}
                                            sx={{ color: 'inherit' }}
                                        >
                                            Xóa tất cả
                                        </Button>
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
                                    <CurrentSearchesCard currentProducts={currentProducts} />
                                </>
                            )}
                        </>
                    )}
                </MenuList>
            </Paper>
        </Popper>
    );
};

export default CurrentSearches;
