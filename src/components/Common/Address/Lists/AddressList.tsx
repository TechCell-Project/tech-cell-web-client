'use client';

import { useEffect, useState, Suspense, lazy } from 'react';

import { LoadingPageMnt } from '@components/Common/Display/loading';
import SkeletonLoading from '@components/Common/Display/loading/SkeletonLoading';

import Box from '@mui/material/Box';

import { useProfile } from '@hooks/useProfile';
import { AddressSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

interface AddressListProps {
    handleSelectAddressIndex: (index: number) => void;
}

export function AddressList({ handleSelectAddressIndex }: Readonly<AddressListProps>) {
    const { profile: userProfile, refreshProfile } = useProfile();

    const DialogAddressUpdate = lazy(
        () => import('@components/Form/Common/AddressDialog/DialogAddressUpdate'),
    );
    const AddressItemList = lazy(
        () => import('@components/Common/Address/ItemList/AddressItemList'),
    );

    const [checkedAddress, setCheckedAddress] = useState<number>(0);
    const [openAddressUpdate, setOpenAddressUpdate] = useState(false);
    const [selectedAddressToUpdateIndex, setSelectedAddressToUpdateIndex] = useState<number | null>(
        null,
    );
    const [currentAddress, setCurrentAddress] = useState<AddressSchemaDTO | null>(null);

    const handleSetChecked = (index: number) => {
        setCheckedAddress(index);
        handleSelectAddressIndex(index);
    };

    const handleLength = () => {
        setOpenAddressUpdate(true);
    };

    const handleCloseAddressUp = () => {
        setOpenAddressUpdate(false);
        setSelectedAddressToUpdateIndex(null);
    };

    const handleSelectAddress = (indexToUpdate: number, address: AddressSchemaDTO) => {
        console.log(indexToUpdate);
        setSelectedAddressToUpdateIndex(indexToUpdate);
        setCurrentAddress(address);
    };

    useEffect(() => {
        const defaultAddressIndex = userProfile?.address?.findIndex(
            (address) => address?.isDefault,
        );
        if (defaultAddressIndex !== -1 && defaultAddressIndex != undefined) {
            setCheckedAddress(defaultAddressIndex);
        }
    }, [userProfile?.address]);

    return (
        <>
            {/* danh sách địa chỉ của user */}
            <div className='flex flex-col w-full'>
                {userProfile?.address?.map((address, index: number) => (
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
                            addressIndex={index}
                            selectedAddressToUpdateIndex={handleSelectAddress}
                        />
                    </Suspense>
                ))}
            </div>

            {/* cập nhật địa chỉ khi click cập nhật ở danh sách địa chỉ */}
            {userProfile && selectedAddressToUpdateIndex !== null && currentAddress !== null && (
                <Suspense fallback={<LoadingPageMnt isLoading isBlur />}>
                    <DialogAddressUpdate
                        userThisAddress={currentAddress as any}
                        triggerRefreshUserProfile={refreshProfile}
                        isOpen={openAddressUpdate}
                        handleClose={handleCloseAddressUp}
                        addressIndex={selectedAddressToUpdateIndex}
                    />
                </Suspense>
            )}
        </>
    );
}
