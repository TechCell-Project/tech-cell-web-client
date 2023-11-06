'use client';
import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { Paper,Box } from '@mui/material';
import '@styles/base/index.scss';
import '../../styles/base/index.scss'

function Item(props: {
    item: {
        img:string
    };
}) {
    return (
        <Paper>
            <Image src={props.item.img} alt="img" width={0} height={0} sizes='100vw' style={{width:'100%' , height:'auto'}}/>
        </Paper>
    );
}

export const CarouselComponent = (_props: any) => {
    var items = [
        {
            img: '/carousel_img/img1.png',
        },
        {
            img: '/carousel_img/im2.jpg',
        },
        {
            img: '/carousel_img/img3.png',
        },
        {
            img: '/carousel_img/img4.jpg',
        },
    ];
    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Box sx={{width:{lg:'1200px' ,xs:'100%',sm:'100%',md:'100%'}}}>
            <Box sx={{ maxWidth: { xs: '100%', lg: '100%' } }}>
                <Carousel>
                    {items.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Carousel>
            </Box>
            </Box>
        </Box>
    );
};
