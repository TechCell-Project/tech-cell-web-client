'use client';

import React, { useState, useEffect } from 'react';

import styles from '@styles/components/productdetail.module.scss';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { StarRateComponent } from '../StarRate/StarRate';
import { SliderImgProductDetail } from './SliderImg';

import { EndowProduct } from './EndowProduct';
import { BundleProduct } from './BundleProduct';
import { SalientFeatures } from './SalientFeatures';
import { Specification } from './Specification';

import { LoadingSection } from '@components/Common/Display/LoadingSection';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getDetailsProduct } from '@store/slices/productSlice';
import { ProductModel, VariationModel } from '@models/Product';
import { currencyFormat, getSingleAttribute } from 'utils';
import CustomizedDialogs from './SelectColorDialog';
import ChooseProductVariation from './ChooseProductVariation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ShowDialog } from '@components/Common/Display';
import Stack from '@mui/system/Stack';
import { CommonBtn } from '@components/Common';

export const ProductDetail = ({ id }: { id: string }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedVariationSku, setSelectedVariationSku] = useState<string | null>(null);
    const [productDetail, setProductDetail] = useState<ProductModel | null>(null);
    const [variant, setVariant] = useState<VariationModel | null>(null);

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

    useEffect(() => {
        if (variant === null) {
            if (productDetail) {
                setVariant({
                    ...new VariationModel(),
                    price: productDetail.variations[0].price,
                });
            }
        }
    }, [productDetail]);

    useEffect(() => {
        if (productDetail) {
            if (selectedVariationSku !== null) {
                const variant = productDetail.variations.find(
                    (variation) => variation.sku === selectedVariationSku,
                );
                if (variant) {
                    setVariant(variant);
                }
            } else {
                setVariant((prev) => {
                    if (prev !== null) {
                        return {
                            ...prev,
                            sku: '',
                        };
                    } else {
                        return {
                            ...new VariationModel(),
                            price: productDetail.variations[0].price,
                        };
                    }
                });
            }
        }
    }, [selectedVariationSku, productDetail]);

    const handleSelectVariation = (sku: string | null) => {
        setSelectedVariationSku(sku);
    };

    return isLoadingDetails ? (
        <LoadingSection isLoading={isLoadingDetails} />
    ) : (
        <>
            {productDetail && (
                <>
                    <Box sx={{ backgroundColor: '#fff', boxShadow: '0 0 3px 0 #dee2e6', pb: 5 }}>
                        <Container sx={{ maxWidth: '1320px !important', pt: 5 }}>
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
                                        <div className={styles.product_name}>
                                            {productDetail.name}
                                        </div>
                                        {/* hãng sản phẩm */}
                                        <p className={styles.product_category}>
                                            {
                                                getSingleAttribute(
                                                    productDetail.generalAttributes,
                                                    'brand',
                                                ).v
                                            }{' '}
                                            - Điện thoại
                                        </p>
                                        <div className={styles.product_price_old}>
                                            {/* giá sản phẩm */}
                                            {variant !== null && (
                                                <>
                                                    {variant.price.special !== 0 ? (
                                                        <>
                                                            <p className={styles.product_price}>
                                                                {currencyFormat(
                                                                    variant.price.special,
                                                                )}
                                                                ₫
                                                                <del className={styles.old_price}>
                                                                    {currencyFormat(
                                                                        variant.price.base,
                                                                    )}
                                                                    ₫
                                                                </del>
                                                            </p>
                                                            {/* Discount */}
                                                            <div
                                                                className={
                                                                    styles.product_page_offer_sold
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.product_page_offer_sold_content
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.product_offer
                                                                        }
                                                                    >
                                                                        <LocalOfferIcon
                                                                            sx={{
                                                                                marginRight: '10px',
                                                                            }}
                                                                        />{' '}
                                                                        {100 -
                                                                            Math.round(
                                                                                (variant.price
                                                                                    .special /
                                                                                    variant.price
                                                                                        .base) *
                                                                                    100,
                                                                            )}
                                                                        % Discount
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <p className={styles.product_price}>
                                                            {currencyFormat(variant.price.base)}₫
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        {/* Thông tin sản phẩm */}
                                        <p className={styles.product_desc}></p>
                                        <ChooseProductVariation
                                            variations={productDetail.variations}
                                            handleSelectVariation={handleSelectVariation}
                                        />
                                        {/* Btn thêm sản phẩm và mua sản phẩm */}
                                        <CustomizedDialogs
                                            productCart={{
                                                productId: id,
                                                sku: variant ? variant.sku : '',
                                                quantity: 1,
                                            }}
                                        />
                                        {/* Ưu đãi thêm */}
                                        <div className={styles.extra_offer_container}>
                                            <div className={styles.extra_offer_heading}>
                                                ƯU ĐÃI THÊM
                                            </div>
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
                            </div>
                        </Container>
                    </Box>

                    <Container sx={{ maxWidth: '1320px !important', mt: 7, mb: 5, pb: 8 }}>
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
                                            <button onClick={() => setShowDialog(true)}>
                                                Xem cấu hình chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </>
            )}

            {showDialog && (
                <DialogDetailsTable
                    product={productDetail as ProductModel}
                    isOpen={showDialog}
                    handleClose={() => setShowDialog(false)}
                />
            )}
        </>
    );
};

const DialogDetailsTable = ({
    isOpen,
    handleClose,
    product,
}: {
    isOpen: boolean;
    handleClose: () => void;
    product: ProductModel;
}) => {
    return (
        <ShowDialog
            dialogTitle='Thông số kỹ thuật'
            isOpen={isOpen}
            handleClose={handleClose}
            dialogStyle={{ minWidth: { lg: '45%', xs: '80%' } }}
            isSmall
        >
            <Stack width='100%'>
                <Specification techInfo={product.generalAttributes} />
            </Stack>
            <Stack
                direction='row'
                width='100%'
                justifyContent='flex-end'
                ml='0px !important'
                mt={5}
            >
                <CommonBtn content='Hủy bỏ' variant='outlined' handleClick={handleClose} />
            </Stack>
        </ShowDialog>
    );
};

export default ProductDetail;
