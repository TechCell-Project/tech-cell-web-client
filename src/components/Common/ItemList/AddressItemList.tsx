'use client';

import { Address } from '@models/Account';
import { Box, Button, Radio } from '@mui/material';
import { useState, useEffect } from 'react';
import { buildAddressString } from 'utils/address.util';

interface AddressItemListProps {
    address: Address;
    checked: number;
    setChecked: (index: number) => void;
    setLengthAddress: (value: boolean) => void;
    handleCloseListItem: (value: boolean) => void;
    addressIndex: number;
    selectedAddressToUpdateIndex: (indexToUpdate: number, addressInfo: Address) => void;
}

const AddressItemList = (props: AddressItemListProps) => {
    const {
        address,
        checked,
        setChecked,
        setLengthAddress,
        handleCloseListItem,
        addressIndex,
        selectedAddressToUpdateIndex,
    } = props;

    const [addressString, setAddressString] = useState<string>('');

    useEffect(() => {
        setAddressString(buildAddressString(address));
    }, [address]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(0,0,0,.09)',
                paddingTop: '45px',
                paddingBottom: '35px',
                paddingLeft:'0px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <Radio
                    checked={checked === addressIndex}
                    name="radio-buttons"
                    onChange={() => setChecked(addressIndex)}
                    sx={{
                        padding: '0',
                        color: 'red',
                        '&.Mui-checked': {
                            color: 'red',
                        },
                    }}
                />

                <Box sx={{ width: '75%', marginLeft: '30px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderRight: '1px solid rgba(0,0,0,.09)',
                                paddingRight: '15px',
                            }}
                        >
                            {address?.customerName}
                        </Box>
                        <Box
                            sx={{
                                marginLeft: '15px',
                                fontSize: '12px',
                                color: '#000000A6',
                            }}
                        >
                            {address?.phoneNumbers}
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '10px' }}>
                        <Box
                            sx={{
                                lineHeight: '1.5',
                                fontSize: '12px',
                                color: '#000000A6',
                            }}
                        >
                            {addressString}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '25%' }}>
                <Button
                    onClick={() => {
                        // handleCloseListItem(false);
                        setLengthAddress(true);
                        selectedAddressToUpdateIndex(addressIndex, address);
                    }}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    );
};

export default AddressItemList;
