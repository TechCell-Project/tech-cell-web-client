'use client';

import React, { useEffect, useState } from 'react';

import { UserModel } from '@models/Profile';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCurrentUser } from '@store/slices/authSlice';
import { convertToUserModel } from 'utils';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { DialogAddressEdit } from '@components/Form/Common/DialogAddressEdit';
import { ShowDialog } from '../Display/DialogCustom';
import { AddressList } from '../Lists/AddressList';

const BoxBuying = styled(Box)(() => ({
    position: 'sticky',
    bottom: 0,
    margin: '15px 0px 10px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    '& .cart_buy_content': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '600px',
        margin: '10px 0',
        '& .cart_buy_now': {
            backgroundColor: '#ee4949',
            borderRadius: '5px',
            cursor: 'pointer',
            '& a': {
                color: 'white',
                padding: '10px 20px',
            },
        },
    },
}));

const CartFooterInfomation = () => {
    const dispatch = useAppDispatch();

    const [userProfile, setUserProfile] = useState<UserModel | null>(null);
    const [openNewAddress, setOpenNewAddress] = useState(false);
    const [openListAddress, setOpenListAddress] = useState(false);

    const { user, isLoadingProfile } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (userProfile === null) {
            dispatch(getCurrentUser());
        }
    }, []);

    useEffect(() => {
        if (user) {
            console.log(user);
            setUserProfile(user as unknown as UserModel);
        }
    }, [user, isLoadingProfile]);

    console.log(user);
    console.log(userProfile);

    const triggerRefreshUserProfile = async () => {
        await dispatch(getCurrentUser());
    };

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

    const handleClickNewAddress = () => {
        setOpenListAddress(false);
        setOpenNewAddress(true);
    };

    const handleCloseListAddress = () => {
        setOpenListAddress(false);
    };

    const handleCloseNewAddress = () => {
        setOpenNewAddress(false);
    };

    console.log(openListAddress);

    return (
        <BoxBuying>
            <Box className="cart_buy_content">
                <Box>Tạm tính : 0đ</Box>
                <Box className="cart_buy_now">
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
                                        marginTop: '30px',
                                        color: 'black',
                                        marginBottom: '50px',
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
                            </Box>
                        </ShowDialog>
                    )}
                </Box>
            </Box>
        </BoxBuying>
    );
};

export default CartFooterInfomation;