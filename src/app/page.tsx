import React from 'react';
import { HomePage } from '@components/Common';
import Typography from '@mui/material/Typography';
import { CarouselComponent, CarouselComponentProps } from '@components/Form';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { HOME_SLOGAN, BENEFIT_SECTION } from '@constants/contents/common.constant';
import { getPublicContents } from '@utils/directory.util';

function getStaticContents(): CarouselComponentProps {
    const carouselImages = getPublicContents('carousel_img');
    return {
        carouselImages,
    };
}

export default function Home() {
    const { carouselImages } = getStaticContents();
    console.debug({
        carouselImages,
    });

    return (
        <>
            <Typography
                textAlign='center'
                fontSize='13px'
                sx={{
                    bgcolor: '#0e0e0e',
                    color: '#fff',
                    p: '10px 0',
                    display: { xs: 'none', sm: 'none', md: 'block' },
                }}
            >
                {HOME_SLOGAN}
            </Typography>

            <CarouselComponent carouselImages={carouselImages} />

            <HomePage />

            <Box sx={{ bgcolor: '#fafafa', p: '40px 0' }}>
                <Container sx={{ maxWidth: '1320px !important' }}>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                        {BENEFIT_SECTION.map(({ Icon, title, desc }) => (
                            <Grid item xs={6} md={3} key={title}>
                                <Stack
                                    direction='row'
                                    gap={3}
                                    alignItems='center'
                                    justifyContent={{ md: 'center', xs: 'flex-start' }}
                                >
                                    <Icon sx={{ height: '32px', width: 'auto' }} />
                                    <Stack direction='column'>
                                        <Typography fontSize='16px' fontWeight={600} mb='4px'>
                                            {title}
                                        </Typography>
                                        <Typography fontSize='13px' sx={{ opacity: 0.9 }}>
                                            {desc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
