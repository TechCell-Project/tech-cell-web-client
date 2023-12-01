'use client';
import { useCallback, useState } from 'react';
import styles from '@styles/components/payment.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { UserModel } from '@models/User.model';
import { useAxiosAuth } from '@hooks/useAxiosAuth';
import { PROFILE_GET_ENDPOINT } from '@constants/Services';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const handleBackToCart = () => {
        router.back();
    };
    const [openProduct, setProduct] = useState(false);
    const handleClickOpen = () => {
        setProduct(true);
    };

    const [userProfile, setUserProfile] = useState<UserModel>();
    const axiosAuth = useAxiosAuth();
    // const triggerRefreshUserProfile = useCallback(async () => {
    //     return axiosAuth
    //         .get(PROFILE_GET_ENDPOINT)
    //         .then((response) => {
    //             if (response.data) {
    //                 setUserProfile(response.data as UserModel);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [axiosAuth, setUserProfile]);

    const handleClose = () => {
        setProduct(false);
    };
    return (
        <>
            {userProfile && (
                <div className={styles.payment_container}>
                    <div className={styles.payment_content}>
                        <div className={styles.payment_block}>
                            <div className={styles.payment_header}>
                                <div className={styles.back_arrow}>
                                    <Button onClick={handleBackToCart} sx={{ color: 'black' }}>
                                        <ArrowBackIcon />
                                    </Button>
                                </div>
                                <div className={styles.title_payment}>Thanh toán</div>
                            </div>

                            <div className={styles.payment_body}>
                                <div className={styles.payment_info}>
                                    <div className={styles.payment_info_container}>
                                        <div className={styles.payment_promotion}>
                                            <TextField
                                                id="standard-basic"
                                                label="Nhập mã giảm giá"
                                                variant="standard"
                                                sx={{ width: '85%' }}
                                            />
                                            <Button>Áp dụng</Button>
                                        </div>

                                        <div className={styles.payment_info_customer}>
                                            <div className={styles.info_block}>
                                                <div className={styles.block_item}>
                                                    <div className={styles.block_title}>
                                                        Số lượng sản phẩm
                                                    </div>
                                                    <div className={styles.block_value}>01</div>
                                                </div>

                                                <div className={styles.block_item}>
                                                    <div className={styles.block_title}>
                                                        Tiền hàng (tạm tính)
                                                    </div>
                                                    <div className={styles.block_value}>
                                                        15.990.000đ
                                                    </div>
                                                </div>

                                                <div className={styles.block_item}>
                                                    <div className={styles.block_title}>
                                                        Phí vận chuyển
                                                    </div>
                                                    <div className={styles.block_value}>
                                                        Miễn phí
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.info_block}>
                                                <div className={styles.block_item}>
                                                    <div className={styles.block_title}>
                                                        Giảm giá khuyến mãi
                                                    </div>
                                                    <div className={styles.block_price}>
                                                        - 1.000.000đ
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.block_bottom}>
                                                <div className={styles.bottom_title}>
                                                    Tổng tiền <span>(đã gồm VAT)</span>
                                                </div>
                                                <div className={styles.bottom_value}>
                                                    14.990.000đ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.payment_quote}>
                                <div className={styles.payment_quote_title}>
                                    THÔNG TIN THANH TOÁN
                                </div>
                                <div className={styles.payment_main}>
                                    <div className={styles.payment_main_content}>
                                        <div className={styles.payment_main_left}>
                                            <Image
                                                src="/img_payment/payment1.png"
                                                width={40}
                                                height={40}
                                                alt="product"
                                            />

                                            <div className={styles.payment_main_title}>
                                                <p>Chọn phương thức thanh toán</p>
                                                <span>Nhận thêm nhiều ưu đãi tại cổng</span>
                                            </div>
                                        </div>
                                        <div className={styles.payment_main_right}>
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.payment_address}>
                                <div className={styles.address_title}>THÔNG TIN NHẬN HÀNG</div>
                                <div className={styles.address_main}>
                                    <div className={styles.address_block}>
                                        <div className={styles.address_item}>
                                            <div className={styles.address_title}>Khách hàng</div>
                                            <div className={styles.address_value}>
                                                {userProfile?.lastName}
                                            </div>
                                        </div>

                                        <div className={styles.address_item}>
                                            <div className={styles.address_title}>
                                                Số điện thoại
                                            </div>
                                            <div className={styles.address_value}>0976315496</div>
                                        </div>

                                        <div className={styles.address_item}>
                                            <div className={styles.address_title}>Email</div>
                                            <div className={styles.address_value}>
                                                dangxuantien161202@gmail.com
                                            </div>
                                        </div>

                                        <div className={styles.address_item}>
                                            <div className={styles.address_title}>
                                                Nhận hàng tại
                                            </div>
                                            <div className={styles.address_value}>
                                                z, Thị trấn Tân Túc, Huyện Bình Chánh, Hồ Chí Minh
                                            </div>
                                        </div>

                                        <div className={styles.address_item}>
                                            <div className={styles.address_title}>Ghi chú</div>
                                            <div className={styles.address_value}>
                                                Dang Xuan Tien
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.payment_bottom}>
                                <div className={styles.payment_bottom_content}>
                                    <div className={styles.bottom_title}>Tổng tiền tạm tính :</div>
                                    <div className={styles.bottm_price}>14.990.000đ</div>
                                </div>

                                <div className={styles.payment_bottom_btn}>
                                    <Button>Thanh toán</Button>
                                </div>

                                <div className={styles.paymentList_modal}>
                                    <Button
                                        sx={{ width: '100%', textTransform: 'capitalize' }}
                                        onClick={handleClickOpen}
                                    >
                                        Kiểm tra danh sách sản phẩm
                                    </Button>

                                    <Dialog
                                        open={openProduct}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle
                                            id="alert-dialog-title"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: '16px',
                                                    color: '#323232',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Danh sách sản phẩm đang thanh toán
                                            </Box>
                                            <Button sx={{ color: 'black' }} onClick={handleClose}>
                                                <CloseIcon />
                                            </Button>
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContent
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Image
                                                        src="/img_productDetail/ip14_2.webp"
                                                        width={80}
                                                        height={80}
                                                        alt="product"
                                                    />

                                                    <div className={styles.payment_card_info}>
                                                        <div className={styles.payment_name}>
                                                            Xiaomi 13T Pro 12GB 512GB-Đen
                                                        </div>
                                                        <div className={styles.payment_price}>
                                                            <div
                                                                className={styles.payment_price_new}
                                                            >
                                                                15.990.000đ
                                                            </div>
                                                            <div
                                                                className={styles.payment_price_old}
                                                            >
                                                                16.990.000đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Box>

                                                <Box>
                                                    <div className={styles.payment_item_right}>
                                                        <div className={styles.payment_quanity}>
                                                            Số lượng : <span> 1 </span>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </DialogContent>
                                        </DialogContent>
                                        <DialogActions sx={{ backgroundColor: '#ee4949' }}>
                                            <Button
                                                onClick={handleClose}
                                                sx={{
                                                    textAlign: 'center',
                                                    width: '100%',
                                                    color: 'white',
                                                }}
                                            >
                                                Xác nhận
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
