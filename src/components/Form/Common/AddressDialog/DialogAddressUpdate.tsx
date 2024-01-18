'use client';

import { ShowDialog } from '@components/Common/Display/DialogCustom';
import { SelectInputCustom } from '@components/Common/FormFormik/SelectCustom';
import { Box, Button, Grid } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AutocompleteCustom } from '@components/Common/FormFormik/AutocompleteCustom';
import { FC, useCallback, useEffect, useState } from 'react';
import { ProfileAddressSchema } from 'validate/auth.validate';
import { District, Location, Province, Ward } from '@models/Location';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { getDistricts, getWards, getProvinces } from '@services/LocationService';
import { ProfileAddressRequest } from '@models/Profile';
import { toastConfig } from '@constants/ToastMsgConfig';
import { Address } from '@models/Account';
import { useAppDispatch, useAppSelector } from '@store/store';
import { editProfileAddress } from '@store/slices/authSlice';

interface DialogAddressUpdateProps {
    isOpen: boolean;
    handleClose: () => void;
    userThisAddress: Address;
    triggerRefreshUserProfile: () => void;
    addressIndex: number | null;
    setOpenListAddress?: (value: boolean) => void;
    setOpenNewAddress?: (value: boolean) => void;
}

const addressName = [
    { name: 'Nhà', value: 'Nhà' },
    { name: 'Công ty', value: 'Công ty' },
];

const DialogAddressUpdate: FC<DialogAddressUpdateProps> = ({
    isOpen,
    handleClose,
    userThisAddress,
    triggerRefreshUserProfile,
    addressIndex,
    setOpenListAddress,
    setOpenNewAddress,
}) => {
    const dispatch = useAppDispatch();

    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setDistricts] = useState<Array<District>>(new Array<District>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        getProvinces()
            .then(({ data }) => {
                // TODO: fix wrong data type set
                setProvinces(data);
            })
            .catch(() => {
                setProvinces(new Array<Province>());
            });

        if (userThisAddress.provinceLevel !== null) {
            getDataDistricts(String((userThisAddress.provinceLevel as Province).province_id));
        }

        if (userThisAddress.districtLevel !== null) {
            getDataWards(String((userThisAddress.districtLevel as District).district_id));
        }
    }, []);

    const getDataDistricts = useCallback(
        async (province_id: string | undefined) => {
            await getDistricts(province_id)
                .then(({ data }) => setDistricts(data))
                .catch(() => setDistricts(new Array<District>()));
        },
        [provinces],
    );

    const getDataWards = useCallback(
        async (district_id: string | undefined) => {
            await getWards(district_id)
                .then(({ data }) => setWards(data))
                .catch(() => setWards(new Array<Ward>()));
        },
        [districts],
    );

    const handleUpdateAddress = async (
        addressUpdatedData: Address,
        { setSubmitting }: FormikHelpers<Address>,
    ) => {
        const updateData = [...(user?.address as Address[])];

        if (addressIndex === null) {
            updateData.push(addressUpdatedData);
        } else {
            updateData[addressIndex] = addressUpdatedData;
        }

        const payload = new ProfileAddressRequest(updateData);

        const res = await dispatch(editProfileAddress(payload));

        console.log(res);

        if (res?.success) {
            toast.success(
                `${addressIndex !== null ? 'Cập nhật' : 'Thêm mới'} địa chỉ thành công!`,
                toastConfig,
            );
            triggerRefreshUserProfile();
            if (setOpenListAddress && setOpenNewAddress) {
                setOpenNewAddress(false);
                setOpenListAddress(true);
            }
            setSubmitting(false);
            handleClose();
        } else {
            toast.error(
                `${addressIndex !== null ? 'Cập nhật' : 'Thêm mới'} địa chỉ thất bại!`,
                toastConfig,
            );
            console.log(res?.error);
            setSubmitting(false);
        }
    };

    console.log(provinces);
    console.log(districts);
    console.log(wards);

    return (
        <ShowDialog
            isOpen={isOpen}
            handleClose={handleClose}
            dialogTitle='Địa chỉ mới'
            dialogStyle={{ minWidth: 560 }}
        >
            <Formik
                initialValues={userThisAddress}
                enableReinitialize
                validationSchema={ProfileAddressSchema}
                onSubmit={handleUpdateAddress}
            >
                {({ setValues, errors, isSubmitting }) => (
                    <Form style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <SelectInputCustom
                                    name='addressName'
                                    label={'Địa chỉ'}
                                    options={addressName}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextFieldCustom name='customerName' label={'Họ và tên'} />
                            </Grid>
                            <Grid item md={6}>
                                <TextFieldCustom name='phoneNumbers' label={'Số điện thoại'} />
                            </Grid>
                            <Grid item md={6}>
                                <AutocompleteCustom<Province>
                                    name={'provinceLevel'}
                                    isNotCheckbox
                                    label='Chọn Thành Phố'
                                    displaySelected='province_id'
                                    displayLabel='province_name'
                                    options={provinces}
                                    handleChange={(value) => {
                                        if (value !== null) {
                                            getDataDistricts(
                                                String((value as Province)?.province_id),
                                            );
                                        }
                                        setValues((prev) => {
                                            const newValue = {
                                                ...prev,
                                            };

                                            newValue.provinceLevel = value;
                                            newValue.districtLevel = null;
                                            newValue.wardLevel = null;

                                            return newValue;
                                        });
                                        //getDataDistricts(String((value as Province)?.province_id!));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteCustom<District>
                                    name={'districtLevel'}
                                    isNotCheckbox
                                    label='Chọn Quận / Huyện'
                                    displaySelected='district_id'
                                    displayLabel='district_name'
                                    options={districts}
                                    handleChange={(value) => {
                                        if (value !== null) {
                                            getDataWards(String((value as District).district_id));
                                        }
                                        setValues((prev) => {
                                            const newValue = {
                                                ...prev,
                                            };

                                            newValue.districtLevel = value;
                                            newValue.wardLevel = null;

                                            return newValue;
                                        });
                                        //getDataWards(String((value as District).district_id));
                                    }}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <AutocompleteCustom<Ward>
                                    name={'wardLevel'}
                                    isNotCheckbox
                                    label='Chọn Thị / Xã'
                                    displaySelected='ward_code'
                                    displayLabel='ward_name'
                                    options={wards}
                                />
                            </Grid>

                            <Grid item md={12}>
                                <TextFieldCustom
                                    name='detail'
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
                                disabled={isSubmitting}
                                type='submit'
                                sx={{
                                    borderRadius: '5px',
                                    backgroundColor: '#ee4949',
                                    color: 'white',
                                    marginLeft: '10px',
                                    border: '1px solid #ee4949',
                                    '&:hover': {
                                        backgroundColor: '#ee4949 !important',
                                        // color: '#ee4949 !important',
                                    },
                                }}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </ShowDialog>
    );
};

export default DialogAddressUpdate;
