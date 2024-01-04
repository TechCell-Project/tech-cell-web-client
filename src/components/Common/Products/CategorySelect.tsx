'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { Search } from '@mui/icons-material';
import FilterCard from './FilterCard';
import { DETAIL_CATEGORIES } from '@constants/PhoneConstant';
import { CategorySelecting } from '@interfaces/product';

const StyledChip = styled(Chip)(({ theme }) => ({
    margin: '0 5px 5px 0',
    '& span': {
        fontWeight: 500,
        fontSize: '12px',
    },
}));

const CategorySelect = () => {
    let initCategoriesData: CategorySelecting[] = [];

    DETAIL_CATEGORIES.forEach((item) => {
        const arr = item.categories.map((cat) => ({
            key: cat.key,
            value: cat.value,
            chosen: false,
        }));
        const concat = initCategoriesData.concat(arr);
        initCategoriesData = concat;
    });

    const [categories, setCategories] = useState<CategorySelecting[]>(initCategoriesData);

    const handleSelectCategory = (cats: CategorySelecting[]) => {
        setCategories(
            categories.map((category) => {
                for (const cat of cats) {
                    if (category.value === cat.value) {
                        return cat;
                    }
                }
                return category;
            }),
        );
    };

    //console.log(categories);

    return (
        <>
            <Box sx={{ padding: '0 !important', marginBottom: '20px' }}>
                <Stack spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Typography variant='h5' fontWeight={600} fontSize={18}>
                        Chọn theo tiêu chí
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginBottom: '5px',
                        }}
                    >
                        {DETAIL_CATEGORIES.map((item) => (
                            <FilterCard
                                key={item.key}
                                title={item.title}
                                categories={item.categories.map((cat) => ({
                                    key: cat.key,
                                    value: cat.value,
                                    chosen: false,
                                }))}
                                handleSelectCategory={handleSelectCategory}
                            />
                        ))}
                    </Box>
                </Stack>
            </Box>
            {categories.length > 0 && (
                <Stack direction='row' spacing={1}>
                    <Box
                        sx={{
                            borderBottom: '2px solid black',
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        {categories.map(
                            (value) =>
                                value.chosen && <StyledChip key={value.key} label={value.value} />,
                        )}
                    </Box>
                    <Box>
                        <IconButton aria-label='search' sx={{ borderRadius: '0' }}>
                            <Search />
                        </IconButton>
                    </Box>
                </Stack>
            )}
        </>
    );
};

export default CategorySelect;
