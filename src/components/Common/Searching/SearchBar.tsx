'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { Urlify } from 'utils';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    //justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    padding: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.color.black,
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.18)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 2),
        width: '100%',
        fontSize: '14px',
        //transition: 'all .5s',
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));

interface SearchValueProps {
    // the outside components only needs to know if the searchbar form has been submitted
    onSubmit(searchTerm: string): void;

    defaultValue: string;

    alreadyInputSomething(searkey: string): void;

    handleLengthSituations(): void;

    // add inputProps so that we can listen to onFocus / onBlur events if needed
    inputProps: InputBaseProps;
};

const SearchBar: FC<SearchValueProps> = ({ onSubmit, defaultValue, alreadyInputSomething, handleLengthSituations, inputProps }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsError(true);
        const searchKey = e.target.value.trim();

        if (searchKey.length > 0) {
            setIsError(false);
            alreadyInputSomething(searchKey);
        }
        if (searchKey === '') {
            handleLengthSituations();
        }
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        setSearchTerm(defaultValue);
        if (defaultValue.length > 0) {
            alreadyInputSomething(defaultValue);
        }
    }, [defaultValue]);

    return (
        <StyledBox
            component='form'
            sx={{ width: '100% !important' }}
            onSubmit={(e) => {
                e.preventDefault();
                if (!isError) {
                    onSubmit(searchTerm);
                }
            }}
        >
            <StyledInputBase
                placeholder='Tìm kiếm...'
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleChange}
                {...inputProps}
            />
            {/*<Divider light sx={{ height: 28, mx: 0.5 }} orientation="vertical" />*/}
            <IconButton type='submit' aria-label='search'>
                <SearchIcon />
            </IconButton>
        </StyledBox>
    );
};

export default SearchBar;

