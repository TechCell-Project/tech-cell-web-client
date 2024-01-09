import React, { memo, useState } from 'react';
import { ShowDialog } from '@components/Common/Display';
import { CommonBtn } from '@components/Common';
import { toast } from 'react-toastify';
import Stack from '@mui/system/Stack';
import { useProfile } from '@hooks/useProfile';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    addressIndex: number;
};

const DeleteConfirmInfo = ({ isOpen, handleClose, addressIndex }: Props) => {
    const { profile, updateProfileAddress } = useProfile();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirm = () => {
        const newValue = profile?.address.filter((_, i) => i !== addressIndex);

        if (newValue) {
            setIsLoading(true);
            updateProfileAddress(newValue)
                .then(() => {
                    toast.success('Xóa địa chỉ thành công!');
                })
                .catch(() => {
                    toast.error('Xóa địa chỉ thất bại!');
                })
                .finally(() => {
                    setIsLoading(false);
                    handleClose();
                });
        } else {
            toast.error('Xóa địa chỉ thất bại!');
            handleClose();
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
