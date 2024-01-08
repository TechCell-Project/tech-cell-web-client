'use client';

import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

import { Search as SearchIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import { alpha, styled } from '@mui/material/styles';

import { Paging } from '@models/Common';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { ProductLabel } from '@interfaces/product';

const Search = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: 'all .5s',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

type filterdProducts = {
    id: string;
    name: string;
    imageThubnail: string;
};

export const SearchComponent = () => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());
    const [currentProduct, setCurrentProduct] = useState<ProductLabel[]>([]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchKey = e.target.value.trim();

        if (searchKey.length > 0) {
            setSearchProduct({
                ...new Paging(),
                keyword: searchKey,
            });
        } else {
            setCurrentProduct([]);
            setSearchProduct(new Paging());
        }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setAnchorEl(e.currentTarget);
    };

    useEffect(() => {
        if (searchProduct.keyword) {
            const timer = setTimeout(() => {
                console.log(searchProduct);
                dispatch(getAllProduct(searchProduct));
            }, 600);

            return () => clearTimeout(timer);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchProduct]);

    console.log(products);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    aria-describedby={id}
                    type='search'
                    placeholder='Tìm kiếm...'
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
            </Search>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }}>The content of the Popover.</Box>
            </Popover>
        </>
    );
};
