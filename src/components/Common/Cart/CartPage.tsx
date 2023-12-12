'use client';

import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CartItemCard from './CartItemCard';
import CartPromotions from './CartPromotions';
import CartSaleBanners from './CartSaleBanners';
import { addOrRemoveFromArray } from 'utils';
import CartFooterInformation from './CartFooter';
import { LoadingSection } from '../Display';
import { useCart } from '@hooks/useCart';

const CartPage: FC = () => {
    const { data: cart, refreshCart, isLoading: isLoadingCart } = useCart();

    const [checkedList, setCheckedList] = useState<string[]>([]);
    const handleCheckProduct = (id: string) => {
        let list = addOrRemoveFromArray(checkedList, id);
        setCheckedList(list);
    };

    console.log(checkedList);

    return (
        <Box
            sx={{
                backgroundColor: '#f4f6f8',
                minHeight: '60vh',
            }}
        >
            {!cart || isLoadingCart ? (
                <LoadingSection isLoading={true} />
            ) : (
                <>
                    <Container
                        maxWidth={false}
                        sx={{
                            maxWidth: '700px',
                            borderRadius: '5px',
                            padding: '10px',
                            margin: 'auto',
                        }}
                    >
                        <Stack spacing={3} alignItems="center" minHeight="60vh">
                            <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                    borderBottom: '1px solid #e5e5e5',
                                    color: '#323232',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <ArrowBackIcon />
                                <Typography variant="h4" sx={{ fontSize: '22px' }}>
                                    Giỏ hàng của bạn
                                </Typography>
                            </Box>

                            {cart.cartCountProducts === 0 ? (
                                <Typography
                                    variant="h4"
                                    sx={{ fontSize: '18px', textAlign: 'center' }}
                                >
                                    Bạn chưa thêm sản phẩm nào vào giỏ hàng
                                </Typography>
                            ) : (
                                <>
                                    <Box sx={{ width: '100%' }}>
                                        <FormControlLabel
                                            label="Chọn tất cả"
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    checked={
                                                        checkedList.length ===
                                                        cart.cartCountProducts
                                                    }
                                                    //onChange={handleCheckAll}
                                                    sx={{
                                                        color: 'rgba(238, 73, 73, 0.8)',
                                                        '&.Mui-checked': {
                                                            color: 'rgba(238, 73, 73, 0.6)',
                                                        },
                                                    }}
                                                />
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            margin: '25px auto',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            padding: '10px',
                                            width: '100%',
                                        }}
                                    >
                                        {cart.products.map((item) => (
                                            <CartItemCard
                                                key={item.productId}
                                                itemData={item}
                                                refreshCart={refreshCart}
                                                handleCheckBox={handleCheckProduct}
                                            />
                                        ))}
                                        <CartPromotions />
                                        <CartSaleBanners />
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Container>
                    {cart.cartCountProducts !== 0 && (
                        <Box sx={{ padding: '10px' }}>
                            <CartFooterInformation />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default CartPage;
