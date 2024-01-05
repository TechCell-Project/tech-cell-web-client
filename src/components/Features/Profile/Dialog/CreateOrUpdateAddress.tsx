import React, { memo, useState, useEffect } from 'react';
import { Address } from '@models/Account';
import { useAppDispatch, useAppSelector } from '@store/store';
import { District, Province, Ward } from '@models/Location';
import { getDistricts, getProvinces, getWards } from '@services/LocationService';
import { Form, Formik, FormikHelpers } from 'formik';
import { ProfileAddressRequest } from '@models/Profile';
import { patchProfileAddress } from '@services/ProfileService';
import Stack from '@mui/system/Stack';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@store/slices/authSlice';
import { HttpStatusCode } from 'axios';
import { CommonBtn } from '@components/Common';
import { AutocompleteCustom, TextFieldCustom } from '@components/Common/FormFormik';
import { ShowDialog } from '@components/Common/Display';
import * as Yup from 'yup';

type Props = {
    data: Address;
    addressIndex: number;
    isOpen: boolean;
    handleClose: () => void;
};

const profileAddressValidate = Yup.object({
    addressName: Yup.string().required('Vui lòng nhập địa chỉ!'),
    customerName: Yup.string().required('Vui lòng nhập tên khách hàng!'),
    phoneNumbers: Yup.string()
        .min(10, 'Số điện thoại phải đủ 10 số!')
        .max(10, 'Số điện thoại phải đủ 10 số!')
        .required('Vui lòng nhập số điện thoại!'),
    provinceLevel: Yup.object().required('Vui lòng chọn tỉnh / thành!'),
    districtLevel: Yup.object().required('Vui lòng chọn quận / huyện!'),
    wardLevel: Yup.object().required('Vui lòng chọn xã / phường!'),
    detail: Yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
});

const CreateOrUpdateAddress = ({ data, addressIndex, isOpen, handleClose }: Props) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setDistricts] = useState<Array<District>>(new Array<District>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    useEffect(() => {
        getProvinces()
            .then(({ data }) => setProvinces(data))
            .catch(() => setProvinces(new Array<Province>()));

        if (data.provinceLevel !== null) {
            loadDistricts(String((data.provinceLevel as Province).province_id));
        }

        if (data.districtLevel !== null) {
            loadWards(String((data.districtLevel as District).district_id));
        }
    }, []);

    const loadDistricts = (province_id: string) => {
        getDistricts(province_id)
            .then(({ data }) => setDistricts(data))
            .catch(() => setDistricts(new Array<District>()));
    };

    const loadWards = (district_id: string) => {
        getWards(district_id)
            .then(({ data }) => setWards(data))
            .catch(() => setWards(new Array<Ward>()));
    };

    const handleSubmit = (values: Address, { setSubmitting }: FormikHelpers<Address>) => {
        const cloneAddress = [...(user?.address as Address[])];

        if (addressIndex === null) {
            cloneAddress.push(values);
        } else {
            cloneAddress[addressIndex] = values;
        }

        const payload = new ProfileAddressRequest(cloneAddress);
        patchProfileAddress(payload)
            .then(() => {
                toast.success(
                    `${addressIndex === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thành công!`,
                );
                dispatch(getCurrentUser()).then();
            })
            .catch((error) => {
                if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
                    toast.error(
                        `${addressIndex === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thất bại!`,
                    );
                }
            })
            .finally(() => {
                setSubmitting(false);
                handleClose();
            });
    };

    return (
        <ShowDialog
            dialogTitle={`${addressIndex === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ`}
            isOpen={isOpen}
            handleClose={handleClose}
            dialogStyle={{ minWidth: { lg: '40%', xs: '80%' } }}
        >
            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={profileAddressValidate}
                onSubmit={handleSubmit}
            >
                {({ setValues, isSubmitting }) => (
                    <Form style={{ width: '100%' }}>
                        <Grid container columnSpacing={3} rowSpacing={4}>
                            <Grid item md={6}>
                                <AutocompleteCustom<Province>
                                    name={`provinceLevel`}
                                    isNotCheckbox
                                    label='Tỉnh / thành'
                                    options={provinces}
                                    displayLabel='province_name'
                                    displaySelected='province_id'
                                    handleChange={(value) => {
                                        if (value !== null) {
                                            loadDistricts(String((value as Province).province_id));
                                        } else {
                                            setDistricts(new Array<District>());
                                            setWards(new Array<Ward>());
                                        }
                                        setValues((prev) => {
                                            const newValue = { ...prev };

                                            newValue.provinceLevel = value;
                                            newValue.districtLevel = null;
                                            newValue.wardLevel = null;

                                            return newValue;
                                        }).then();
                                    }}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <AutocompleteCustom<District>
                                    name={`districtLevel`}
                                    label='Quận / huyện'
                                    isNotCheckbox
                                    options={districts}
                                    displayLabel='district_name'
                                    displaySelected='district_id'
                                    handleChange={(value) => {
                                        if (value !== null) {
                                            loadWards(String((value as District).district_id));
                                        } else {
                                            setWards(new Array<Ward>());
                                        }
                                        setValues((prev) => {
                                            const newValue = { ...prev };

                                            newValue.districtLevel = value;
                                            newValue.wardLevel = null;

                                            return newValue;
                                        }).then();
                                    }}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <AutocompleteCustom<Ward>
                                    name={`wardLevel`}
                                    label='Xã / phường'
                                    isNotCheckbox
                                    options={wards}
                                    displayLabel='ward_name'
                                    displaySelected='ward_code'
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextFieldCustom
                                    name={`addressName`}
                                    label='Địa chỉ'
                                    placeholder='Nhà, công ty,...'
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextFieldCustom name={`customerName`} label='Tên khách hàng' />
                            </Grid>
                            <Grid item md={6}>
                                <TextFieldCustom
                                    name={`phoneNumbers`}
                                    label='Số điện thoại'
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom
                                    name={`detail`}
                                    label='Địa chỉ cụ thể'
                                    isTextArea
                                    minRowArea={2}
                                    maxRowArea={3}
                                />
                            </Grid>
                        </Grid>

                        <Stack direction='row' justifyContent='flex-end' gap={2} mt={5}>
                            <CommonBtn
                                content='Hủy bỏ'
                                variant='outlined'
                                handleClick={handleClose}
                            />
                            <CommonBtn
                                content='Lưu'
                                variant='contained'
                                type='submit'
                                disabled={isSubmitting}
                                loading={isSubmitting}
                            />
                        </Stack>
                    </Form>
                )}
            </Formik>
        </ShowDialog>
    );
};

export default memo(CreateOrUpdateAddress);
