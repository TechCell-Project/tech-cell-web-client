'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@styles/components/slider.module.scss';
import { CardRelatedProduct } from './Products/CardRelatedProduct';

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'red',
                padding: '10px',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'block',
                background: 'red',
                padding: '10px',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
            }}
            onClick={onClick}
        />
    );
}

export const SliderProduct = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: (dots: any) => (
            <div>
                <ul className={styles.slick_dots}>{dots}</ul>
            </div>
        ),
        customPaging: (i: any) => <div className={styles.slider_paading}>{i + 1}</div>,
    };
    return (
        <div>
            <h2> Single Item</h2>
            <Slider {...settings}>
                <div>
                    <CardRelatedProduct />
                </div>
                <div>
                    <CardRelatedProduct />
                </div>
                <div>
                    <CardRelatedProduct />
                </div>
                <div>
                    <CardRelatedProduct />
                </div>
                <div>
                    <CardRelatedProduct />
                </div>
                <div>
                    <CardRelatedProduct />
                </div>
            </Slider>
        </div>
    );
};
