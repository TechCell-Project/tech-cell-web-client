'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '@styles/components/cart.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useAxiosAuth } from '@hooks/useAxiosAuth';
import { ShowDialog } from '@components/Common/Display/DialogCustom';
import { UserModel } from '@models/User.model';
import { AddressList } from '@components/Common/Lists/AddressList';
import { PROFILE_GET_ENDPOINT } from '@constants/Services';
import { DialogAddressEdit } from '@components/Form/Common/DialogAddressEdit';

export default function Page() {
    const [userProfile, setUserProfile] = useState<UserModel>();
    const [openNewAddress, setOpenNewAddress] = useState(false);
    const [openListAddress, setOpenListAddress] = useState(false);

    const axiosAuth = useAxiosAuth();

    const triggerRefreshUserProfile = useCallback(async () => {
        return axiosAuth
            .get(PROFILE_GET_ENDPOINT)
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

    const [checked, setChecked] = useState([true, false]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        let IsSelected = event.target.value;
        if (IsSelected) {
        }
    };

    const [quantity, setQuantity] = useState(1);
    const handleUpQuantity = () => {
        if (quantity < 10) {
            setQuantity((prevCount) => prevCount + 1);
        }
    };

    const handleDownQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevCount) => prevCount - 1);
        }
    };

    return (
        <div className={styles.cart_product}>
            <div className={styles.cart_container}>
                <div className={styles.block_product}>
                    <div className={styles.cart_header}>
                        <div className={styles.go_to_back}>
                            <ArrowBackIcon />
                        </div>
                        <div className={styles.title}>Giỏ hàng của bạn</div>
                    </div>
                    {/* Chon tat ca */}
                    <div className={styles.cart_checkbox}>
                        <FormControlLabel
                            label="Chọn tất cả"
                            control={
                                <Checkbox
                                    defaultChecked
                                    checked={checked[0] && checked[1]}
                                    onChange={handleChange1}
                                    sx={{
                                        color: red[800],
                                        '&.Mui-checked': {
                                            color: red[600],
                                        },
                                    }}
                                />
                            }
                        />
                    </div>
                    {/* Danh sach san pham */}
                    <div className={styles.cart_body}>
                        <div className={styles.body_content}>
                            <div className={styles.cart_content}>
                                {/* {cart.cartItems.map((cartItem: any) => ( */}
                                <div
                                    // key={cartItem._id}
                                    className={styles.product_cart}
                                >
                                    <div className={styles.product_cart_check}>
                                        <Checkbox
                                            defaultChecked
                                            // checked={checked[1]}
                                            checked={checked[1]}
                                            onChange={handleChange2}
                                            sx={{
                                                color: red[800],
                                                '&.Mui-checked': {
                                                    color: red[600],
                                                },
                                            }}
                                        />
                                    </div>
                                    <Image
                                        src="/img_productDetail/ip14_2.webp"
                                        width={80}
                                        height={80}
                                        alt="product"
                                    />
                                    <div className={styles.product_info}>
                                        <div className={styles.product_text}>
                                            <div className={styles.product_heading}>
                                                {/* {cartItem.name} */}
                                            </div>
                                            <div className={styles.product_price}>
                                                <div className={styles.product_price_new}>
                                                    26.690.000đ
                                                </div>
                                                <div className={styles.product_price_old}>
                                                    <span>32.990.000đ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.product_quanity}>
                                            <button
                                                className={styles.product_quanity_btn}
                                                onClick={handleDownQuantity}
                                            >
                                                -
                                            </button>
                                            <div className={styles.product_quanity_number}>
                                                {quantity}
                                            </div>
                                            <button
                                                className={styles.product_quanity_btn}
                                                onClick={handleUpQuantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.product_cart_delete}>
                                        <DeleteIcon />
                                    </div>
                                </div>
                                {/* ))} */}
                            </div>

                            <div className={styles.cart_promotions}>
                                <div className={styles.cart_promotion_header}>
                                    <div className={styles.cart_promotion_icon}>
                                        <ShoppingBagIcon />
                                    </div>
                                    <div className={styles.cart_promotion_text}>
                                        Chương trình khuyến mãi
                                    </div>
                                </div>
                                <ul className={styles.cart_promotion_list}>
                                    <span></span>
                                    <li>
                                        Mua Office Home & Student 2021 kèm Macbook chỉ còn 2,090,000
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.cart_buy_savings}>
                                <div className={styles.cart_buy_header}>
                                    <div className={styles.cart_buy_header_icon}>
                                        <ShoppingBagIcon />
                                    </div>
                                    <div className={styles.cart_buy_header_text}>
                                        Mua kèm tiết kiệm hơn
                                    </div>
                                </div>

                                <div className={styles.cart_buy_list}>
                                    <div className={styles.cart_buy_card}>
                                        <div className={styles.card_product}>
                                            <div className={styles.card_product_img}>
                                                <Image
                                                    src="/img_productDetail/ip14_2.webp"
                                                    width={70}
                                                    height={70}
                                                    alt="product"
                                                />
                                            </div>
                                            <div className={styles.card_product_name}>
                                                Mua kèm bàn ghế công thái học
                                            </div>
                                            <div className={styles.card_product_discount}>
                                                Giảm thêm 10%
                                            </div>

                                            <div className={styles.card_product_btn}>
                                                Chọn sản phẩm
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cart_buy_card}>
                                        <div className={styles.card_product}>
                                            <div className={styles.card_product_img}>
                                                <Image
                                                    src="/img_productDetail/ip14_2.webp"
                                                    width={70}
                                                    height={70}
                                                    alt="product"
                                                />
                                            </div>
                                            <div className={styles.card_product_name}>
                                                Mua kèm bàn ghế công thái học
                                            </div>
                                            <div className={styles.card_product_discount}>
                                                Giảm thêm 10%
                                            </div>

                                            <div className={styles.card_product_btn}>
                                                Chọn sản phẩm
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cart_buy_card}>
                                        <div className={styles.card_product}>
                                            <div className={styles.card_product_img}>
                                                <Image
                                                    src="/img_productDetail/ip14_2.webp"
                                                    width={70}
                                                    height={70}
                                                    alt="product"
                                                />
                                            </div>
                                            <div className={styles.card_product_name}>
                                                Mua kèm bàn ghế công thái học
                                            </div>
                                            <div className={styles.card_product_discount}>
                                                Giảm thêm 10%
                                            </div>

                                            <div className={styles.card_product_btn}>
                                                Chọn sản phẩm
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
