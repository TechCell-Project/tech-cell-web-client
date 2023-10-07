'use client';

import React, { useState, MouseEvent, FC } from 'react';

import List from '@mui/material/List';
import {styled} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { PriceModel } from '@models/Product';
import CardComponent from '@components/Form/CardComponent';

const StyledListItemButton = styled(ListItemButton)(() => ({
    '&.Mui-selected': {
        backgroundColor: 'white',
        color: 'black',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'white',
    },
    ':hover': {
        backgroundColor: 'white',
        color: 'black',
    },
}));

interface ProductsListProps {
    initialData: {
        id: string;
        name: string;
        category: string;
        price: PriceModel;
        image: string;
    }[];
}

const FeaturedSection: FC<ProductsListProps> = ({ initialData }) => {
    const theme = useTheme();
    const [selectedTag, setSelectedTag] = useState('latest');

    const handleTagSelect = (event: MouseEvent<Element, globalThis.MouseEvent>, tag: string) => {
        setSelectedTag(tag);
    };

    const handleTagChange = (event: SelectChangeEvent) => {
        setSelectedTag(event.target.value);
    };

    return (
        <>
            <Box>
                <Box
                    sx={{
                        margin: '20px 0px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Stack spacing={0} sx={{ alignItems: 'center' }}>
                        <FormControl
                            variant="standard"
                            sx={{
                                display: { sm: 'none', xs: 'flex' },
                                minWidth: '120px',
                            }}
                        >
                            <InputLabel id="select-tag">Tag</InputLabel>
                            <Select
                                labelId="select-tag"
                                value={selectedTag}
                                onChange={handleTagChange}
                            >
                                <MenuItem value="latest">
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', fontSize: '15px' }}
                                    >
                                        Sản phẩm mới nhất
                                    </Typography>
                                </MenuItem>
                                <MenuItem value="best-selling">
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', fontSize: '15px' }}
                                    >
                                        Bán chạy nhất
                                    </Typography>
                                </MenuItem>
                                <MenuItem value="featured">
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', fontSize: '15px' }}
                                    >
                                        Sản phẩm nổi bật
                                    </Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <List
                            component="a"
                            sx={{
                                display: { sm: 'flex', xs: 'none' },
                                flexDirection: 'row',
                                color: theme.color.gray,
                                textTransform: 'uppercase',
                            }}
                        >
                            <StyledListItemButton
                                selected={selectedTag === 'latest'}
                                onClick={(event) => handleTagSelect(event, 'latest')}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                        >
                                            Sản phẩm mới nhất
                                        </Typography>
                                    }
                                />
                            </StyledListItemButton>
                            <Divider
                                flexItem
                                orientation="vertical"
                                sx={{ mx: 0.5, my: 1, width: '1px' }}
                            />
                            <StyledListItemButton
                                selected={selectedTag === 'best-selling'}
                                onClick={(event) => handleTagSelect(event, 'best-selling')}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                        >
                                            Bán chạy nhất
                                        </Typography>
                                    }
                                />
                            </StyledListItemButton>
                            <Divider
                                flexItem
                                orientation="vertical"
                                sx={{ mx: 0.5, my: 1, width: '1px' }}
                            />
                            <StyledListItemButton
                                selected={selectedTag === 'featured'}
                                onClick={(event) => handleTagSelect(event, 'featured')}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                        >
                                            Sản phẩm nổi bật
                                        </Typography>
                                    }
                                />
                            </StyledListItemButton>
                            <Divider
                                flexItem
                                orientation="vertical"
                                sx={{ mx: 0.5, my: 1, width: '1px' }}
                            />
                        </List>

                        <Divider
                            component="div"
                            sx={{
                                width: '100%',
                                height: '2px',
                                marginTop: 0,
                                background: `linear-gradient(to right, lightGray, ${theme.color.gray} , ${theme.color.red}, ${theme.color.gray}, lightGray)`,
                            }}
                        />
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px',
                    }}
                >
                    <Box sx={{ width: '1200px' }}>
                        <Box
                            sx={{
                                maxWidth: '100%',
                                borderRadius: '5px',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: { lg: '15px 0px 15px 0px', xs: '0px 10px 0px 10px' },
                                }}
                            >
                                <Box
                                    sx={{ display: 'flex', justifyContent: { xs: 'space-around' } }}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: {
                                                sm: 'flex-start',
                                                xs: 'space-around',
                                            },
                                        }}
                                        spacing={5}
                                    >
                                        {initialData.map((product) => (
                                            <Grid
                                                sx={{ padding: '12.5px' }}
                                                xs={6}
                                                lg={3}
                                                md={4}
                                                key={product.id}
                                            >
                                                <CardComponent initialData={product} />
                                            </Grid>
                                        ))}
                                        ;
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default FeaturedSection;
