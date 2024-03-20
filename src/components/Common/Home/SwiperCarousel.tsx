'use client';

import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { ImageLabel } from '@/constants/contents';

interface CarouselProps {
    imgLabels: ImageLabel[];
}

export const SwiperCarousel = ({ imgLabels }: CarouselProps) => {
    return (
        <Box
            sx={(theme) => ({
                position: 'relative',
                maxHeight: '480px',
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: theme.color.red,
                },
                '& .swiper-button-prev, .swiper-button-next': {
                    color: theme.color.red,
                    opacity: '50%',
                    '&:hover': {
                        opacity: '100%',
                    },
                },
            })}
        >
            <Swiper
                pagination={{
                    clickable: true,
                }}
                loop={true}
                modules={[Pagination, Navigation]}
                className='mySlider w-full h-full'
            >
                {imgLabels.map((label) => (
                    <SwiperSlide key={label.alt}>
                        <Box sx={{ maxHeight: '480px' }}>
                            <Image
                                src={label.src}
                                alt='image slides'
                                width={window.innerWidth}
                                height={480}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </SwiperSlide>
                ))}
                <SwiperNavButtons />
            </Swiper>
        </Box>
    );
};

const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <Box
            className='swiper-nav-btns w-full flex justify-between'
            sx={(theme) => ({
                padding: { sm: 0, xs: '0 10px' },
                position: 'absolute',
                left: 0,
                top: '50%',
                zIndex: 1,
                '& button': {
                    transform: 'translateY(-50%)',
                    width: { sm: '50px', xs: '30px' },
                    height: { sm: '50px', xs: '30px' },
                    borderRadius: '50%',
                    color: theme.color.red,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': {
                        fontSize: { sm: '30px', xs: '18px' },
                    },
                },
            })}
        >
            <IconButton onClick={() => swiper.slidePrev()}>
                <ArrowBackIosRoundedIcon />
            </IconButton>
            <IconButton onClick={() => swiper.slideNext()}>
                <ArrowForwardIosRoundedIcon />
            </IconButton>
        </Box>
    );
};
