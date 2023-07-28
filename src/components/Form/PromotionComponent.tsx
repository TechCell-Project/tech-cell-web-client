'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
//import styles from '../../styles/components/product.module.scss';
import CardComponent from './CardComponent';

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
            <Box sx={{width:'1200px'}}> 
                <Box
                    sx={{
                        maxWidth: '100%',
                        height: '542px',
                        borderRadius: '5px',
                    }}
                >
                    <Box sx={{ padding:{lg: '15px 0px 15px 0px' ,xs:'0px 10px 0px 10px'} }}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-around' } }}>
                            <Grid
                                container
                                sx={{
                                    display: 'flex',
                                    justifyContent: { sm: 'space-between', xs: 'space-around' },
                                }}
                                spacing={5}
                            >
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                                <Grid xs={6} lg={3} md={4}>
                                    <CardComponent />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
