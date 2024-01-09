import React, { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Stack from '@mui/system/Stack';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { CommonBtn } from '@components/Common';
import { AutocompleteCustom, TextFieldCustom } from '@components/Common/FormFormik';
import { ShowDialog } from '@components/Common/Display';
import * as Yup from 'yup';
import { useProfile } from '@hooks/useProfile';
import {
    AddressSchemaDTO,
    GhnProvinceDTO,
    GhnWardDTO,
    GhnDistrictDTO,
    UserMntResponseDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk/models';
import {
    INIT_CURRENT_DISTRICT,
    MANUAL_CHANGE_DISTRICT,
    useAddress,
    UseAddress,
} from '@hooks/useAddress';

type Props = {
    data: AddressSchemaDTO;
    addressIndex: number | null;
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

function resolveWardsOptions(
    user: UserMntResponseDTO,
    addresses: UseAddress['addresses'],
    currentDistrict: number,
    addressIndex: number | null,
): GhnWardDTO[] | [] {
    if (currentDistrict === MANUAL_CHANGE_DISTRICT) {
        return [];
    } else if (currentDistrict === INIT_CURRENT_DISTRICT) {
        if (addressIndex === null) {
            return [];
        } else {
            const index = user?.address[addressIndex]?.districtLevel?.district_id;
            if (!index) {
                return [];
            }
            return addresses?.wards?.[index] ?? [];
        }
    } else {
        return addresses?.wards?.[currentDistrict] ?? [];
    }
}

const CreateOrUpdateAddress = ({ data, addressIndex, isOpen, handleClose }: Props) => {
    const { profile: user, updateProfileAddress } = useProfile();
    const {
        addresses,
        status: addressStatus,
        currentProvince,
        currentDistrict,
        setCurrentProvince,
        setCurrentDistrict,
    } = useAddress();

    const handleSubmit = (
        values: AddressSchemaDTO,
        { setSubmitting }: FormikHelpers<AddressSchemaDTO>,
    ) => {
        const cloneAddress = [...(user?.address as AddressSchemaDTO[])];

        if (addressIndex === null) {
            cloneAddress.push(values);
        } else {
            cloneAddress[addressIndex] = values;
        }

        updateProfileAddress(cloneAddress)
            .then(() => {
                toast.success(
                    `${addressIndex === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thành công!`,
                );
            })
            .catch((error) => {
                console.error(error);
                toast.error(`${addressIndex === null ? 'Thêm mới' : 'Cập nhật'} địa chỉ thất bại!`);
            })
            .finally(() => {
                setSubmitting(false);
                handleClose();
            });
    };

    return (
        user?.address && (
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
                                    <AutocompleteCustom<GhnProvinceDTO>
                                        disabled={addressStatus === 'loading'}
                                        name={`provinceLevel`}
                                        isNotCheckbox
                                        label='Tỉnh / thành'
                                        options={addresses?.provinces ?? []}
                                        displayLabel='province_name'
                                        displaySelected='province_id'
                                        handleChange={(value) => {
                                            setCurrentProvince(
                                                (value as GhnProvinceDTO).province_id,
                                            );
                                            setCurrentDistrict(MANUAL_CHANGE_DISTRICT);
                                            setValues((prev) => {
                                                const newValue = { ...prev };

                                                if (value && !Array.isArray(value)) {
                                                    newValue.provinceLevel = {
                                                        province_id: value.province_id,
                                                        province_name: value.province_name,
                                                    };
                                                    newValue.districtLevel =
                                                        null as unknown as GhnDistrictDTO;
                                                    newValue.wardLevel =
                                                        null as unknown as GhnWardDTO;
                                                }

                                                return newValue;
                                            }).then();
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <AutocompleteCustom<GhnDistrictDTO>
                                        disabled={addressStatus === 'loading'}
                                        name={`districtLevel`}
                                        label='Quận / huyện'
                                        isNotCheckbox
                                        options={
                                            addresses?.districts?.[
                                                currentProvince ||
                                                    user.address[addressIndex as number]
                                                        ?.provinceLevel?.province_id
                                            ] ?? []
                                        }
                                        displayLabel='district_name'
                                        displaySelected='district_id'
                                        handleChange={(value) => {
                                            setCurrentDistrict(
                                                (value as GhnDistrictDTO).district_id,
                                            );
                                            setValues((prev) => {
                                                const newValue = { ...prev };

                                                if (value && !Array.isArray(value)) {
                                                    newValue.districtLevel = {
                                                        district_id: value.district_id,
                                                        district_name: value.district_name,
                                                    };
                                                    newValue.wardLevel =
                                                        null as unknown as GhnWardDTO;
                                                }

                                                return newValue;
                                            }).then();
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <AutocompleteCustom<GhnWardDTO>
                                        disabled={addressStatus === 'loading'}
                                        name={`wardLevel`}
                                        label='Xã / phường'
                                        isNotCheckbox
                                        options={resolveWardsOptions(
                                            user,
                                            addresses,
                                            currentDistrict,
                                            addressIndex,
                                        )}
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
        )
    );
};

export default memo(CreateOrUpdateAddress);
