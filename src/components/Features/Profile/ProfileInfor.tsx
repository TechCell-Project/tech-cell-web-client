import React, { memo, useState } from 'react';
import { useAppSelector } from '@store/store';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/system/Stack';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { formatDateViVN, getRole } from '@utils/funcs';
import { CommonBtn, TextView } from '@components/Common';
import UpdateInfo from '@components/Features/Profile/Dialog/UpdateInfo';
import { UserAccount } from '@models/Account';

const ProfileInfor = () => {
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.auth);

    return (
        <>
            <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
                <div>
                    <Typography
                        variant='h4'
                        fontWeight={600}
                        fontSize='30px'
                    >{`${user?.firstName} ${user?.lastName}`}</Typography>
                    <Typography variant='body1' fontWeight={500} fontSize='15px' mt={1}>
                        {getRole(user?.role)}
                    </Typography>
                </div>
                <CommonBtn
                    content='Chỉnh sửa thông tin'
                    variant='outlined'
                    endIcon={<EditRoundedIcon />}
                    styles={{ gap: '0px !important' }}
                    handleClick={() => setOpenUpdate(true)}
                />
            </Stack>
            <Typography fontWeight={600} fontSize='15px' mt={5}>
                1. Thông tin người dùng
            </Typography>
            <Grid container spacing={2} mt={1}>
                <Grid item md={6}>
                    <TextView label='Id' content={user?._id as string} />
                </Grid>
                <Grid item md={6}>
                    <TextView
                        label='Email'
                        content={user?.email as string}
                        unit={
                            user?.emailVerified && (
                                <CheckCircleRoundedIcon fontSize='small' color='primary' />
                            )
                        }
                    />
                </Grid>
                <Grid item md={6}>
                    <TextView
                        label='Trạng thái'
                        content={user?.block && user?.block?.isBlocked ? 'Bị chặn' : 'Hoạt động'}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextView label='Tài khoản' content={user?.userName as string} />
                </Grid>
                <Grid item md={6}>
                    <TextView label='TG lập' content={formatDateViVN(user?.createdAt as string)} />
                </Grid>
                <Grid item md={6}>
                    <TextView
                        label='TG chỉnh sửa'
                        content={formatDateViVN(user?.updatedAt as string)}
                    />
                </Grid>
            </Grid>

            {openUpdate && (
                <UpdateInfo
                    isOpen={openUpdate}
                    handleClose={() => setOpenUpdate(false)}
                    data={user as UserAccount}
                />
            )}
        </>
    );
};

export default memo(ProfileInfor);
