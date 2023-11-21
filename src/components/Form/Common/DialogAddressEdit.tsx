'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ShowDialog } from '@components/Common/Display/DialogCustom';
import { SelectInputCustom } from '@components/Common/FormFormik/SelectCustom';
import { Box, Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { AutocompleteCustom } from '../AutoCompleteCustom';
import { useEffect, useState } from 'react';
import { ProfileSchema } from 'validate/auth.validate';
import { District, Location, Province, Ward } from '@models/Location';
import { useAxiosAuth } from '@hooks/useAxiosAuth';
import { TextFieldCustom } from '@components/Common/FormFormik/TextFieldCustom';
import { UserModel } from '@models/User.model';
import { getDistricts, getWards, getProvinces } from '@services/LocationService';

interface DialogAddressEditProps {
    isOpen: boolean;
    handleClose: () => void;
    userProfile: UserModel;
    triggerRefreshUserProfile: () => Promise<void>;
    setOpenListAddress: (value: boolean) => void;
    setOpenNewAddress: (value: boolean) => void;
}

const addressName = [
    { name: 'Nhà', value: 'Nhà' },
    { name: 'Công ty', value: 'Công ty' },
];

export const DialogAddressEdit = (props: DialogAddressEditProps) => {
    const {
        isOpen,
        handleClose,
        userProfile,
        triggerRefreshUserProfile,
        setOpenListAddress,
        setOpenNewAddress,
    } = props;

    const [provinces, setProvinces] = useState<Array<Province>>(new Array<Province>());
    const [districts, setDistricts] = useState<Array<District>>(new Array<District>());
    const [wards, setWards] = useState<Array<Ward>>(new Array<Ward>());

    const axiosAuth = useAxiosAuth();

    const getDataDistricts = async (province_id: string | undefined) => {
        const { data } = await getDistricts(province_id);
        if (data) {
            setDistricts(data);
        }
    };

    const getDataWards = async (district_id: string | undefined) => {
        const { data } = await getWards(district_id);
        if (data) {
            setWards(data);
        }
    };

    useEffect(() => {
        getProvinces().then(({ data }) => {
            setProvinces(data);
        });
        triggerRefreshUserProfile();
    }, []);

    function handleUpdateAddress(data: Location) {
        const oldAddress = userProfile?.address ? userProfile.address : [];
        const dataBody = {
            address: [...oldAddress, data.address],
        };
        axiosAuth
            .patch('/profile/address', dataBody)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Cập nhật địa chỉ thành công', {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });

                    setOpenNewAddress(false);
                    setOpenListAddress(true);
                    triggerRefreshUserProfile();
                }
            })
            .catch(() => {
                toast.error('Cập nhật địa chỉ thất bại', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    }

    return (
        <ShowDialog
            isOpen={isOpen}
            handleClose={handleClose}
            dialogTitle="Địa chỉ mới"
            dialogStyle={{ minWidth: 560 }}
        >
            <ToastContainer />

            <Formik
                initialValues={new Location()}
                enableReinitialize
                validationSchema={ProfileSchema}
                onSubmit={(values) => {
                    handleUpdateAddress(values);
                }}
            >
                {({ setValues, errors }) => (
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
                                <TextFieldCustom name="address.customerName" label={'Họ và tên'} />
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

                                            newValue.address.provinceLevel = value;
                                            newValue.address.districtLevel = null;
                                            newValue.address.wardLevel = null;

                                            return newValue;
                                        });
                                        getDataDistricts((value as Province)?.province_id);
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

                                            newValue.address.districtLevel = value;
                                            newValue.address.wardLevel = null;

                                            return newValue;
                                        });
                                        getDataWards((value as District)?.district_id);
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
