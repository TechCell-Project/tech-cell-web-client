"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { product } from './product';
import styles from '../../../styles/components/productdetail.module.scss';

const ChooseColor = () => {
    // xử lý click border ở phẩn chọn màu sản phẩm
    const [selectedImg, setSelectedImg] = useState(product.colorImgs[0].color_product_img);
    return (
        <>
            {product.colorImgs.map((colorimg) => (
                <div key={colorimg.color_product_img}>
                    <button
                        // style={{ background: colorImg.color }}
                        className={`${
                            colorimg.color_product_img === selectedImg
                                ? `${styles.activecolor}`
                                : ''
                        } `}
                        onClick={() => setSelectedImg(colorimg.color_product_img)}
                    >
                        <div className={styles.product_option_block}>
                            <Image src={colorimg.color_product_img} width={30} height={30} alt="" />
                            <div className={styles.product_option_content_text}>
                                <p>{colorimg.color_product_text}</p>
                                <p>{product.price}đ</p>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
        </>
    );
};

export default ChooseColor;