'use client';
import styles from '@styles/components/payment_info.module.scss';
import { Form, Formik } from 'formik';
import { AutocompleteCustom } from '@components/Form';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDistricts } from 'services/LocationService';
import { getProvinces } from 'services/LocationService';
import { getWards } from 'services/LocationService';
import { District, Location } from 'models/Location';
import { Province } from 'models/Location';
import { Ward } from 'models/Location';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

export default function Page() {
    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setdistricts] = useState<Array<District>>(new Array<District>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    useEffect(() => {
        getProvinces().then((response) => {
            setProvinces((response.data as any));
        });
    }, []);

    const getDataDistricts = async (province_id: string | undefined) => {
        console.log(province_id);
        const response = await getDistricts(province_id);
        if (response.data) {
            setdistricts((response.data as any));
        }
    };

    const getDataWards = async (id: string | undefined) => {
        const response = await getWards(id);
        if (response.data) {
            setWards((response.data as any));
        }
    };
    return (
        <>
            <div className={styles.payment_info_container}>
                <div className={styles.payment_content}>
                    <div className={styles.payment_info_block}>
                        <div className={styles.payment_header}>
                            <div className={styles.back_arrow}>
                            <Button href='/cart' sx={{color:"black"}}>
                                    <ArrowBackIcon />
                                </Button>
                            </div>

                            <div className={styles.title_payment}>Thông tin</div>
                        </div>
                        <div className={styles.payment_body}>
                            <div className={styles.customer_information}>
                                <div className={styles.payment_card}>
                                    <div className={styles.payment_item}>
                                        <div className={styles.payment_item_left}>
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
                                                    <div className={styles.payment_price_new}>
                                                        15.990.000đ
                                                    </div>
                                                    <div className={styles.payment_price_old}>
                                                        16.990.000đ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.payment_item_right}>
                                            <div className={styles.payment_quanity}>
                                                Số lượng : <span> 1 </span>
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
                                                            if ((value as Province)?.province_id) {
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
                                                            if ((value as District)?.district_id) {
                                                                getDataWards(
                                                                    (
                                                                        value as District
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

                        <div className={styles.payment_footer}>
                            <div className={styles.payment_total}>
                                <div className={styles.payment_total_text}>
                                    Tổng tiền tạm tính :
                                </div>
                                <div className={styles.payment_total_price}>14.990.000đ</div>
                            </div>
                            <div className={styles.payment_btn}>
                                <Button href="/cart/payment">Tiếp tục</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
