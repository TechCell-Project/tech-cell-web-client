'use client';

import { useState, useEffect } from 'react';
import styles from '@styles/components/cart.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { red } from '@mui/material/colors';
import { Box, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from '@mui/material';
import { getDistricts } from 'services/LocationService';
import { getProvinces } from 'services/LocationService';
import { getWards } from 'services/LocationService';
import { District, Location } from 'models/Location';
import { Province } from 'models/Location';
import { Ward } from 'models/Location';
import { Form, Formik, useFormikContext } from 'formik';
import { AutocompleteCustom } from '@components/Form';
import { useSession } from 'next-auth/react';
import { useAxiosAuth } from '@hooks/useAxios';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { ShowDialog } from '@components/Common/Display/DialogCustom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileSchema } from 'validate/auth.validate';
import { useAppDispatch, useAppSelector } from '@store/store';
import { SelectInputCustom } from '@components/Common/FormFormik/SelectCustom';

export default function Page() {
    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setdistricts] = useState<Array<District>>(new Array<District>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    const axiosAuth = useAxiosAuth();
    useEffect(() => {
        getProvinces().then((response) => {
            setProvinces(response.data as Array<Province>);
        });
    }, []);

    const getDataDistricts = async (province_id: string | undefined) => {
        const response = await getDistricts(province_id);

        if (response.data) {
            setdistricts(response.data as Array<District>);
            console.log(districts);
        }
    };

    const getDataWards = async (distric_id: string | undefined) => {
        const response = await getWards(distric_id);
        if (response.data) {
            setWards(response.data as any);
        }
    };
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);

    const handleClickNewAddress = () => {
        setOpenList(false);
        setOpen(true);
    };

    const handleClickOpenList = () => {
        setOpen(false);
        setOpenList(true);
        const getAddress = axiosAuth.get('/profile');
        console.log(getAddress);
    };

    const handleCloseList = () => {
        setOpenList(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [checked, setChecked] = useState([true, false]);
    const [selectItem, setSelectedItem] = useState([]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked([checked[0], event.target.checked]);
        let IsSelected = event.target.value;
        if (IsSelected) {
            // setSelectedItem(...selectItem,)
        }
    };

    const [quanity, setQuanity] = useState(1);
    const handleUpquanity = () => {
        if (quanity < 10) {
            setQuanity((prevCount) => prevCount + 1);
        }
    };

    const handleDownquanity = () => {
        if (quanity > 1) {
            setQuanity((prevCount) => prevCount - 1);
        }
    };
    const { data: session } = useSession();
    const cart = useAppSelector((state) => state.cart);
    const addressName = [
        { name: 'Nhà', value: 'Nhà'},
        { name: 'Công ty', value: 'Công ty'}
    ]


    return (
        <>
            <div className={styles.cart_product}>
                <div className={styles.cart_container}>
                    <div className={styles.block_product}>
                        <div className={styles.cart_header}>
                            <div className={styles.go_to_back}>
                                <ArrowBackIcon />
                            </div>
                            <div className={styles.title}>Giỏ hàng của bạn</div>
                        </div>

                        {cart.cartItems.lenght === 0 ? (
                            <Box>Ko co san pham</Box>
                        ) : (
                            <>
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
                                            {cart.cartItems.map((cartItem: any) => (
                                                <div
                                                    key={cartItem._id}
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
                                                                {cartItem.name}
                                                            </div>
                                                            <div className={styles.product_price}>
                                                                <div
                                                                    className={
                                                                        styles.product_price_new
                                                                    }
                                                                >
                                                                    26.690.000đ
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.product_price_old
                                                                    }
                                                                >
                                                                    <span>32.990.000đ</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.product_quanity}>
                                                            <div
                                                                className={
                                                                    styles.product_quanity_btn
                                                                }
                                                                onClick={handleDownquanity}
                                                            >
                                                                -
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.product_quanity_number
                                                                }
                                                            >
                                                                {quanity}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.product_quanity_btn
                                                                }
                                                                onClick={handleUpquanity}
                                                            >
                                                                +
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={styles.product_cart_delete}>
                                                        <DeleteIcon />
                                                    </div>
                                                </div>
                                            ))}
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
                                                    Mua Office Home & Student 2021 kèm Macbook chỉ
                                                    còn 2,090,000
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
                                                        <div
                                                            className={styles.card_product_discount}
                                                        >
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
                                                        <div
                                                            className={styles.card_product_discount}
                                                        >
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
                                                        <div
                                                            className={styles.card_product_discount}
                                                        >
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
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.cart_buy}>
                    <div className={styles.cart_buy_content}>
                        <div className={styles.cart_buy_provisional}>Tạm tính : 0đ</div>
                        <div className={styles.cart_buy_now}>
                            <Button
                                sx={{ color: 'white', padding: '10px' }}
                                onClick={handleClickOpen}
                            >
                                Mua ngay
                            </Button>
                            {open && (
                                <ShowDialog
                                    isOpen={open}
                                    handleClose={handleClose}
                                    dialogTitle="Địa chỉ mới"
                                    dialogStyle={{ minWidth: 560 }}
                                >
                                    <ToastContainer />

                                    <Formik
                                        initialValues={new Location()}
                                        enableReinitialize
                                        validationSchema={ProfileSchema}
                                        onSubmit={async (values) => {
                                            console.log(session?.user.accessToken);
                                            axiosAuth
                                                .patch('/profile/address', values)
                                                .then((res) => {
                                                    if (res.status === 200) {
                                                        toast.success(
                                                            'Cập nhập địa chỉ thành công',
                                                            {
                                                                position: 'top-center',
                                                                autoClose: 5000,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: true,
                                                                progress: undefined,
                                                                theme: 'light',
                                                            },
                                                        );
                                                    }
                                                })
                                                .catch((err) => {
                                                    toast.error('Cập nhập địa chỉ thất bại', {
                                                        position: 'top-center',
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: 'light',
                                                    });

                                                    // setTimeout(() => {
                                                    //     setOpen(false);
                                                    //     setOpenList(true);
                                                    //     const getAddress = axiosAuth
                                                    //         .get('/profile')
                                                    //         .then((res) => {
                                                    //             console.log(res.data.address);
                                                    //         })
                                                    //         .catch((err) => {
                                                    //             console.log(err);
                                                    //         });
                                                    // }, 5000);
                                                });
                                        }}
                                    >
                                        {({ setValues, errors, setFieldValue }) => (
                                            console.log(errors),
                                            (
                                                <Form style={{ width: '100%' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={6}>
                                                            <SelectInputCustom
                                                                name="address.addressName"
                                                                label={'Địa chỉ'}
                                                                options={addressName}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <TextFieldCustom
                                                                name="address.customerName"
                                                                label={'Họ và tên'}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <TextFieldCustom
                                                                name="address.phoneNumbers"
                                                                label={'Số điện thoại'}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <AutocompleteCustom
                                                                label="Chọn Thành Phố"
                                                                displaySelected="province_id"
                                                                displayLabel="province_name"
                                                                name={'address.provinceLevel'}
                                                                options={provinces}
                                                                handleChange={async (value) => {
                                                                    setValues((prev) => {
                                                                        const newValue = {
                                                                            ...prev,
                                                                        };

                                                                        newValue.address.provinceLevel =
                                                                            value;
                                                                        newValue.address.districtLevel =
                                                                            null;
                                                                        newValue.address.wardLevel =
                                                                            null;

                                                                        return newValue;
                                                                    });
                                                                    getDataDistricts(
                                                                        (value as Province)
                                                                            ?.province_id,
                                                                    );
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <AutocompleteCustom
                                                                label="Chọn Quận / Huyện"
                                                                displaySelected="district_name"
                                                                displayLabel="district_name"
                                                                name={'address.districtLevel'}
                                                                options={districts}
                                                                handleChange={(value) => {
                                                                    setValues((prev) => {
                                                                        const newValue = {
                                                                            ...prev,
                                                                        };

                                                                        newValue.address.districtLevel =
                                                                            value;
                                                                        newValue.address.wardLevel =
                                                                            null;

                                                                        return newValue;
                                                                    });
                                                                    getDataWards(
                                                                        (value as District)
                                                                            ?.district_id,
                                                                    );
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <AutocompleteCustom
                                                                label="Chọn Thị / Xã"
                                                                displaySelected="ward_name"
                                                                displayLabel="ward_name"
                                                                name={'address.wardLevel'}
                                                                options={wards}
                                                            />
                                                        </Grid>

                                                        <Grid item md={12}>
                                                            <TextFieldCustom
                                                                name="address.detail"
                                                                label={'Địa chỉ cụ thể'}
                                                                isTextArea
                                                                minRowArea={3}
                                                                maxRowArea={4}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            alignItems: 'center',
                                                            marginTop: '10px',
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={handleClose}
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
                                                            // onClick={handleClickOpenList}
                                                        >
                                                            Xác nhận
                                                        </Button>
                                                    </Box>
                                                </Form>
                                            )
                                        )}
                                    </Formik>
                                </ShowDialog>
                            )}
                            {/* {openList && (
                                <ShowDialog
                                    isOpen={openList}
                                    handleClose={handleCloseList}
                                    dialogTitle="Địa chỉ của tôi"
                                    dialogStyle={{ minWidth: 560 }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderTop: '1px solid rgba(0,0,0,.09)',
                                            paddingTop: '45px',
                                            paddingBottom: '35px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                            }}
                                        >
                                            <Radio
                                                value="a"
                                                name="radio-buttons"
                                                sx={{
                                                    padding: '0',
                                                    color: 'red',
                                                    '&.Mui-checked': {
                                                        color: 'red',
                                                    },
                                                }}
                                            />

                                            <Box sx={{ width: '75%', marginLeft: '30px' }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            borderRight:
                                                                '1px solid rgba(0,0,0,.09)',
                                                            paddingRight: '15px',
                                                        }}
                                                    >
                                                        Dang Xuan Tien
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            marginLeft: '15px',
                                                            fontSize: '12px',
                                                            color: '#000000A6',
                                                        }}
                                                    >
                                                        0976315496
                                                    </Box>
                                                </Box>

                                                <Box sx={{ marginTop: '10px' }}>
                                                    <Box
                                                        sx={{
                                                            lineHeight: '1.5',
                                                            fontSize: '12px',
                                                            color: '#000000A6',
                                                        }}
                                                    >
                                                        Ngã Ba Bãi Rác Cũ, Vĩnh Hội Đông Thị Trấn An
                                                        Phú, Huyện An Phú, An Giang
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box sx={{ width: '25%' }}>
                                            <Button>Cập nhập</Button>
                                        </Box>
                                    </Box>


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
                                            onClick={handleClose}
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
                                            onClick={handleClickOpenList}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Box>
                                </ShowDialog>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
