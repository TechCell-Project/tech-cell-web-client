'use client';

import React, { useState, useRef, useEffect } from 'react';

import '@styles/components/modal.module.scss';
import styles from '@styles/components/productdetail.module.scss';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { StarRateComponent } from '../StarRate/StarRate';
import { SliderImgProductDetail } from './SliderImg';
import ChooseProduct from './ChooseProduct';
import { EndowProduct } from './EndowProduct';
import { BundleProduct } from './BundleProduct';
import { SalientFeatures } from './SalientFeatures';
import { Specification } from './Specification';

import { LoadingSection } from '@components/Common/Display/LoadingSection';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getDetailsProduct } from '@store/slices/productSlice';
import { PriceModel, ProductModel } from '@models/Product';
import { currencyFormat, getSingleAttribute } from 'utils';
import { VariantInfo } from '@interfaces/product';
import CustomizedDialogs from './SelectColorDialog';

import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export const ProductDetail = ({ id }: { id: string }) => {
    const theme = useTheme();
    const [showDialog, setShowDialog] = useState(false);
    const handleClickOpen = () => {
        setShowDialog(true);
    };
    const handleClose = () => {
        setShowDialog(false);
    };

    const [productDetail, setProductDetail] = useState<ProductModel>(new ProductModel());
    const [variant, setVariant] = useState<VariantInfo>({
        variantThumbnail: '',
        storage: '',
        color: '',
        isSelectedColor: false,
        price: new PriceModel(),
        sku: '',
    });

    const { product, isLoadingDetails } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getDetailsProduct(id)).then();
    }, [id, dispatch]);

    useEffect(() => {
        if (product !== null) {
            setProductDetail(product);
        }
    }, [product]);

    // console.log(productDetail);

    const handleSelectVariant = (variant: VariantInfo) => {
        setVariant(variant);
    };

    return isLoadingDetails ? (
        <LoadingSection isLoading={isLoadingDetails} />
    ) : (
        <div className={styles.productDetails_content}>
            <Stack direction="row" spacing={2} alignItems="center" className={styles.nav_links}>
                <Link href="/">Trang chủ</Link>
                <ArrowForwardIosIcon fontSize="small" sx={{ color: theme.color.red }} />
                <Link href="/danh-sach-san-pham">Điện Thoại</Link>
            </Stack>

            {/* productname_evaluate */}
            <div className={styles.productname_evaluate}>
                <div className={styles.productname}>
                    <h3>{productDetail.name}</h3>
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
                    <SliderImgProductDetail images={productDetail.generalImages} />

                    {/* Thông tin sản phẩm */}
                    <div className={styles.product_content_details}>
                        <div className={styles.product_name}>{productDetail.name}</div>

                        {/* hãng sản phẩm */}
                        <p className={styles.product_category}>
                            {getSingleAttribute(productDetail.generalAttributes, 'brand').v} - Điện
                            thoại
                        </p>

                        <div className={styles.product_price_old}>
                            {/* giá sản phẩm */}
                            {variant !== undefined && (
                                <>
                                    {variant.price.sale !== 0 ? (
                                        <>
                                            <p className={styles.product_price}>
                                                {currencyFormat(variant.price.sale)}VND
                                                <del className={styles.old_price}>
                                                    {currencyFormat(variant.price.base)}VND
                                                </del>
                                            </p>
                                            {/* Discount */}
                                            <div className={styles.product_page_offer_sold}>
                                                <div
                                                    className={
                                                        styles.product_page_offer_sold_content
                                                    }
                                                >
                                                    <div className={styles.product_offer}>
                                                        <LocalOfferIcon
                                                            sx={{ marginRight: '10px' }}
                                                        />{' '}
                                                        {100 -
                                                            Math.round(
                                                                (variant.price.sale /
                                                                    variant.price.base) *
                                                                    100,
                                                            )}{' '}
                                                        % Discount
                                                    </div>
                                                    {/* <div className={styles.product_sold}>
                                                    <AttachMoneyIcon />
                                                    <strong>
                                                        {productDemo.sold} <span>Products Sold</span>
                                                    </strong>
                                                </div> */}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className={styles.product_price}>
                                            {currencyFormat(variant.price.base)}VND
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Thông tin sản phẩm */}
                        <p className={styles.product_desc}></p>
                        {/* Chọn sản phẩm */}
                        <ChooseProduct
                            variations={productDetail.variations}
                            handleSelectVariant={handleSelectVariant}
                        />

                        {/* Btn thêm sản phẩm và mua sản phẩm */}
                        <CustomizedDialogs
                            productCart={{ productId: id, sku: variant.sku, quantity: 1 }}
                            missingColor={variant !== undefined ? !variant.isSelectedColor : true}
                        />

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
                    <SalientFeatures content={productDetail.description} />
                </div>
                <div className={styles.wrapper_right}>
                    <div className={styles.card_content_right}>
                        <div className={styles.card_title_right}>
                            <h4>Thông số kỹ thuật</h4>
                        </div>
                        <div className={styles.card_body_right}>
                            <Specification techInfo={productDetail.generalAttributes} />
                            <div className={styles.card_right_btn}>
                                <a onClick={() => setShowDialog(true)}>Xem cấu hình chi tiết</a>
                            </div>

                            <Dialog aria-labelledby="customized-dialog-title" open={showDialog}>
                                <DialogTitle sx={{ backgroundColor: '#ee4949', color: 'white' }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        Thông số kĩ thuật
                                    </Typography>
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Specification techInfo={productDetail.generalAttributes} />
                                </DialogContent>
                                <DialogActions
                                    sx={{
                                        backgroundColor: '#ee4949',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        onClick={handleClose}
                                        sx={{ color: 'white', width: '100%' }}
                                    >
                                        Đóng
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            <hr className={styles.hr} />
        </div>
    );
};

export default ProductDetail;