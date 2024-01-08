import React, { ChangeEvent, FC } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardComponent from '@components/Form/CardComponent';
import { PriceModel } from '@models/Product';
import { theme } from '@components/Theme';

interface PaginationProps {
    initialData?: {
        id: string;
        name: string;
        category: string;
        price: PriceModel;
        image: string;
    }[];
    pagingData: {
        page: number;
        totalPage: number;
    };
    handleChange: (event: ChangeEvent<unknown>, page: number) => void;
}

const PaginationData: FC<PaginationProps> = ({ initialData, pagingData, handleChange }) => {
    return (
        <Stack spacing={3}>
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
                                padding: {
                                    lg: '15px 0px 15px 0px',
                                    xs: '0px 10px 0px 10px',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: { xs: 'space-around' },
                                }}
                            >
                                <Grid
                                    container
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: {
                                            sm: 'space-between',
                                            xs: 'space-around',
                                        },
                                    }}
                                    spacing={5}
                                >
                                    {initialData?.map((product) => (
                                        <Grid item key={product.id} xs={6} lg={3} md={4}>
                                            <CardComponent initialData={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Pagination
                sx={{
                    '& ul': {
                        justifyContent: 'flex-end',
                    },
                    '& .MuiButtonBase-root': {
                        backgroundColor: `#f3f4f6 !important`,
                    },
                    '& .Mui-selected': {
                        backgroundColor: `${theme.color.red} !important`,
                        color: 'white',
                    },
                    '& .MuiPaginationItem-previousNext': {
                        backgroundColor: `${theme.color.red} !important`,
                        color: 'white',
                    },
                }}
                shape='rounded'
                onChange={handleChange}
                page={pagingData.page + 1}
                count={pagingData.totalPage}
            />
        </Stack>
    );
};

export default PaginationData;
