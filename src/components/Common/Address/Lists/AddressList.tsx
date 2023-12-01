'use client';

import { Address } from '@models/Location';
import { useEffect, useState, Suspense, lazy } from 'react';
import { UserModel } from '@models/User.model';
import { LoadingPageMnt } from '@components/Common/Display/loading';
import SkeletonLoading from '@components/Common/Display/loading/SkeletonLoading';
import { Box } from '@mui/material';

interface AddressListProps {
    userProfile: UserModel;
    triggerRefreshUserProfile: () => Promise<void>;
    handleCloseListItem: (value: boolean) => void;
}

export function AddressList(props: Readonly<AddressListProps>) {
    const DialogAddressUpdate = lazy(() => import('@components/Form/Common/AddressDialog/DialogAddressUpdate'));
    const AddressItemList = lazy(() => import('@components/Common/Address/ItemList/AddressItemList'));

    const { handleCloseListItem, triggerRefreshUserProfile, userProfile } = props;
    const [selectAddress, setSelectAddress] = useState<number>(0);
    const [openAddressUpdate, setOpenAddressUpdate] = useState(false);
    const [selectedAddressToUpdateIndex, setSelectedAddressToUpdateIndex] = useState<number | null>(
        null,
    );

    const handleSetSelected = (index: number) => {
        setSelectAddress(index);
    };

    const handleLength = () => {
        setOpenAddressUpdate(true);
    };

    const handleCloseAddressUp = () => {
        setOpenAddressUpdate(false);
        setSelectedAddressToUpdateIndex(null);
    };

    useEffect(() => {
        const defaultAddressIndex = userProfile?.address?.findIndex(
            (address) => address?.isDefault,
        );
        if (defaultAddressIndex !== -1 && defaultAddressIndex != undefined) {
            setSelectAddress(defaultAddressIndex);
        }
    }, [userProfile?.address]);

    return (
        <>
            {/* danh sách địa chỉ của user */}
            {userProfile?.address?.map((address: Address, index: number) => (
                <Suspense
                    fallback={
                        <SkeletonLoading
                            enableAnimation
                            height={120}
                            wrapper={Box}
                            duration={0.5}
                        />
                    }
                    key={`index-${index.toString()}`}
                >
                    <Box sx={{ marginLeft: '0px !important' }}>
                        <AddressItemList
                            address={address}
                            selected={selectAddress}
                            setSelected={handleSetSelected}
                            setLengthAddress={handleLength}
                            handleCloseListItem={handleCloseListItem}
                            addressIndex={index}
                            selectedAddressToUpdateIndex={setSelectedAddressToUpdateIndex}
                        />
                    </Box>
                </Suspense>
            ))}

            {/* cập nhật địa chỉ khi click cập nhật ở danh sách địa chỉ */}
            {userProfile && selectedAddressToUpdateIndex != null && (
                <Suspense fallback={<LoadingPageMnt isLoading isBlur />}>
                    <DialogAddressUpdate
                        userProfile={userProfile}
                        isOpen={openAddressUpdate}
                        handleClose={handleCloseAddressUp}
                        triggerRefreshUserProfile={triggerRefreshUserProfile}
                        selectedAddressToUpdateIndex={selectedAddressToUpdateIndex}
                    />
                </Suspense>
            )}
        </>
    );
}
