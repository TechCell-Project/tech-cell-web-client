/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useState, useRef, useEffect } from 'react';
// import { Collapse, UnmountClosed } from 'react-collapse';
import Link from 'next/link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import styles from '../../../styles/components/productdetail.module.scss';
import { StarRateComponent } from '../StarRate/StarRate';
import { product } from './product';
import { SliderImgProductDetail } from './SliderImg';
import { Specification } from './Specification';
import { ChosseProduct } from './ChosseProduct';
import { ChosseColor } from './ChosseColor';
import { EndowProduct } from './EndowProduct';
import { BundleProduct } from './BundleProduct';
import { SalientFeatures } from './SalientFeatures';
// import { string } from 'yup';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import '../../../styles/components/modal.module.scss';


export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}


export const ProductDetail = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={styles.productDetails_content}>
                {/* nav_links */}
                <div className={styles.nav_links}>
                    <Link href="#">Trang chủ </Link> <span> {'>'} </span>{' '}
                    <Link href="#">Điện Thoại</Link>
                </div>

                {/* productname_evaluate */}
                <div className={styles.productname_evaluate}>
                    <div className={styles.productname}>
                        <h3>{product.name}</h3>
                    </div>
                    <div className={styles.evaluate}>
                        <div className={styles.evalute_icon}>
                            <StarRateComponent />
                        </div>

                        <div className={styles.evaluateText}>19 đánh giá</div>
                    </div>
                </div>

                <hr className={styles.hr} />

                {/* container */}
                <div className={styles.container}>
                    <section className={styles.produt_details}>
                        {/* hình ảnh sản phẩm */}
                        <SliderImgProductDetail />

                        {/* Thông tin sản phẩm */}
                        <div className={styles.product_content_details}>
                            <div className={styles.product_name}>{product.name}</div>

                            {/* hãng sản phẩm */}
                            <p className={styles.product_category}>
                                {product.brand} - {product.category}
                            </p>

                            <div className={styles.product_price_old}>
                                {/* giá sản phẩm */}
                                <p className={styles.product_price}>
                                    {Math.round(
                                        product.price - (product.price * product.discount) / 100,
                                    )}
                                    đ<del className={styles.old_price}>{product.price}đ</del>
                                </p>
                                {/* Discount */}
                                <div className={styles.product_page_offer_sold}>
                                    <div className={styles.product_page_offer_sold_content}>
                                        <div className={styles.product_offer}>
                                            <LocalOfferIcon sx={{ marginRight: '10px' }} />{' '}
                                            {product.discount} % Discount
                                        </div>
                                        {/* <div className={styles.product_sold}>
                                    <AttachMoneyIcon />
                                    <strong>
                                        {product.sold} <span>Products Sold</span>
                                    </strong>
                                </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin sản phẩm */}
                            <p className={styles.product_desc}>{product.desc}</p>
                            {/* Chọn dung lượng sản phẩm */}
                            <div className={styles.product_internal_content}>
                                <div className={styles.product_internal_name}>
                                    Chọn dung lượng sản phẩm
                                </div>
                                <ChosseProduct />
                            </div>

                            {/* Chọn màu sản phẩm */}
                            <div className={styles.product_options_content}>
                                <div className={styles.product_option_name}>
                                    Chọn màu để xem giá{' '}
                                </div>
                                <div className={styles.product_potions}>
                                    <ChosseColor />
                                </div>
                            </div>

                            {/* Btn thêm sản phẩm và mua sản phẩm */}
                            <div className={styles.btn_cart}>
                                <a href="#" className={styles.add_cart}>
                                    Thêm giỏi hàng
                                </a>
                                <a href="#" className={styles.buy_now}>
                                    Mua Ngay
                                </a>
                            </div>

                            {/* Ưu đãi thêm */}
                            <div className={styles.extra_offer_container}>
                                <div className={styles.extra_offer_heading}>ƯU ĐÃI THÊM</div>
                                <div className={styles.extra_offer_content}>
                                    <EndowProduct />
                                </div>
                            </div>

                            {/* Sản phẩm mua kèm */}
                            <div className={styles.product_bundled_container}>
                                <div className={styles.product_bundled}>
                                    <div className={styles.product_bundled_heading}>
                                        <h4>Gợi ý sản phẩm mua kèm</h4>
                                    </div>
                                    <BundleProduct />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.produt_all_info}></section>
                </div>

                <hr className={styles.hr} />
                {/* wrapper */}

                <div className={styles.wrapper}>
                    <div className={styles.wrapper_left}>
                        <SalientFeatures />
                    </div>
                    <div className={styles.wrapper_right}>
                        <div className={styles.card_content_right}>
                            <div className={styles.card_title_right}>
                                <h4>Thông số kỹ thuật</h4>
                            </div>
                            <div className={styles.card_body_right}>
                                <Specification />
                                <div className={styles.card_right_btn}>
                                    <a onClick={handleClickOpen}>
                                        Xem cấu hình chi tiết
                                    </a>
                                    <Dialog
                                        // onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <DialogTitle>
                                            <Typography variant="h6">Thông số kĩ thuật</Typography>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <Typography gutterBottom>
                                                Cras mattis consectetur purus sit amet fermentum.
                                                Cras justo odio, dapibus ac facilisis in, egestas
                                                eget quam. Morbi leo risus, porta ac consectetur ac,
                                                vestibulum at eros.
                                            </Typography>
                                            <Typography gutterBottom>
                                                Praesent commodo cursus magna, vel scelerisque nisl
                                                consectetur et. Vivamus sagittis lacus vel augue
                                                laoreet rutrum faucibus dolor auctor.
                                            </Typography>
                                            <Typography gutterBottom>
                                                Aenean lacinia bibendum nulla sed consectetur.
                                                Praesent commodo cursus magna, vel scelerisque nisl
                                                consectetur et. Donec sed odio dui. Donec
                                                ullamcorper nulla non metus auctor fringilla.
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>
                                                Save changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};