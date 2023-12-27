'use client';

import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Item = ({ imageURL }: { imageURL: string }) => {
    return (
        <Paper>
            <Image src={imageURL} alt='img' width={0} height={0} sizes='100vw'
                   style={{ width: '100%', height: 'auto' }} />
        </Paper>
    );
};

const carousels = ['/carousel_img/img1.png', '/carousel_img/im2.jpg', '/carousel_img/img3.png', '/carousel_img/img4.jpg'];

export const CarouselComponent = () => {
    return (
        <Container maxWidth='xl' sx={{ p: '0px !important' }}>
            <Carousel>
                {carousels.map((carousel, i) => (
                    <Item key={i} imageURL={carousel} />
                ))}
            </Carousel>
        </Container>
    );
};
