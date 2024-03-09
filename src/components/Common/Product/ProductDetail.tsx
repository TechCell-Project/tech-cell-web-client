'use client';

import React, { memo, useEffect, useState } from 'react';

import {
    AttributeDynamics,
    ImageModel,
    PagingProduct,
    PriceModel,
    ProductModel,
    VariationModel,
} from '@/models';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import StarRateIcon from '@mui/icons-material/StarRate';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AssistantIcon from '@mui/icons-material/Assistant';

import { ProductImageSlider, ProductPackageInfo } from './ProductImageSlider';
import { SelectProductVariation } from './SelectProductVariation';
import { ProductPrice } from './ProductPrice';
import { ProductsSuggestion } from './ProductsSuggestion';
import { SalientFeatures } from './SalientFeatures';
import { ShowDialog } from '../Display/DialogCustom';
import { CommonBtn } from '../FormGroup/CommonBtn';
import { Specification } from './Specification';

import { getMatchProductColorsToImages, getSingleAttribute } from '@/utils';
import { useAppDispatch } from '@/store/store';
import { getAllProduct } from '@/store/slices/productSlice';
import { HandlingButtons } from './HandlingButtons';

const Title = styled(Typography)(({ theme }) => ({
    lineHeight: '22px',
    fontWeight: 700,
    fontSize: '16px',
    [theme.breakpoints.up('sm')]: {
        fontSize: '20px',
    },
}));

const DetailWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'fit-content',
    backgroundColor: '#fff',
    boxShadow: `0 0 3px 0 ${theme.color.lightGray}`,
    borderRadius: '5px',
}));

interface ProductDetailProps {
    product: ProductModel;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
    const dispatch = useAppDispatch();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [currentPrice, setCurrentPrice] = useState<PriceModel>(product.variations[0].price);
    const [selectedVariationSku, setSelectedVariationSku] = useState<string | null>(null);
    const [colorIndex, setColorIndex] = useState<number | null>(null);

    const combineProductImages: ImageModel[] = [
        ...product.generalImages,
        ...getMatchProductColorsToImages(product.variations),
    ];

    useEffect(() => {
        if (selectedVariationSku !== null) {
            setCurrentPrice(
                product.variations.find((variation) => variation.sku === selectedVariationSku)!
                    .price,
            );
        }
    }, [selectedVariationSku, product.variations]);

