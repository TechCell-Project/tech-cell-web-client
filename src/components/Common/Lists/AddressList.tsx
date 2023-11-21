'use client';

import { Address } from '@models/Location';
import { AddressItemList } from '../ItemList';
import { useEffect, useState } from 'react';
import { DialogAddressUpdate } from '@components/Form/Common/DialogAddressUpdate';
import { useAxiosAuth } from '@hooks/useAxiosAuth';
import { PROFILE_GET_ENDPOINT } from '@constants/Services';
import { UserModel } from '@models/User.model';

interface AddressListProps {
    addresses: Address[];
    handleCloseListItem: (value: boolean) => void;
}

export function AddressList(props: Readonly<AddressListProps>) {
    const { addresses, handleCloseListItem } = props;
    const [userProfile, setUserProfile] = useState<UserModel>();
    const [selectAddress, setSelectAddress] = useState<number>(0);
    const [openAddressUpdate, setOpenAddressUpdate] = useState(false);
    const [selectedAddressToUpdateIndex, setSelectedAddressToUpdateIndex] = useState<number | null>(
        null,
    );

    const axiosAuth = useAxiosAuth();
    function triggerRefreshUserProfile() {
        return axiosAuth
            .get(PROFILE_GET_ENDPOINT)
            .then((response) => {
                if (response.data) {
                    setUserProfile(response.data as UserModel);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function getUserProfile() {
        return userProfile;
    }

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
        const defaultAddressIndex = addresses.findIndex((address) => address?.isDefault);
        if (defaultAddressIndex !== -1) {
            setSelectAddress(defaultAddressIndex);
        }
    }, [addresses]);

    useEffect(() => {
        if (!userProfile) {
            triggerRefreshUserProfile();
        }
    }, []);

    return (
        <>
            {/* cập nhật địa chỉ khi click cập nhật ở danh sách địa chỉ */}
            {selectedAddressToUpdateIndex && userProfile && (
                <DialogAddressUpdate
                    userProfile={userProfile}
                    isOpen={openAddressUpdate}
                    handleClose={handleCloseAddressUp}
                    triggerRefreshUserProfile={triggerRefreshUserProfile}
                    selectedAddressIndex={selectedAddressToUpdateIndex}
                />
            )}

            {/* địa chỉ của user */}
            {addresses.map((address: Address, index: number) => (
                <AddressItemList
                    address={address}
                    key={`index-${index.toString()}`}
                    selected={selectAddress}
                    setSelected={handleSetSelected}
                    setLengthAddress={handleLength}
                    handleCloseListItem={handleCloseListItem}
                    addressIndex={index}
                    selectedAddressToUpdateIndex={setSelectedAddressToUpdateIndex}
                />
            ))}
        </>
    );
}
