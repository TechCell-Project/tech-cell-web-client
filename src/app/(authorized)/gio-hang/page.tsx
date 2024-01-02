'use client';

import React, { useEffect, useState } from 'react';
import { CartModel } from '@models/Cart';
import { LoadingPage } from '@components/Common/Display/LoadingPage';
import CartPage from '@components/Common/Cart/CartPage';
import { useSession } from 'next-auth/react';
import { getCartItemsCustom } from 'utils/get-cartItems';
import instanceAuth from '@config/instanceAuth.config';
import { debounce } from 'utils/funcs';

const Cart = () => {
    const { data: session } = useSession();

    const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
    const [currentCartData, setCurrentCartData] = useState<CartModel | null>(null);

    useEffect(() => {
        triggerRefreshUserProfile();
    }, [triggerRefreshUserProfile]);

    const handleClickNewAddress = () => {
        setOpenListAddress(false);
        setOpenNewAddress(true);
    };

    const handleCloseListAddress = () => {
        setOpenListAddress(false);
    };

    // handle function click vào mua ngay
    const handleBuyNow = () => {
        if (!userProfile) {
            setOpenNewAddress(true);
        }
        if (
            userProfile &&
            Array.isArray(userProfile?.address) &&
            userProfile?.address?.length > 0
        ) {
            setOpenListAddress(true);
        } else {
            setOpenNewAddress(true);
        }
    };

    const handleCloseNewAddress = () => {
        setOpenNewAddress(false);
    };

    return (
        <div className={styles.cart_product}>
            <div className={styles.cart_container}>
                {/* Danh sách sản phẩm trong giỏ hàng */}
                <ListProductInCart />
            </div>

            <div className={styles.cart_buy}>
                <div className={styles.cart_buy_content}>
                    <div className={styles.cart_buy_provisional}>Tạm tính : 0đ</div>
                    <div className={styles.cart_buy_now}>
                        <Button sx={{ color: 'white', padding: '10px' }} onClick={handleBuyNow}>
                            Mua ngay
                        </Button>

                        {/* Thêm địa chỉ mới  */}
                        {openNewAddress && userProfile && (
                            <DialogAddressEdit
                                isOpen={openNewAddress}
                                handleClose={handleCloseNewAddress}
                                userProfile={userProfile}
                                triggerRefreshUserProfile={triggerRefreshUserProfile}
                                setOpenNewAddress={setOpenNewAddress}
                                setOpenListAddress={setOpenListAddress}
                            />
                        )}

                        {/* Hiển thị danh sách địa chỉ của user */}
                        {openListAddress && (
                            <ShowDialog
                                isOpen={openListAddress}
                                handleClose={handleCloseListAddress}
                                dialogTitle='Địa chỉ của tôi'
                                dialogStyle={{ minWidth: 560 }}
                            >
                                {userProfile?.address && (
                                    <AddressList
                                        handleCloseListItem={handleCloseListAddress}
                                        handleSelectAddressIndex={() => {}}
                                    />
                                )}

                                <Box>
                                    <Button
                                        sx={{
                                            width: '175px',
                                            height: '40px',
                                            padding: '10px',
                                            border: '1px solid rgba(0,0,0,.09)',
                                            borderRadius: '5px',
                                            color: 'black',
                                            fontSize: { xs: '12px', sm: '15px' },
                                        }}
                                        onClick={handleClickNewAddress}
                                    >
                                        Thêm mới địa chỉ
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginTop: '15px',
                                        borderTop: '1px solid rgba(0,0,0,.09)',
                                        paddingTop: '15px',
                                    }}
                                >
                                    <Button
                                        onClick={handleCloseListAddress}
                                        sx={{
                                            border: '1px solid #ee4949',
                                            color: '#ee4949',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Link href={'/gio-hang/payment'}>
                                        <Button
                                            type='submit'
                                            sx={{
                                                borderRadius: '5px',
                                                backgroundColor: '#ee4949',
                                                color: 'white',
                                                marginLeft: '10px',
                                                border: '1px solid #ee4949',
                                                ':hover': {
                                                    backgroundColor: '#ee4949',
                                                },
                                            }}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Link>
                                </Box>
                            </ShowDialog>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
