'use client';

import React, { FocusEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentSearches } from '@hooks/useRecentSearches';

import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import RecentSearches from './RecentSearches';
import CurrentSearches from './CurrentSearches';

import { ProductLabel } from '@interfaces/product';
import { Paging } from '@models/Common';

import { useAppDispatch } from '@store/store';
import { getAllProduct } from '@store/slices/productSlice';
import { Urlify } from 'utils';

type ProductStatement = {
    products: ProductLabel[];
    isLoading: boolean;
};

const SearchBarBox = ({ isDisplay, minWidth }: { isDisplay?: boolean, minWidth?: string }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { recentSearches, setRecentSearches } = useRecentSearches();
    // track state for showing RecentSearches
    const [openRecents, setOpenRecents] = useState<boolean>(false);
    const [openCurrents, setOpenCurrents] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const [searchProduct, setSearchProduct] = useState<Paging>(new Paging());

    const anchorEl = useRef<HTMLDivElement>(null);

    const getHistoryKey = (historyKey: string) => {
        setValue(historyKey);
    };

    const removeItem = (searchTerm: string) => {
        setRecentSearches(recentSearches.filter((item) => item !== searchTerm));
    };

    const onInputSomething = (searchKey: string) => {
        setSearchProduct({
            ...new Paging(),
            pageSize: 3,
            keyword: searchKey,
        });
        setOpenRecents(false);
        setOpenCurrents(true);
    };

    const handleSubmit = (searchTerm: string) => {
        const url = 'tim-kiem?search=' + encodeURIComponent(Urlify(searchTerm));
        router.push(url);

        // add to push recent searches after every search
        if (!recentSearches.includes(searchTerm.trim())) {
            setRecentSearches([searchTerm.trim(), ...recentSearches]);
        }
        setOpenCurrents(false);
        setValue('');
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

    return (
        <Box
            sx={{
                display: { xs: !isDisplay ? 'none' : 'flex', lg: 'flex' },
                minWidth: minWidth ? minWidth : '260px',
                justifyContent: 'flex-end',
            }}
            ref={anchorEl}
        >
            <SearchBar
                onSubmit={handleSubmit}
                defaultValue={value}
                inputProps={{
                    onFocus: (e) => {
                        if (e.target.value.trim().length === 0) {
                            setOpenRecents(true);
                        }
                    },
                }}
                alreadyInputSomething={onInputSomething}
                handleLengthSituations={() => {
                    setOpenRecents(true);
                    setOpenCurrents(false);
                }}
            />
            <RecentSearches
                open={openRecents}
                anchorEl={anchorEl.current}
                onClose={() => {
                    setOpenRecents(false);
                }}
                recentSearches={recentSearches.slice(0, 6)}
                removeItem={removeItem}
                getHistoryKey={getHistoryKey}
            />
            <CurrentSearches
                open={openCurrents}
                anchorEl={anchorEl.current}
                onClose={() => {
                    setOpenCurrents(false);
                }}
                recentSearches={recentSearches.slice(0, 3)}
                removeItem={removeItem}
                getHistoryKey={getHistoryKey}
            />
        </Box>
    );
};

export default SearchBarBox;
