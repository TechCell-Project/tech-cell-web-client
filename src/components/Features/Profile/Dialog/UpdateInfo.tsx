import React, { memo } from 'react';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { ShowDialog } from '@components/Common/Display';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';

import Stack from '@mui/system/Stack';

import { UserMntResponseDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { useProfile } from '@hooks/useProfile';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

const UpdateInfo = ({ isOpen, handleClose }: Props) => {
    const { profile, updateProfileInfo } = useProfile();

    const handleSubmit = (
        values: UserMntResponseDTO,
        { setSubmitting }: FormikHelpers<UserMntResponseDTO>,
    ) => {
        updateProfileInfo(values)
            .then(() => {
                toast.success('Chỉnh sửa thông tin thành công!');
            })
            .catch(() => toast.error('Chỉnh sửa thông tin thất bại'))
            .finally(() => {
                setSubmitting(false);
                handleClose();
            });
    };

    return (
        profile && (
            <ShowDialog
                dialogTitle='Thông tin người dùng'
                isOpen={isOpen}
                handleClose={handleClose}
                dialogStyle={{ minWidth: { lg: '30%', xs: '90%' } }}
                isSmall={false}
            >
                <Formik
                    enableReinitialize
                    initialValues={profile}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('Vui lòng nhập tên!'),
                        lastName: Yup.string().required('Vui lòng nhập họ!'),
                    })}
                >
                    {(form) => (
                        <Form style={{ width: '100%', marginTop: '20px' }}>
                            <Stack direction='column' gap='20px'>
                                <TextFieldCustom name='lastName' label='Họ' />
                                <TextFieldCustom name='firstName' label='Tên' />
                                <TextFieldCustom name='userName' label='Tên tài khoản' />
                            </Stack>

                            <Stack direction='row' justifyContent='flex-end' gap={2} mt={5}>
                                <CommonBtn
                                    content='Hủy bỏ'
                                    variant='outlined'
                                    handleClick={handleClose}
                                />
                                <CommonBtn
                                    content='Cập nhật'
                                    variant='contained'
                                    type='submit'
                                    disabled={form.isSubmitting || !form.dirty}
                                    loading={form.isSubmitting}
                                />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </ShowDialog>
        )
    );
};

export default memo(UpdateInfo);