    useEffect(() => {
        const pagingData = new PagingProduct();

        dispatch(getAllProduct(pagingData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#fff',
                    pb: { sm: '20px', xs: '10px' },
                }}
            >
                <Container sx={{ maxWidth: '1320px !important', pt: 5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            maxHeight: '24px',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <Title variant='h3'>{product.name}</Title>
                        <Box
                            sx={{
                                display: 'flex',
                                color: '#f59e0b',
                                '& svg': {
                                    width: '15px',
                                    height: '15px',
                                },
                            }}
                        >
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                            <StarRateIcon />
                        </Box>
                    </Box>
                    <Divider sx={{ margin: { sm: '24px 0', xs: '15px 0' } }} />
                    <Box
                        sx={{
                            maxWidth: '100%',
                            margin: 0,
                            display: { sm: 'grid', xs: 'flex' },
                            gridTemplateColumns: { sm: '54% 1fr' },
                            flexDirection: { xs: 'column' },
                            gap: { sm: '30px', xs: '15px' },
                        }}
                    >
                        <Box className='w-full'>
                            <ProductImageSlider
                                images={combineProductImages}
                                selectedImage={colorIndex}
                            />
                        </Box>
                        <Box className='w-full'>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: '12px',
                                    mb: '20px',
                                }}
                            >
                                <Title variant='h3'>{product.name}</Title>
                                <Typography
                                    variant='body1'
                                    fontSize={14}
                                    fontWeight={400}
                                    sx={{ mb: '10px' }}
                                >
                                    {getSingleAttribute(product.generalAttributes, 'brand').v}
                                    {' - '}
                                    {'Điện thoại'}
                                </Typography>
                                <ProductPrice price={currentPrice} />
                                <SelectProductVariation
                                    variations={product.variations}
                                    handleSelectVariationSku={setSelectedVariationSku}
                                    handleSelectColorAttribute={(index: number) =>
                                        setColorIndex(product.generalImages.length + index + 1)
                                    }
                                />

                                {/* Handle adding to cart and buying */}
                                <HandlingButtons
                                    productCart={{
                                        productId: product._id!,
                                        sku: selectedVariationSku,
                                        quantity: 1,
                                    }}
                                />

                                <ProductPackageInfo
                                    sx={{
                                        border: '1px solid #ee4949',
                                        '& svg': { color: '#ee4949' },
                                    }}
                                >
                                    <ListItem className='background-red'>
                                        <ListItemIcon>
                                            <AssistantIcon sx={{ fontSize: '32px' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    sx={{ fontSize: '16px', fontWeight: 700 }}
                                                >
                                                    Ưu đãi thêm
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider sx={{ borderColor: '#ee4949' }} />
                                    <ListItem
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        <div className='info-item'>
                                            <ListItemIcon>
                                                <FileDownloadDoneIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{ fontSize: '14px' }}>
                                                        Giảm 1% tối đa 100.000đ (Áp dụng khi thanh
                                                        toán 100% giá trị đơn hàng qua Vnpay).
                                                    </Typography>
                                                }
                                            />
                                        </div>
                                        <div className='info-item'>
                                            <ListItemIcon>
                                                <FileDownloadDoneIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{ fontSize: '14px' }}>
                                                        Giảm tới 200.000đ khi mua kèm Microsoft
                                                        Office/Microsoft 365.
                                                    </Typography>
                                                }
                                            />
                                        </div>
                                        <div className='info-item'>
                                            <ListItemIcon>
                                                <FileDownloadDoneIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{ fontSize: '14px' }}>
                                                        Ưu đãi Youtube Premium (Áp dụng một số sản
                                                        phẩm)
                                                    </Typography>
                                                }
                                            />
                                        </div>
                                    </ListItem>
                                </ProductPackageInfo>

                                <ProductsSuggestion label={product.category.label!} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    pb: { sm: '20px', xs: '10px' },
                }}
            >
                <Container sx={{ maxWidth: '1320px !important', pt: 5 }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: { sm: 'grid' },
                            gridTemplateColumns: { sm: '60% 1fr' },
                            gap: { sm: '30px', xs: '15px' },
                        }}
                    >
                        <DetailWrapper>
                            <SalientFeatures content={product.description} />
                        </DetailWrapper>
                        <DetailWrapper>
                            <Box
                                sx={{
                                    padding: { sm: '16px 20px', xs: '10px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: { sm: '14px', xs: '10px' },
                                }}
                            >
                                <Typography fontWeight={600} fontSize={{ sm: 16, xs: 14 }}>
                                    Thông số kỹ thuật
                                </Typography>
                                <Specification techInfo={product.generalAttributes.slice(0, 8)} />
                                <div className='flex justify-center' id='specification-btn'>
                                    <Button
                                        className='btn-text'
                                        variant='text'
                                        onClick={() => setShowDialog(true)}
                                    >
                                        Xem cấu hình chi tiết
                                    </Button>
                                </div>
                            </Box>
                        </DetailWrapper>
                    </Box>
                </Container>
            </Box>

            {showDialog && (
                <DialogDetailsTable
                    attributes={product.generalAttributes}
                    isOpen={showDialog}
                    handleClose={() => setShowDialog(false)}
                />
            )}
        </>
    );
};

interface DialogDetailsInfoProps {
    isOpen: boolean;
    handleClose: () => void;
    attributes: AttributeDynamics[];
}

const DialogDetailsTable = ({ isOpen, handleClose, attributes }: DialogDetailsInfoProps) => {
    return (
        <ShowDialog
            dialogTitle='Thông số kỹ thuật'
            isOpen={isOpen}
            handleClose={handleClose}
            dialogStyle={{ minWidth: { lg: '45%', xs: '80%' } }}
            isSmall={false}
        >
            <Stack width='100%' spacing={2} justifyContent='center' alignItems='center'>
                <Specification techInfo={attributes} isDialog />
                <CommonBtn content='Đóng' variant='outlined' handleClick={handleClose} />
            </Stack>
        </ShowDialog>
    );
};
