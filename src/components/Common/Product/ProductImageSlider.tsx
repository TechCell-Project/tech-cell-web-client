'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { ImageModel } from '@/models';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const SliderContainer = styled(Box)(({ theme }) => ({
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    maxHeight: '400px',
    border: `2px solid ${theme.color.lightGray}`,
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '12px',
    '&:hover': {
        border: `2px solid ${theme.color.red}`,
        '& button': {
            display: 'flex',
            '&:hover': {
                opacity: 1,
                backgroundColor: `${theme.color.red} !important`,
            },
        },
    },
    [theme.breakpoints.down('sm')]: {
        '& img': {
            height: '180px',
            width: '100% !important',
            objectFit: 'contain !important',
        },
    },
}));

const BtnSlider = styled(IconButton)(({ theme }) => ({
    display: 'none',
    minWidth: '48px',
    height: '40px',
    color: 'white',
    padding: '5px',
    backgroundColor: theme.color.red,
    opacity: '50%',
    transform: 'translateY(-50%)',
    '& svg': {
        fontSize: '18px',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
    },
}));

const BottomImage = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    gap: '10px',
    flexWrap: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    marginBottom: '12px',
    // hide scrollbar
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
}));

export const ProductPackageInfo = styled(List)(({ theme }) => ({
    width: '100%',
    border: `2px solid ${theme.color.lightGray}`,
    borderRadius: '5px',
    paddingTop: 0,
    marginBottom: '12px',
    '& .background-red': {
        color: theme.color.red,
        backgroundColor: theme.color.lightRed,
        gap: '10px',
        '&.MuiListItem-root': {
            paddingTop: '4px',
            paddingBottom: '4px',
        },
    },
    '& .info-item': {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: '15px',
    },
    '& .MuiListItemIcon-root': {
        display: 'flex',
        alignItems: 'center',
        minWidth: 0,
    },
}));

const TechcellCommitment = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& svg': {
        color: theme.color.red,
        fontSize: '30px',
    },
    '& p': {
        fontSize: '14px',
        marginLeft: '10px',
        fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        marginBottom: '12px',
        '& .item': {
            flexDirection: 'column',
            width: '50%',
            '& p': {
                textAlign: 'center',
                marginLeft: 0,
            },
        },
    },
}));

interface SliderProps {
    images: ImageModel[];
    selectedImage: number | null;
}

export const ProductImageSlider = ({ images, selectedImage }: SliderProps) => {
    const [sliderIndex, setSliderIndex] = useState<number>(1);

    const handleChangeSlideImg = (e: React.MouseEvent<HTMLButtonElement>, count: number) => {
        e.stopPropagation();
        if (sliderIndex + count > images.length) {
            setSliderIndex(1);
        } else if (sliderIndex + count <= 0) {
            setSliderIndex(images.length);
        } else {
            setSliderIndex((prev) => prev + count);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            setSliderIndex(selectedImage);
        }
    }, [selectedImage, images.length]);

    return (
        <>
            <SliderContainer>
                <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
                    <Typography
                        variant='body1'
                        sx={{ fontSize: '14px', fontWeight: 600, margin: '10px', color: '#ee4949' }}
                    >
                        {sliderIndex} / {images.length}
                    </Typography>
                </Box>
                <Box sx={{ position: 'absolute', left: 0, top: '50%' }}>
                    <BtnSlider
                        sx={{ borderRadius: '0 5px 5px 0' }}
                        size='large'
                        onClick={(e) => handleChangeSlideImg(e, -1)}
                    >
                        <ArrowBackIosNewIcon />
                    </BtnSlider>
                </Box>
                <Box sx={{ position: 'absolute', right: 0, top: '50%' }}>
                    <BtnSlider
                        sx={{ borderRadius: '5px 0 0 5px' }}
                        size='large'
                        onClick={(e) => handleChangeSlideImg(e, 1)}
                    >
                        <ArrowForwardIosIcon />
                    </BtnSlider>
                </Box>
                {images.map((image, index) => (
                    <Box
                        key={image.publicId}
                        sx={{
                            display: index + 1 === sliderIndex ? 'flex' : 'none',
                            width: '100%',
                            height: 'auto',
                            justifyContent: 'center',
                            transitionProperty: 'transform',
                        }}
                    >
                        <Image
                            src={image.url}
                            alt='product image'
                            height={400}
                            width={400}
                            style={{
                                maxHeight: '100%',
                                width: 'auto',
                                objectFit: 'fill',
                            }}
                        />
                    </Box>
                ))}
            </SliderContainer>
            <BottomImage>
                {images.map((image, index) => (
                    <Box
                        key={image.publicId}
                        onClick={() => setSliderIndex(index + 1)}
                        sx={{
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '3px',
                            minWidth: '74px',
                            width: '74px',
                            height: '74px',
                            ...(index + 1 === sliderIndex
                                ? {
                                      border: '1px solid #ee4949',
                                  }
                                : {
                                      border: '1px solid white',
                                      opacity: '60%',
                                      '&:hover': {
                                          opacity: 1,
                                      },
                                  }),
                        }}
                    >
                        <Image
                            src={image.url}
                            width={72}
                            height={72}
                            alt='bottom image'
                            style={{
                                height: '100%',
                                width: 'auto',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </Box>
                ))}
            </BottomImage>
            <ProductPackageInfo>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>
                                Thông tin sản phẩm
                            </Typography>
                        }
                    />
                </ListItem>
                <Divider />
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
                            <PhoneIphoneIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px' }}>
                                    Mới, đầy đủ phụ kiện từ nhà sản xuất.
                                </Typography>
                            }
                        />
                    </div>
                    <div className='info-item'>
                        <ListItemIcon>
                            <SafetyCheckIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px' }}>
                                    Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1
                                    trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
                                </Typography>
                            }
                        />
                    </div>
                    <div className='info-item'>
                        <ListItemIcon>
                            <PriceChangeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontSize: '14px' }}>
                                    Giá sản phẩm đã bao gồm VAT.
                                </Typography>
                            }
                        />
                    </div>
                </ListItem>
            </ProductPackageInfo>
            <TechcellCommitment>
                <div className='item flex items-center'>
                    <WorkspacePremiumIcon />
                    <Typography variant='body1'>Bảo hành 12 Tháng tại Techcell</Typography>
                </div>
                <div className='item flex items-center'>
                    <LocalShippingIcon />
                    <Typography variant='body1'>Giao hàng toàn quốc</Typography>
                </div>
            </TechcellCommitment>
        </>
    );
};
