'use client';

import React, { FC, useState, MouseEvent } from 'react';

import { Address } from '@models/Account';
import { useAppDispatch, useAppSelector } from '@store/store';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoonLoader from 'react-spinners/MoonLoader';
import Container from '@mui/material/Container';

import { ShowDialog } from '../Display/DialogCustom';
import { AddressList } from '../Address/Lists/AddressList';
import DialogAddressUpdate from '@components/Form/Common/AddressDialog/DialogAddressUpdate';
import { useRouter } from 'next/navigation';
import { currencyFormat, debounce } from 'utils';
import { AddCartItemModel } from '@models/Cart';
import { OrderReviewRequest } from '@models/Order';
import { reviewCurrentOrder } from '@store/slices/orderSlice';
import { toast } from 'react-toastify';
import { useProfile } from '@hooks/useProfile';

interface CartFooterProps {
    isSelectedProduct: boolean;
    handleShowMsg: () => void;
    saveSelectedProducts: (e: MouseEvent<HTMLElement>) => void;
    totalPrice: number;
}

const CartFooterInformation: FC<CartFooterProps> = ({
    isSelectedProduct,
    handleShowMsg,
    saveSelectedProducts,
    totalPrice,
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [openNewAddress, setOpenNewAddress] = useState(false);
    const [openListAddress, setOpenListAddress] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const { isLoadingDetails } = useAppSelector((state) => state.order);

    const { profile: userProfile, refreshProfile } = useProfile();

    const handleBuyNow = () => {
        if (!isSelectedProduct) {
            handleShowMsg();
        } else {
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

    const saveInfoToLocalStorage = debounce(async (e: MouseEvent<HTMLButtonElement>) => {
        saveSelectedProducts(e);
        localStorage.setItem('selected-address', currentIndex.toString());
        const itemsSelectedQueryString = localStorage.getItem('select-item-query');
        const itemQueries = itemsSelectedQueryString?.split(',');
        if (itemQueries) {
            const itemsSelected: AddCartItemModel[] = itemQueries.map((query) => {
                const data = query.split('-/-');
                return {
                    productId: data[0],
                    sku: data[1],
                    quantity: parseInt(data[2]),
                };
            });
            const payload: OrderReviewRequest = {
                addressSelected: currentIndex,
                productSelected: itemsSelected,
            };
            console.log(payload);
            const response = await dispatch(reviewCurrentOrder(payload));

            console.log(response);
            if (response?.success) {
                router.push('/gio-hang/payment');
            } else {
                toast.error('Có lỗi xảy ra. Xin vui lòng thử lại sau...');
            }
        }
    }, 1500);

    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: 0,
                margin: '15px 0px 10px 0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e5e5e5',
                borderRadius: { xs: '10px' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '600px',
                    margin: '10px 0',
                    padding: { xs: '10px' },
                }}
            >
                <Box
                    sx={{
                        fontSize: { xs: '14px' },
                    }}
                >
                    Tạm tính: {currencyFormat(totalPrice)}đ
                </Box>
                <Box
                    sx={{
                        backgroundColor: '#ee4949',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    <Button sx={{ color: 'white', padding: '10px' }} onClick={handleBuyNow}>
                        Mua ngay
                    </Button>

                    {/* Thêm địa chỉ mới  */}
                    {openNewAddress && userProfile && (
                        <DialogAddressUpdate
                            isOpen={openNewAddress}
                            handleClose={handleCloseNewAddress}
                            userThisAddress={new Address()}
                            addressIndex={null}
                            triggerRefreshUserProfile={refreshProfile}
                            setOpenNewAddress={setOpenNewAddress}
                            setOpenListAddress={setOpenListAddress}
                        />
                    )}

                    {/* Hiển thị danh sách địa chỉ của user */}
                    {openListAddress && userProfile && (
                        <ShowDialog
                            isOpen={openListAddress}
                            handleClose={handleCloseListAddress}
                            dialogTitle='Địa chỉ của tôi'
                            dialogStyle={{ minWidth: 560 }}
                            isSmall
                        >
                            <AddressList
                                handleCloseListItem={handleCloseListAddress}
                                handleSelectAddressIndex={(index: number) => {
                                    setCurrentIndex(index);
                                }}
                            />

                            <Box>
                                <Button
                                    sx={{
                                        width: '175px',
                                        height: '40px',
                                        padding: '10px',
                                        border: '1px solid rgba(0,0,0,.09)',
                                        borderRadius: '5px',
                                        marginTop: { sm: '30px', xs: '10px' },
                                        color: 'black',
                                        marginBottom: { sm: '50px', xs: '10px' },
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
                                    onClick={saveInfoToLocalStorage}
                                >
                                    {isLoadingDetails ? (
                                        <MoonLoader
                                            color='#f8f8ff'
                                            speedMultiplier={0.75}
                                            size={22}
                                        />
                                    ) : (
                                        <Typography variant='h6' sx={{ fontSize: '14px' }}>
                                            Xác nhận
                                        </Typography>
                                    )}
                                </Button>
                            </Box>
                        </ShowDialog>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CartFooterInformation;
