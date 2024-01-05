import React, { memo, useState } from 'react';
import Dropzone from 'react-dropzone';
import Typography from '@mui/material/Typography';
import styles from '@styles/components/profile.module.scss';
import AvatarEditor from 'react-avatar-editor';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { CommonBtn } from '@components/Common';
import { useAppDispatch, useAppSelector } from '@store/store';
import { UserAccount } from '@models/Account';
import { ImageModel } from '@models/Product';
import { postImage } from '@services/ImageService';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { patchProfileAddress, patchProfileInfo } from '@services/ProfileService';
import { getCurrentUser } from '@store/slices/authSlice';

const ProfileAvatar = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [avatar, setAvatar] = useState<string | File>((user?.avatar as ImageModel).url);
    const [dropped, setDropped] = useState<boolean>(false);

    const handleDrop = (dropped: File[]) => {
        if (dropped.length > 0) {
            setAvatar(dropped[0]);
            setDropped(true);
        }
    };

    const handleSave = async () => {
        try {
            const value: Partial<UserAccount> = {};
            const formData = new FormData();
            formData.append('image', avatar as Blob);

            const { data, status } = await postImage(formData);
            if (status === HttpStatusCode.Created) {
                value.avatarPublicId = data.publicId;
                patchProfileInfo(value)
                    .then(() => {
                        dispatch(getCurrentUser()).then();
                        toast.success('Lưu ảnh đại diện thành công!');
                    })
                    .catch(() => toast.error('Lưu ảnh đại diện thất bại!'));
            }
        } catch {
            toast.error('Lưu ảnh đại diện thất bại!');
        }
    };

    return (
        <Dropzone
            onDrop={handleDrop}
            noClick={false}
            noKeyboard
        >
            {({ getRootProps, getInputProps }) => (
                <div className={styles.dropzoneAvatar}>
                    <Typography variant='body1' fontWeight={600} textAlign='center'>Avatar</Typography>
                    <div {...getRootProps()}>
                        <AvatarEditor
                            width={120}
                            height={120}
                            image={avatar || '/images/simpleAvatar.jpg'}
                            borderRadius={1000}
                        />
                        <input {...getInputProps()} />
                    </div>
                    <CommonBtn
                        content='Lưu ảnh'
                        startIcon={<CloudUploadRoundedIcon />}
                        variant='text'
                        styles={{ gap: '0px !important' }}
                        handleClick={handleSave}
                        disabled={!dropped}
                    />
                </div>
            )}
        </Dropzone>
    );
};

export default memo(ProfileAvatar);