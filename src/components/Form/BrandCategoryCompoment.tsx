'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';

const BrandCategoryCompoment = () => {
    return (
        <Box sx={{ flexGrow: 1, margin: '20px 0px', display: 'flex', justifyContent: 'center' }}>
            <Grid
                container
                spacing={1}
                sx={{
                    marginLeft:{xs:'0.1px'},
                    width: { xs: '390px', lg: '1200px', sm: '960px' },
                    border: {xs:'none' , lg:'1px solid #EE4949'},
                    overflow: 'hidden',
                    borderRadius:{xs:'0px' , lg:'5px'},
                    cursor: 'pointer',
                }}
            >
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/1.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/2.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/3.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/4.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/5.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/6.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/7.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/8.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/9.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/10.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/11.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={3}
                    md={2}
                    sm={2}
                    sx={{
                        width: '200px',
                        height: { lg: '160px !important', xs: '150px !important' },
                        padding: '15px 15px 15px 15px !important',
                        textAlign: 'center',
                        border: '1px solid #f5f5f5',
                        transition: ' all .5s',
                        '&:hover': {
                            boxShadow: '0px 0px 10px #989797',
                        },
                    }}
                >
                    <Link href="#">
                        <Box
                            sx={{
                                width: { lg: '95px', xs: '65px' },
                                height: { lg: '95px', xs: '65px' },
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src="/brand_category_img/12.webp" width={60} height={60} alt="" />
                        </Box>
                        <Box
                            sx={{
                                marginTop: { xs: '5px' },
                                fontSize: { lg: '16px', xs: '12px' },
                            }}
                        >
                            Điện thoại
                        </Box>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BrandCategoryCompoment;
