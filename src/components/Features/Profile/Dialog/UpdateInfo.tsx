import React, { memo } from 'react';
import { UserAccount } from '@models/Account';
import { ShowDialog } from '@components/Common/Display';
import { Form, Formik, FormikHelpers } from 'formik';
import { TextFieldCustom } from '@components/Common/FormFormik';
import { CommonBtn } from '@components/Common';
import Stack from '@mui/system/Stack';
import { patchProfileInfo } from '@services/ProfileService';
import { getCurrentUser } from '@store/slices/authSlice';
import { useAppDispatch } from '@store/store';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type Props = {
    data: UserAccount
    isOpen: boolean;
    handleClose: () => void
}

const UpdateInfo = ({ data, isOpen, handleClose }: Props) => {
    const dispatch = useAppDispatch();
    const handleSubmit = (values: UserAccount, { setSubmitting }: FormikHelpers<UserAccount>) => {
        const valueChanged: Partial<UserAccount> = {};
        for (const key in values) {
            if ((values as any)[key] !== (data as any)[key]) {
                (valueChanged as any)[key] = (values as any)[key];
            }
        }

        patchProfileInfo(valueChanged)
            .then(() => {
                dispatch(getCurrentUser()).then();
                toast.success('Chỉnh sửa thông tin thành công!');
            })
            .catch(() => toast.error('Chỉnh sửa thông tin thất bại'))
            .finally(() => {
                setSubmitting(false);
                handleClose();
            });
    };

    return (
        <ShowDialog
            dialogTitle='Thông tin người dùng'
            isOpen={isOpen}
            handleClose={handleClose}
            dialogStyle={{ minWidth: { lg: '30%', xs: '90%' } }}
        >
            <Formik
                enableReinitialize
                initialValues={data}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('Vui lòng nhập tên!'),
                    lastName: Yup.string().required('Vui lòng nhập họ!'),
                })}
            >
                {(form) => (
                    <Form style={{ width: '100%' }}>
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
    );
};

export default memo(UpdateInfo);