'use client';

import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getCartItems } from '@store/slices/cartSlice';
import { Paging } from '@models/Common';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CartItemCard from './CartItemCard';
import { CartModel } from '@models/Cart';
import { useSkipFirstRender } from '@hooks/useSkipFirstRender';
import CartPromotions from './CartPromotions';
import CartSaleBanners from './CartSaleBanners';
import { addOrRemoveFromArray } from 'utils';
import CartFooterInfomation from './CartFooter';
import { LoadingSection } from '../Display';

interface CartsProps {
    userCartData: CartModel | null;
}

const CartPage: FC<CartsProps> = ({ userCartData }) => {
    const [thisCart, setThisCart] = useState<CartModel | null>(userCartData);
    const dispatch = useAppDispatch();

    const { carts } = useAppSelector((state) => state.cart);

    const [pagingData, setPagingData] = useState<Paging>(new Paging());
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [showUncheckMsg, setShowUncheckMsg] = useState<boolean>(false);

    useSkipFirstRender(() => {
        dispatch(getCartItems(pagingData));
    }, [pagingData]);

    useSkipFirstRender(() => {
        setThisCart(carts);
    }, [carts]);

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        let arr: string[] = [];
        if (checkedList.length !== thisCart?.products.length) {
            arr = thisCart?.products.map(
                (product) => `${product.productId}/${product.sku}/${product.quantity}`,
            ) as string[];
        }
        setCheckedList(arr);
        handleShowMsg(true);
    };

    const handleRefreshCart = () => {
        dispatch(getCartItems(pagingData));
    };

    const handleCheckProduct = (id: string) => {
        let list = [...checkedList];
        list = addOrRemoveFromArray(list, id);
        setCheckedList(list);
        handleShowMsg(true);
    };

    const handleShowMsg = (isSelected: boolean) => {
        if (!isSelected) {
            setShowUncheckMsg(true);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else setShowUncheckMsg(false);
    };

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setPagingData({
            ...pagingData,
            page: page - 1,
        });
    };

    const saveProductQuery = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        localStorage.setItem('select-item-query', checkedList.toString());
    }

    return (
        <Box
            sx={{
                backgroundColor: '#f4f6f8',
                minHeight: '60vh',
            }}
        >
            {thisCart ? (
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

                            {thisCart.cartCountProducts === 0 ? (
                                <Typography
                                    variant="h4"
                                    sx={{ fontSize: '18px', textAlign: 'center' }}
                                >
                                    Bạn chưa thêm sản phẩm nào vào giỏ hàng
                                </Typography>
                            ) : (
                                <>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: showUncheckMsg ? 'flex' : 'none',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="primary"
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            Bạn cần chọn sản phẩm trước khi tiến hành thanh toán
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <FormControlLabel
                                            label="Chọn tất cả"
                                            control={
                                                <Checkbox
                                                    //defaultChecked
                                                    checked={
                                                        checkedList.length ===
                                                        thisCart.products.length
                                                    }
                                                    onChange={handleCheckAll}
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
                                        {thisCart.products.map((item) => (
                                            <CartItemCard
                                                key={`${item.productId}/${item.sku}`}
                                                itemData={item}
                                                refreshCart={handleRefreshCart}
                                                isSelected={checkedList.includes(
                                                    `${item.productId}/${item.sku}/${item.quantity}`,
                                                )}
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
                    {thisCart.cartCountProducts !== 0 && (
                        <Box sx={{ padding: '10px' }}>
                            <CartFooterInfomation
                                isSelectedProduct={checkedList.length !== 0}
                                handleShowMsg={() => {
                                    handleShowMsg(checkedList.length !== 0);
                                }}
                                saveSelectedProducts={saveProductQuery}
                            />
                        </Box>
                    )}
                </>
            ) : (
                <LoadingSection isLoading={true} />
            )}
        </Box>
    );
};

export default CartPage;
