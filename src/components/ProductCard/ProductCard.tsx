'use client';

import React from 'react';
import { Box, Button, Container, Paper, Rating, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import styles from 'styles/components/productCard.module.scss';
import styledButton from 'styles/components/button.module.scss';
import Image from 'next/image';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';

const ProductCard = () => {
    const handleAddToWishlist = () => {
        console.log('click the product');
    };
    const handleAddToCart = () => {
        console.log('product added to cart');
    };
    return (
        <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
            <Grid xs={3}>
                <Paper elevation={3} square>
                    <div className={styles.product_card}>
                        <Stack alignItems={'center'}>
                            <Link href="/">
                                <Image
                                    src="https://res.cloudinary.com/dzoykqusl/image/upload/v1686850711/iphone-14-pro-deep-purple-rz-2_uqgmen.jpg"
                                    alt="product"
                                    width={171}
                                    height={240}
                                />
                            </Link>
                        </Stack>
                        <div className={styles.product_details}>
                            <Stack spacing={2}>
                                <Stack spacing={1}>
                                    <Link href="/">
                                        <h6 className="brand">Apple</h6>
                                    </Link>
                                    <Link href="/">
                                        <h4 className="product-title" onClick={() => {}}>
                                            Iphone 14 Promax
                                        </h4>
                                    </Link>

                                    <Rating
                                        sx={{ marginTop: '5px', marginBottom: '20px' }}
                                        name="simple-controlled"
                                        size="small"
                                        value={4}
                                        readOnly
                                    />
                                </Stack>
                                <p>25.000.000 VND</p>
                                <Stack direction="row" spacing={1} justifyContent="flex-start">
                                    <Button
                                        className={styledButton.addToCart}
                                        variant="outlined"
                                        startIcon={<ShoppingCartOutlinedIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={styledButton.addToWishlist}
                                        onClick={handleAddToWishlist}
                                    >
                                        <FavoriteIcon className={styledButton.addToWishlistIcon} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid xs={3}>
                <Paper elevation={3} square>
                    <div className={styles.product_card}>
                        <Stack alignItems={'center'}>
                            <Link href="/">
                                <Image
                                    src="https://res.cloudinary.com/dzoykqusl/image/upload/v1686850711/iphone-14-pro-deep-purple-rz-2_uqgmen.jpg"
                                    alt="product"
                                    width={171}
                                    height={240}
                                />
                            </Link>
                        </Stack>
                        <div className={styles.product_details}>
                            <Stack spacing={2}>
                                <Stack spacing={1}>
                                    <Link href="/">
                                        <h6 className="brand">Apple</h6>
                                    </Link>
                                    <Link href="/">
                                        <h4 className="product-title" onClick={() => {}}>
                                            Iphone 14 Promax
                                        </h4>
                                    </Link>

                                    <Rating
                                        sx={{ marginTop: '5px', marginBottom: '20px' }}
                                        name="simple-controlled"
                                        size="small"
                                        value={4}
                                        readOnly
                                    />
                                </Stack>
                                <p>25.000.000 VND</p>
                                <Stack direction="row" spacing={1} justifyContent="flex-start">
                                    <Button
                                        className={styledButton.addToCart}
                                        variant="outlined"
                                        startIcon={<ShoppingCartOutlinedIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={styledButton.addToWishlist}
                                        onClick={handleAddToWishlist}
                                    >
                                        <FavoriteIcon className={styledButton.addToWishlistIcon} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid xs={3}>
                <Paper elevation={3} square>
                    <div className={styles.product_card}>
                        <Stack alignItems={'center'}>
                            <Link href="/">
                                <Image
                                    src="https://res.cloudinary.com/dzoykqusl/image/upload/v1686850711/iphone-14-pro-deep-purple-rz-2_uqgmen.jpg"
                                    alt="product"
                                    width={171}
                                    height={240}
                                />
                            </Link>
                        </Stack>
                        <div className={styles.product_details}>
                            <Stack spacing={2}>
                                <Stack spacing={1}>
                                    <Link href="/">
                                        <h6 className="brand">Apple</h6>
                                    </Link>
                                    <Link href="/">
                                        <h4 className="product-title" onClick={() => {}}>
                                            Iphone 14 Promax
                                        </h4>
                                    </Link>

                                    <Rating
                                        sx={{ marginTop: '5px', marginBottom: '20px' }}
                                        name="simple-controlled"
                                        size="small"
                                        value={4}
                                        readOnly
                                    />
                                </Stack>
                                <p>25.000.000 VND</p>
                                <Stack direction="row" spacing={1} justifyContent="flex-start">
                                    <Button
                                        className={styledButton.addToCart}
                                        variant="outlined"
                                        startIcon={<ShoppingCartOutlinedIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={styledButton.addToWishlist}
                                        onClick={handleAddToWishlist}
                                    >
                                        <FavoriteIcon className={styledButton.addToWishlistIcon} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid xs={3}>
                <Paper elevation={3} square>
                    <div className={styles.product_card}>
                        <Stack alignItems={'center'}>
                            <Link href="/">
                                <Image
                                    src="https://res.cloudinary.com/dzoykqusl/image/upload/v1686850711/iphone-14-pro-deep-purple-rz-2_uqgmen.jpg"
                                    alt="product"
                                    width={171}
                                    height={240}
                                />
                            </Link>
                        </Stack>
                        <div className={styles.product_details}>
                            <Stack spacing={2}>
                                <Stack spacing={1}>
                                    <Link href="/">
                                        <h6 className="brand">Apple</h6>
                                    </Link>
                                    <Link href="/">
                                        <h4 className="product-title" onClick={() => {}}>
                                            Iphone 14 Promax
                                        </h4>
                                    </Link>

                                    <Rating
                                        sx={{ marginTop: '5px', marginBottom: '20px' }}
                                        name="simple-controlled"
                                        size="small"
                                        value={4}
                                        readOnly
                                    />
                                </Stack>
                                <p>25.000.000 VND</p>
                                <Stack direction="row" spacing={1} justifyContent="flex-start">
                                    <Button
                                        className={styledButton.addToCart}
                                        variant="outlined"
                                        startIcon={<ShoppingCartOutlinedIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={styledButton.addToWishlist}
                                        onClick={handleAddToWishlist}
                                    >
                                        <FavoriteIcon className={styledButton.addToWishlistIcon} />
                                    </Button>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ProductCard;
