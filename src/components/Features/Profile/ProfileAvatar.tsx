import React, { memo, useState } from 'react';
import Dropzone from 'react-dropzone';
import Typography from '@mui/material/Typography';
import styles from '@styles/components/profile.module.scss';
import AvatarEditor from 'react-avatar-editor';
import { CommonBtn } from '@components/Common';
import { postImage } from '@services/ImageService';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { useProfile } from '@hooks/useProfile';

const ProfileAvatar = () => {
    const { profile: user, updateProfileInfo } = useProfile();

    const [avatar, setAvatar] = useState<string | File>(
        user?.avatar?.url ?? '/images/simpleAvatar.jpg',
    );
    const [dropped, setDropped] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDrop = (dropped: File[]) => {
        if (dropped.length > 0) {
            setAvatar(dropped[0]);
            setDropped(true);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', avatar as Blob);
            const { data, status } = await postImage(formData);
            if (status === HttpStatusCode.Created) {
                updateProfileInfo({
                    avatarPublicId: data.publicId,
                })
                    .then(() => {
                        toast.success('Lưu ảnh đại diện thành công!');
                    })
                    .catch(() => toast.error('Lưu ảnh đại diện thất bại!'));
            }
        } catch {
            toast.error('Lưu ảnh đại diện thất bại!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dropzone onDrop={handleDrop} noClick={false} noKeyboard>
            {({ getRootProps, getInputProps }) => (
                <div className={styles.dropzoneAvatar}>
                    <Typography variant='body1' fontWeight={600} textAlign='center'>
                        Avatar
                    </Typography>
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
                        variant='text'
                        handleClick={handleSave}
                        disabled={!dropped || isLoading}
                        loading={isLoading}
                    />
                </div>
            )}
        </Dropzone>
    );
};

export default memo(ProfileAvatar);
