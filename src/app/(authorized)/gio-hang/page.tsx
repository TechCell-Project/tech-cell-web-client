'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '@styles/components/cart.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAxiosAuth } from '@hooks/useAxiosAuth';
import { ShowDialog } from '@components/Common/Display/DialogCustom';
import { UserModel } from '@models/User.model';
import { AddressList } from '@components/Common/Lists/AddressList';
// import { PROFILE_GET_ENDPOINT } from '@constants/Services';
import { DialogAddressEdit } from '@components/Form/Common/DialogAddressEdit';

export default function Page() {
    const [userProfile, setUserProfile] = useState<UserModel>();
    // state hiển thị dialog thêm địa chỉ mới
    const [openNewAddress, setOpenNewAddress] = useState(false);
    // state hiển thị danh sách địa chỉ
    const [openListAddress, setOpenListAddress] = useState(false);
    const axiosAuth = useAxiosAuth();
    const triggerRefreshUserProfile = useCallback(async () => {
        return axiosAuth
            .get(PROFILE_ENDPOINT)
            .then((response) => {
                if (response.data) {
                    setUserProfile(response.data as UserModel);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [axiosAuth, setUserProfile]);

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
                                dialogTitle="Địa chỉ của tôi"
                                dialogStyle={{ minWidth: 560 }}
                            >
                                {userProfile?.address && (
                                    <AddressList
                                        handleCloseListItem={handleCloseListAddress}
                                        userProfile={userProfile}
                                        triggerRefreshUserProfile={triggerRefreshUserProfile}
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
                                            type="submit"
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
