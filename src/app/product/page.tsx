'use client';

import { BreadCrumbs } from '@components/Layout';
import { Percent, Visibility, Search } from '@mui/icons-material';
import {
    Container,
    Box,
    Paper,
    Stack,
    styled,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Chip,
    IconButton,
} from '@mui/material';
import React, { useState, MouseEvent, } from 'react';
import { BRANDS, DETAIL_CATEGORIES } from '@constants/PhoneConstant';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import FilterCard from '@components/Filters/FilterCard';
import { Ascending, Descending } from '@components/svgs';
import { PromotionComponent } from '@components/Form';

const Brand = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    border: `1px solid ${theme.color.lightGray}`,
    color: theme.color.black,
    height: '34px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0px 10px 10px 0px',
    '& a': {
        display: 'flex',
        padding: '2px 4px',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    backgroundColor: '#f3f4f6 !important',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    color: '#444',
    fontSize: '12px',
    height: '34px',
    margin: '0 10px 10px 0',
    padding: '5px 10px',
    whiteSpace: 'nowrap',
    '&.Mui-selected': {
        backgroundColor: '#fef2f2 !important',
        border: `1px solid ${theme.color.red} !important`,
        color: theme.color.red + '!important',
    },
    '&.Mui-selected:hover': {
        backgroundColor: theme.primary.darker,
        color: 'white',
    },
    '&:hover': {
        backgroundColor: theme.color.lightGray,
    },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    margin: '0 5px 5px 0',
    '& span': {
        fontWeight: 500,
        fontSize: '12px',
    },
}));

const Product = () => {
    const [sortByTag, setSortByTag] = useState('popular');
    const [mobileType, setMobileType] = useState<string[]>([]);
    const [mobileDemand, setMobileDemand] = useState<string[]>([]);
    const [mobileAbility, setMobileAbility] = useState<string[]>([]);

    const handleSortByTag = (event: MouseEvent<HTMLElement>, newSorting: string) => {
        setSortByTag(newSorting);
    };

    const sortByTagControl = {
        value: sortByTag,
        onChange: handleSortByTag,
        exclusive: true,
    };

    const handleSelectCategory = (
        cat: string[],
        caseExp: string,
    ) => {
        switch (caseExp) {
            case 'mobile-type':
                setMobileType(cat);
                break;
            case 'mobile-demand':
                setMobileDemand(cat);
                break;
            case 'mobile-ability':
                setMobileAbility(cat);
                break;
            default:
                console.log('You havent choose something');
                break;
        }
    };

    return (
        <>
            <BreadCrumbs />
            <Box marginTop="20px">
                <Container maxWidth="lg" className={styles.brands_content}>
                    <Stack spacing={3}>
                        <Box
                            className={styles.list_brands}
                            sx={{ padding: '0 !important', marginBottom: '20px' }}
                        >
                            {BRANDS.map((brand) => (
                                <Brand elevation={0} key={brand.value}>
                                    <Link href={brand.to}>
                                        <Image
                                            src={brand.brandImg}
                                            alt={brand.label}
                                            height={20}
                                            width={brand.setWidth ? brand.setWidth : 98}
                                            style={{ maxWidth: 'none' }}
                                        />
                                    </Link>
                                </Brand>
                            ))}
                        </Box>
                        <Box sx={{ padding: '0 !important', marginBottom: '20px' }}>
                            <Stack
                                spacing={2}
                                sx={{ alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <Typography variant="h5" fontWeight={600} fontSize={18}>
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
                                            caseExp={item.key}
                                            handleSelectCategory={handleSelectCategory}
                                        />
                                    ))}
                                </Box>
                            </Stack>
                        </Box>
                        {(mobileDemand.length > 0 ||
                            mobileType.length > 0 ||
                            mobileAbility.length > 0) && (
                            <Stack direction="row" spacing={1}>
                                <Box
                                    sx={{
                                        borderBottom: '2px solid black',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        width: '100%',
                                    }}
                                >
                                    {mobileType.map((value) => (
                                        <StyledChip key={value} label={value} />
                                    ))}
                                    {mobileDemand.map((value) => (
                                        <StyledChip key={value} label={value} />
                                    ))}
                                    {mobileAbility.map((value) => (
                                        <StyledChip key={value} label={value} />
                                    ))}
                                </Box>
                                <Box>
                                    <IconButton aria-label="search" sx={{ borderRadius: '0' }}>
                                        <Search />
                                    </IconButton>
                                </Box>
                            </Stack>
                        )}
                        <Box sx={{ padding: '0 !important', marginBottom: '20px' }}>
                            <Stack
                                spacing={2}
                                sx={{ alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <Typography variant="h5" fontWeight={600} fontSize={18}>
                                    Sắp xếp theo
                                </Typography>
                                <Box className={styles.list_brands}>
                                    <ToggleButtonGroup
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'auto auto auto auto',
                                            padding: '0px',
                                            '& .MuiToggleButtonGroup-grouped': {
                                                border: 0,
                                                '&:not(:first-of-type)': {
                                                    borderRadius: '10px',
                                                },
                                                '&:first-of-type': {
                                                    borderRadius: '10px',
                                                },
                                            },
                                        }}
                                        {...sortByTagControl}
                                    >
                                        <ToggleButtonStyled value="ascending" key="ascending">
                                            <Descending
                                                style={{ fontSize: '20px', marginRight: '5px' }}
                                            />
                                            Giá Cao - Thấp
                                        </ToggleButtonStyled>
                                        <ToggleButtonStyled value="descending" key="descending">
                                            <Ascending
                                                style={{ fontSize: '20px', marginRight: '5px' }}
                                            />
                                            Giá Thấp - Cao
                                        </ToggleButtonStyled>
                                        <ToggleButtonStyled value="hot-promo" key="hot-promo">
                                            <Percent
                                                sx={{ fontSize: '20px', marginRight: '5px' }}
                                            />
                                            Khuyến mãi hot
                                        </ToggleButtonStyled>
                                        <ToggleButtonStyled value="popular" key="popular">
                                            <Visibility
                                                sx={{ fontSize: '20px', marginRight: '5px' }}
                                            />
                                            Xem nhiều
                                        </ToggleButtonStyled>
                                    </ToggleButtonGroup>
                                </Box>
                            </Stack>
                        </Box>
                        <PromotionComponent />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Product;
