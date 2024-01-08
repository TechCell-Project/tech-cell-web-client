import React, { memo, useState } from 'react';
import { ShowDialog } from '@components/Common/Display';
import { CommonBtn } from '@components/Common';
import { ProfileAddressRequest } from '@models/Profile';
import { patchProfileAddress } from '@services/ProfileService';
import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';
import { getCurrentUser } from '@store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import Stack from '@mui/system/Stack';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    addressIndex: number;
};

const DeleteConfirmInfo = ({ isOpen, handleClose, addressIndex }: Props) => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirm = () => {
        const newValue = user?.address.filter((_, i) => i !== addressIndex);

        if (newValue) {
            const values = new ProfileAddressRequest(newValue);
            setIsLoading(true);
            patchProfileAddress(values)
                .then(() => {
                    toast.success('Xóa địa chỉ thành công!');
                    dispatch(getCurrentUser()).then();
                })
                .catch((error) => {
                    if (error.response && error.response.status !== HttpStatusCode.Unauthorized) {
                        toast.error('Xóa địa chỉ thất bại!');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    handleClose();
                });
        }
    };

    return (
        <ShowDialog
            dialogTitle='Xóa địa chỉ'
            isOpen={isOpen}
            handleClose={handleClose}
            dialogStyle={{ maxWidth: 500 }}
            dialogDesc={<>Bạn có chắc chắn muốn xóa địa chỉ này không?</>}
        >
            <Stack direction='row' gap={2} justifyContent='flex-end' mt={2}>
                <CommonBtn variant='outlined' content='Hủy bỏ' handleClick={handleClose} />
                <CommonBtn
                    variant='contained'
                    content='Xác nhận'
                    handleClick={handleConfirm}
                    disabled={isLoading}
                />
            </Stack>
        </ShowDialog>
    );
};

export default memo(DeleteConfirmInfo);
