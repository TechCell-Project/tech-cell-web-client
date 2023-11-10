import { Address } from "@models/Location";
import { AddressItemList } from "../ItemList";
import { useEffect, useState } from "react";

interface AddressListProps {
    addresses: Address[];
}

export function AddressList(props: AddressListProps) {
    const {addresses} = props;
    const [selectAddress, setSelectAddress] = useState<number>(0);

    const handleSetSelected = (index: number) => {
        setSelectAddress(index);
    }

    useEffect(() => {
        const defaultAddressIndex = addresses.findIndex(address => address?.isDefault);
        if (defaultAddressIndex !== -1) {
            setSelectAddress(defaultAddressIndex);
        }
    }, [addresses]);

    return addresses.map((address: Address, index: number) => (
        <AddressItemList
            address={address}
            key={index}
            index={index}
            seleted={selectAddress}
            setSelected={handleSetSelected}
        />
    ))
}