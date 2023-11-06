// 'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CardComponent from './CardComponent';
//import styles from '../../styles/components/product.module.scss';
import { product } from '@components/Form/ProductDetails/product';
import { PriceModel } from '@models/Product';

export const PromotionComponent = () => {
    return (
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
                    <Box sx={{ padding: { lg: '15px 0px 15px 0px', xs: '0px 10px 0px 10px' } }}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-around' } }}>
                            <Grid
                                container
                                sx={{
                                    width:'100%',
                                    display: 'flex',
                                    justifyContent: { sm: 'flex-start', xs: 'space-around' },
                                }}
                                spacing={5}
                            >
                                {product.map((product) => (
                                    <Grid xs={6} lg={3} md={4} key={product.id}>
                                        <CardComponent
                                            initialData={{
                                                id: product.id.toString(),
                                                name: product.name,
                                                category: product.category,
                                                price: product.price as PriceModel,
                                                image: product.img,
                                            }}
                                        />
                                    </Grid>
                                ))}
                                ;
                                {/* <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid> */}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
