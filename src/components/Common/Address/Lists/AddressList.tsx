'use client';

import { Address } from '@models/Account';
import { useEffect, useState, Suspense, lazy } from 'react';
import { UserModel } from '@models/Profile';
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

    const [checkedAddress, setCheckedAddress] = useState<number>(0);
    const [openAddressUpdate, setOpenAddressUpdate] = useState(false);
    const [selectedAddressToUpdateIndex, setSelectedAddressToUpdateIndex] = useState<number | null>(
        null,
    );
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

    const handleSetChecked = (index: number) => {
        setCheckedAddress(index);
    };

    const handleLength = () => {
        setOpenAddressUpdate(true);
    };

    const handleCloseAddressUp = () => {
        setOpenAddressUpdate(false);
        setSelectedAddressToUpdateIndex(null);
    };

    const handleSelectAddress = (indexToUpdate: number, address: Address) => {
        console.log(indexToUpdate);
        setSelectedAddressToUpdateIndex(indexToUpdate);
        setCurrentAddress(address);
    }

    useEffect(() => {
        const defaultAddressIndex = userProfile?.address?.findIndex(
            (address) => address?.isDefault,
        );
        if (defaultAddressIndex !== -1 && defaultAddressIndex != undefined) {
            setCheckedAddress(defaultAddressIndex);
        }
    }, [userProfile?.address]);

    console.log(currentAddress);

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
                    <AddressItemList
                        address={address}
                        checked={checkedAddress}
                        setChecked={handleSetChecked}
                        setLengthAddress={handleLength}
                        handleCloseListItem={handleCloseListItem}
                        addressIndex={index}
                        selectedAddressToUpdateIndex={handleSelectAddress}
                    />
                </Suspense>
            ))}

            {/* cập nhật địa chỉ khi click cập nhật ở danh sách địa chỉ */}
            {userProfile && selectedAddressToUpdateIndex !== null && currentAddress !== null && (
                <Suspense fallback={<LoadingPageMnt isLoading isBlur />}>
                    <DialogAddressUpdate
                        userThisAddress={currentAddress}
                        isOpen={openAddressUpdate}
                        handleClose={handleCloseAddressUp}
                        triggerRefreshUserProfile={triggerRefreshUserProfile}
                        addressIndex={selectedAddressToUpdateIndex}
                    />
                </Suspense>
            )}
        </>
    );
}
