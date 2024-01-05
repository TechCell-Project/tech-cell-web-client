import React, { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Stack from '@mui/system/Stack';
import Chip from '@mui/material/Chip';
import { CommonBtn, IconBtn } from '@components/Common';
import Box from '@mui/material/Box';
import { District, Province, Ward } from '@models/Location';
import { ProfileAddressRequest } from '@models/Profile';
import { Address } from '@models/Account';
import { patchProfileAddress } from '@services/ProfileService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@store/slices/authSlice';
import { HttpStatusCode } from 'axios';

const ProfileAddress = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [loadingDefault, setLoadingDefault] = useState<boolean>(false);

    const handleSetDefault = (index: number) => {
        setLoadingDefault(true);
        const newValue: Array<Address> | undefined = user?.address.map((item, i) => ({
            ...item,
            isDefault: i === index,
        }));
        if (newValue) {
            const values = new ProfileAddressRequest(newValue);

            patchProfileAddress(values)
                .then(() => {
                    toast.success('Đổi địa chỉ mặc định thành công!');
                    dispatch(getCurrentUser()).then();
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
                <Box key={i} mb={4}>
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
                                    label='Mặc dịnh'
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
                            />
                            <IconBtn
                                icon={<HighlightOffRoundedIcon fontSize='small' />}
                                tooltip='Xóa'
                                size='small'
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
                            (item.provinceLevel as Province).province_name,
                            (item.districtLevel as District).district_name,
                            (item.wardLevel as Ward).ward_name,
                        ].join(', ')}
                    </Typography>
                </Box>
            ))}
        </>
    );
};

export default memo(ProfileAddress);
