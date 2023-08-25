'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../../styles/components/productdetail.module.scss'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CameraIcon from '@mui/icons-material/Camera';
import DnsIcon from '@mui/icons-material/Dns';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { product } from './product';

export const SliderImgProductDetail = () => {

    const [sliderIndex, setSliderIndex] = useState(1);
    const [width, setWidth] = useState(0);
    const [start, setStart] = useState(0);
    const [change, setChange] = useState(17);

    const sliderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!sliderRef.current) {
            return;
        }
        const scrollWidth = sliderRef.current.scrollWidth;
        const childrenElementCount = sliderRef.current.childElementCount;
        const width = scrollWidth / childrenElementCount;
        setWidth(width);
    }, []);

    // click để chuyển slider sản phẩm
    const plusSlider = (n: number) => {
        setSliderIndex((prev) => prev + n);
        sliderShow(sliderIndex + n);
        // console.log(n);
    };

    const sliderShow = (n: number) => {
        if (n > product.images.length) {
            setSliderIndex(1);
        }
        if (n < 1) {
            setSliderIndex(product.images.length);
        }
    };

    // Drag
    const dragStart = (e: any) => {
        setStart(e.clientX);
    };

    const dragOver = (e: any) => {
        let touch = e.clientX;
        setChange(start - touch);
    };

    const dragEnd = (e: any) => {
        if (change > 0) {
            if (sliderRef.current != null) {
                sliderRef.current.scrollLeft += width;
            }
        } else {
            if (sliderRef.current != null) {
                sliderRef.current.scrollLeft -= width;
            }
        }
    };

    useEffect(() => {
        if (!sliderRef.current || !width) {
            return;
        }

        const numOfThumb = Math.round(sliderRef.current.offsetWidth / width);
        sliderRef.current.scrollLeft = sliderIndex > numOfThumb ? (sliderIndex - 1) * width : 0;
    }, [width, sliderIndex]);

   

    
    return (
        <>
            <div className={styles.product_page_img}>
                            {product.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={styles.mySlides}
                                    style={{
                                        display: index + 1 === sliderIndex ? 'block' : 'none',
                                    }}
                                >
                                    <div className={styles.numbertext}>
                                        {index + 1} / {product.images.length}
                                    </div>
                                    <div className={styles.product_details_img}>
                                        <Image
                                            src={image.src}
                                            alt=""
                                            width={398.4}
                                            height={398.4}
                                        />
                                    </div>

                                    <div className={styles.product_details_btn}>
                                        <a
                                            href="#!"
                                            className={styles.prev_icon}
                                            onClick={() => plusSlider(-1)}
                                        >
                                            <ArrowBackIosNewIcon />
                                        </a>
                                        <a
                                            href="#!"
                                            className={styles.next_icon}
                                            onClick={() => plusSlider(1)}
                                        >
                                            <ArrowForwardIosIcon />
                                        </a>
                                    </div>
                                </div>
                            ))}

                            <div
                                className={styles.slider_img}
                                draggable={true}
                                ref={sliderRef}
                                onDragStart={dragStart}
                                onDragOver={dragOver}
                                onDragEnd={dragEnd}
                            >
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.slider_box} ${
                                            index + 1 === sliderIndex ? `${styles.active}` : ''
                                        }`}
                                        onClick={() => setSliderIndex(index + 1)}
                                    >
                                        <Image src={image.src} width={60} height={60} alt="" />
                                    </div>
                                ))}
                            </div>

                            {/* Thông số sản phẩm */}
                            <div className={styles.product_parameters}>
                                <div className={styles.product_parameter_heading}>
                                    Thông tin sản phẩm
                                </div>
                                <div className={styles.product_parameter_content}>
                                    <ul>
                                        <li>
                                            <span>
                                                <PhoneIphoneIcon />
                                            </span>
                                            <p>6.7 inch, Super Retina XDR, 2796 x 1290 Pixels</p>
                                        </li>

                                        <li>
                                            <span>
                                                <CameraIcon />
                                            </span>
                                            <p>6.7 inch, Super Retina XDR, 2796 x 1290 Pixels</p>
                                        </li>

                                        <li>
                                            <span>
                                                <DnsIcon />
                                            </span>
                                            <p>6.7 inch, Super Retina XDR, 2796 x 1290 Pixels</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Chính sách sản phẩm */}
                            <div className={styles.product_policy}>
                                <div className={styles.product_policy_content}>
                                    <span>
                                        <WorkspacePremiumIcon />
                                    </span>
                                    <p>Hàng chính hãng - Bảo hành 12 Tháng</p>
                                </div>
                                <div className={styles.product_policy_content}>
                                    <span>
                                        <LocalShippingIcon />
                                    </span>
                                    <p>Giao hàng toàn quốc</p>
                                </div>
                            </div>
                        </div>
        </>
    );
};