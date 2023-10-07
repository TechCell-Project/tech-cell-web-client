'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { getDistricts } from 'services/LocationService';
import { getProvinces } from 'services/LocationService';
import { getWards } from 'services/LocationService';
import styles from '@styles/components/cart.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { red } from '@mui/material/colors';
import { Formik } from 'formik';
import { Form } from 'formik';
import { AutocompleteCustom } from '@components/Form';
import { Districs } from 'models/Location';
import { Location } from 'models/Location';
import { Province } from 'models/Location';
import { Ward } from 'models/Location';

// export const metadata: Metadata = {
//     title: 'TechCell - Giỏ hàng',
// };

export default function Page() {
    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setdistricts] = useState<Array<Districs>>(new Array<Districs>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    const [checked, setChecked] = useState([true, false]);

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], event.target.checked]);
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
    useEffect(() => {
        getProvinces().then((response) => {
            setProvinces((response.data as any).results);
        });
    }, []);

    const getDataDistricts = async (id: string | undefined) => {
        console.log(id);
        const response = await getDistricts(id);
        if (response.data) {
            setdistricts((response.data as any).results);
        }
    };

    const getDataWards = async (id: string | undefined) => {
        const response = await getWards(id);
        if (response.data) {
            setWards((response.data as any).results);
        }
    };

    // console.log(provinces);

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

                        <div className={styles.cart_checkbox}>
                            <FormControlLabel
                                label="Chọn tất cả"
                                control={
                                    <Checkbox
                                        defaultChecked
                                        checked={checked[0] && checked[1]}
                                        // checked={checkedAll}
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

                        <div className={styles.cart_body}>
                            <div className={styles.body_content}>
                                <div className={styles.cart_content}>
                                    <div className={styles.product_cart}>
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
                                                    Macbook Air M2 2022 256GB-Xám
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
                                                <div
                                                    className={styles.product_quanity_btn}
                                                    onClick={handleDownquanity}
                                                >
                                                    -
                                                </div>
                                                <div className={styles.product_quanity_number}>
                                                    {quanity}
                                                </div>
                                                <div
                                                    className={styles.product_quanity_btn}
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

                                    {/*  */}

                                    <div className={styles.product_cart}>
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
                                                    Macbook Air M2 2022 256GB-Xám
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
                                                <div
                                                    className={styles.product_quanity_btn}
                                                    onClick={handleDownquanity}
                                                >
                                                    -
                                                </div>
                                                <div className={styles.product_quanity_number}>
                                                    {quanity}
                                                </div>
                                                <div
                                                    className={styles.product_quanity_btn}
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
                                            Mua Office Home & Student 2021 kèm Macbook chỉ còn
                                            2,090,000
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

                                <div className={styles.customer_information}>
                                    <div className={styles.customer_information_header}>
                                        <div className={styles.customer_information_left}>
                                            <div className={styles.customer_information_icon}>
                                                <ShoppingBagIcon />
                                            </div>
                                            <div className={styles.customer_information_text}>
                                                Chọn hình thức nhận hàng
                                            </div>
                                        </div>

                                        <div className={styles.customer_information_right}>
                                            <div className={styles.check_right}>
                                                <div className={styles.check_delivery}>
                                                    Giao hàng tận nơi
                                                </div>
                                                <div className={styles.check_the_store}>
                                                    Nhận tại cửa hàng
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.customer_information_block}>
                                        <div className={styles.customer_information_content}>
                                            <div className={styles.content_header}>
                                                Thông tin khách hàng
                                            </div>

                                            <form>
                                                <div className={styles.form_user_phone}>
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        name="fullname"
                                                        placeholder="Họ và tên ( Bắt buộc )"
                                                    />
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        name="phonenumber"
                                                        placeholder="Số điện thoại ( Bắt buộc )"
                                                    />
                                                </div>
                                                <div className={styles.form_email}>
                                                    <input
                                                        type="email"
                                                        autoFocus
                                                        name="email"
                                                        placeholder="Email ( Bắt buộc )"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.delivery_address}>
                                    <div className={styles.delivery_address_content}>
                                        <div className={styles.delivery_addres_text}>
                                            Địa chỉ nhận hàng
                                        </div>
                                        <div className={styles.delivery_address_selected}>
                                            <Formik
                                                enableReinitialize
                                                initialValues={new Location()}
                                                onSubmit={() => {}}
                                            >
                                                {({ isSubmitting, values, setFieldValue }) => (
                                                    <Form
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <AutocompleteCustom
                                                            label="Chọn Thành Phố"
                                                            displaySelected="province_name"
                                                            displayLabel="province_name"
                                                            name={'province'}
                                                            options={provinces}
                                                            handleChange={(value) => {
                                                                setFieldValue('province', value);
                                                                setFieldValue('district', null);
                                                                setFieldValue('ward', null);
                                                                setdistricts([]);
                                                                setWards([]);
                                                                if (
                                                                    (value as Province)?.province_id
                                                                ) {
                                                                    getDataDistricts(
                                                                        (
                                                                            value as Province
                                                                        ).province_id?.toString(),
                                                                    );
                                                                    console.log(
                                                                        Number(
                                                                            (value as Province)
                                                                                .province_id,
                                                                        ),
                                                                    );
                                                                }
                                                            }}
                                                        />

                                                        <AutocompleteCustom
                                                            label="Chọn Quận / Huyện"
                                                            displaySelected="district_name"
                                                            displayLabel="district_name"
                                                            name={'district'}
                                                            options={districts}
                                                            handleChange={(value) => {
                                                                setFieldValue('district', value);
                                                                setFieldValue('ward', null);
                                                                setWards([]);
                                                                if (
                                                                    (value as Districs)?.district_id
                                                                ) {
                                                                    getDataWards(
                                                                        (
                                                                            value as Districs
                                                                        ).district_id?.toString(),
                                                                    );
                                                                }
                                                            }}
                                                        />

                                                        <AutocompleteCustom
                                                            label="Chọn Thị / Xã"
                                                            displaySelected="ward_name"
                                                            displayLabel="ward_name"
                                                            name={'ward'}
                                                            options={wards}
                                                        />
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>

                                        <div>
                                            <TextField
                                                style={{ width: '100%', marginTop: '20px' }}
                                                label="Nhập địa chỉ, tên đường"
                                                variant="outlined"
                                            />
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
                            <Button>Mua ngay</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
