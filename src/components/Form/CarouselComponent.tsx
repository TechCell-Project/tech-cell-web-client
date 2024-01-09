'use client';

import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export type CarouselComponentProps = {
    carouselImages: string[];
};

const Item = ({ imageURL }: { imageURL: string }) => {
    return (
        <Paper>
            <Image
                src={imageURL}
                alt='image slides'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
            />
        </Paper>
    );
};

export const CarouselComponent = ({ carouselImages }: Readonly<CarouselComponentProps>) => {
    return (
        <Container maxWidth='xl' sx={{ p: '0px !important' }}>
            <Carousel>
                {carouselImages.map((carousel, i) => (
                    <Item key={`${carousel}_${i.toString()}`} imageURL={carousel} />
                ))}
            </Carousel>
        </Container>
    );
};
