import { Address } from '@models/Location';
import { AddressItemList } from '../ItemList';
import { useEffect, useState } from 'react';
import { DialogAddressUpdate } from '@components/Form/Common/DialogAddressUpdate';
import { useAxiosAuth } from '@hooks/useAxios';
import { PROFILE_GET_ENDPOINT } from '@constants/Services';
import { UserModel } from '@models/User.model';

interface AddressListProps {
    addresses: Address[];
    handleCloseListItem: (value: boolean) => void;
}

export function AddressList(props: AddressListProps) {
    const { addresses,handleCloseListItem } = props;
    const [userProfile, setUserProfile] = useState<UserModel>();
    const [selectAddress, setSelectAddress] = useState<number>(0);
    const [indexUp, setIndexUp] = useState<number>(0);
    const [openAddressUpdate, setOpenAddressUpdate] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

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

    console.log(userProfile);
    function getUserProfile() {
        return userProfile;
    }


    const handleSetSelected = (index: number) => {
        setSelectAddress(index);
    };

    const handleIndex = (index: number) => {
        setIndexUp(index);
    }

    const handleLength = () => {
        setOpenAddressUpdate(true);
    };

    const handleCloseAddressUp = () => {
        setOpenAddressUpdate(false)
        setCurrentAddress(null)
    }

   
    useEffect(() => {
        const defaultAddressIndex = addresses.findIndex((address) => address?.isDefault);
        if (defaultAddressIndex !== -1) {
            setSelectAddress(defaultAddressIndex);
        }
    }, [addresses]);

    return (
        <>
        {/* cập nhật địa chỉ khi click cập nhật ở danh sách địa chỉ */}
            {Boolean(currentAddress) && (
                <DialogAddressUpdate
                    isOpen={openAddressUpdate}
                    handleClose={handleCloseAddressUp}
                    getUserProfile={getUserProfile}
                    currentAddress={currentAddress}
                    triggerRefreshUserProfile={triggerRefreshUserProfile}
                    index={indexUp}
                />
            )}

            {/* địa chỉ của user */}
            {addresses.map((address: Address, index: number) => (
                <AddressItemList
                    address={address}
                    key={index}
                    index={index}
                    seleted={selectAddress}
                    setSelected={handleSetSelected}
                    setleghtAdd={handleLength}
                    handleCloseListItem={handleCloseListItem}
                    setCurrentAddress={setCurrentAddress}
                    setIndexUp={setIndexUp}
                />
            ))}
        </>
    );
}
