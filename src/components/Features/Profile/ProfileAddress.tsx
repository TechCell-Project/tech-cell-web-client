import React, { memo, useState } from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import DeleteConfirmInfo from '@components/Features/Profile/Dialog/DeleteConfirmInfo';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/system/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { CommonBtn, IconBtn } from '@components/Common';
import { toast } from 'react-toastify';
import CreateOrUpdateAddress from '@components/Features/Profile/Dialog/CreateOrUpdateAddress';
import { useProfile } from '@hooks/useProfile';
import { AddressSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk/models';
import { createInitialValues } from '@utils/shared.util';

const ProfileAddress = () => {
    const { profile: user, updateProfileAddress } = useProfile();

    const [loadingDefault, setLoadingDefault] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<AddressSchemaDTO | null>(null);
    const [addressIndex, setAddressIndex] = useState<number | null>(null);

    const handleSetDefault = (index: number) => {
        setLoadingDefault(true);
        const newValue: Array<AddressSchemaDTO> | undefined = user?.address.map((item, i) => ({
            ...item,
            isDefault: i === index,
        }));
        if (newValue) {
            updateProfileAddress(newValue)
                .then(() => {
                    toast.success('Đổi địa chỉ mặc định thành công!');
                })
                .catch(() => toast.error('Đổi địa chỉ mặc định thất bại!'))
                .finally(() => setLoadingDefault(false));
        }
    };

    return (
        <>
            <Typography fontWeight={600} fontSize='15px' mt={5} mb={3}>
                2. Địa chỉ người dùng
            </Typography>
            {user?.address?.map((item, i) => (
                <Box key={i}>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        mb={2}
                    >
                        <Stack direction='row' gap={4} alignItems='center'>
                            <Typography fontWeight={500} fontSize='15px'>
                                2.{i + 1} {item.addressName}
                            </Typography>
                            {item.isDefault ? (
                                <Chip
                                    icon={<CheckCircleRoundedIcon />}
                                    label='Mặc định'
                                    color='primary'
                                />
                            ) : (
                                <CommonBtn
                                    content='Chọn mặc định'
                                    variant='text'
                                    handleClick={() => handleSetDefault(i)}
                                    loading={loadingDefault}
                                />
                            )}
                        </Stack>
                        <Stack direction='row' gap={2}>
                            <IconBtn
                                icon={<EditRoundedIcon fontSize='small' />}
                                tooltip='Chỉnh sửa'
                                size='small'
                                onClick={() => {
                                    setCurrentAddress(item);
                                    setAddressIndex(i);
                                }}
                            />
                            <IconBtn
                                icon={<HighlightOffRoundedIcon fontSize='small' />}
                                tooltip='Xóa'
                                size='small'
                                onClick={() => {
                                    setOpenDelete(true);
                                    setAddressIndex(i);
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction='row' gap='10px' alignItems='center'>
                        <Typography fontSize='18px' fontWeight={500}>
                            {item.customerName}
                        </Typography>
                        |<Typography fontSize='15px'>{item.phoneNumbers}</Typography>
                    </Stack>
                    <Typography fontSize='15px' mt={1}>
                        {[
                            item.detail,
                            item.provinceLevel.province_name,
                            item.districtLevel.district_name,
                            item.wardLevel.ward_name,
                        ].join(', ')}
                    </Typography>

                    <hr
                        style={{
                            width: '100%',
                            height: '0.5px',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            margin: '25px 0',
                        }}
                    />
                </Box>
            ))}

            <CommonBtn
                content='Thêm địa chỉ'
                variant='outlined'
                styles={{ gap: '0px !important', width: 'max-content' }}
                endIcon={<AddCircleRoundedIcon />}
                handleClick={() => setCurrentAddress(createInitialValues<AddressSchemaDTO>())}
            />

            {Boolean(currentAddress) && (
                <CreateOrUpdateAddress
                    isOpen={Boolean(currentAddress)}
                    handleClose={() => {
                        setCurrentAddress(null);
                        setAddressIndex(null);
                    }}
                    data={currentAddress as any}
                    addressIndex={addressIndex as number}
                />
            )}

            {openDelete !== null && (
                <DeleteConfirmInfo
                    isOpen={openDelete}
                    handleClose={() => {
                        setOpenDelete(false);
                        setAddressIndex(null);
                    }}
                    addressIndex={addressIndex as number}
                />
            )}
        </>
    );
};

export default memo(ProfileAddress);
