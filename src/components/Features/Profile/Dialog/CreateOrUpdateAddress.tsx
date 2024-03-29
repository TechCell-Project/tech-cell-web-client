import React, { memo } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Stack from '@mui/system/Stack';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { CommonBtn } from '@components/Common';
import { AutocompleteCustom, TextFieldCustom } from '@components/Common/FormFormik';
import { ShowDialog } from '@components/Common/Display';
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
    RESET_DISTRICT,
    RESET_PROVINCE,
    useAddress,
    UseAddress,
} from '@hooks/useAddress';
import { ProfileAddressSchema } from '@/validate/auth.validate';

type Props = {
    data: AddressSchemaDTO;
    addressIndex: number | null;
    isOpen: boolean;
    handleClose: () => void;
};

function resolveWardsOptions(
    user: UserMntResponseDTO,
    addresses: UseAddress['addresses'],
    currentDistrict: number,
    addressIndex: number | null,
): GhnWardDTO[] | [] {
    if (currentDistrict === RESET_DISTRICT) {
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
                    validationSchema={ProfileAddressSchema}
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
                                            setValues((prev) => {
                                                const newValue = { ...prev };

                                                const oldValue = value as GhnProvinceDTO;
                                                newValue.provinceLevel = {
                                                    province_id: oldValue?.province_id,
                                                    province_name: oldValue?.province_name,
                                                };
                                                newValue.districtLevel =
                                                    null as unknown as GhnDistrictDTO;
                                                newValue.wardLevel = null as unknown as GhnWardDTO;

                                                setCurrentProvince(
                                                    newValue.provinceLevel?.province_id ??
                                                        RESET_PROVINCE,
                                                );
                                                setCurrentDistrict(RESET_DISTRICT);
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
                                            currentProvince === RESET_PROVINCE
                                                ? []
                                                : addresses?.districts?.[
                                                      currentProvince ||
                                                          user.address[addressIndex as number]
                                                              ?.provinceLevel?.province_id
                                                  ] ?? []
                                        }
                                        displayLabel='district_name'
                                        displaySelected='district_id'
                                        handleChange={(value) => {
                                            setValues((prev) => {
                                                const newValue = { ...prev };

                                                const oldValue = value as GhnDistrictDTO;
                                                newValue.districtLevel = {
                                                    district_id: oldValue?.district_id,
                                                    district_name: oldValue?.district_name,
                                                };
                                                newValue.wardLevel = null as unknown as GhnWardDTO;

                                                setCurrentDistrict(
                                                    newValue.districtLevel?.district_id ??
                                                        RESET_DISTRICT,
                                                );
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
