'use client';

import { AddressSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { buildAddressString } from 'utils/address.util';

interface AddressItemListProps {
    address: AddressSchemaDTO;
    checked: number;
    setChecked: (index: number) => void;
    setLengthAddress: (value: boolean) => void;
    handleCloseListItem: (value: boolean) => void;
    addressIndex: number;
    selectedAddressToUpdateIndex: (indexToUpdate: number, addressInfo: AddressSchemaDTO) => void;
}

const AddressItemList = (props: AddressItemListProps) => {
    const {
        address,
        checked,
        setChecked,
        setLengthAddress,
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
                alignItems: 'center',
                borderTop: '1px solid rgba(0,0,0,.09)',
                padding: { sm: '45px 0px 35 px 0px', xs: '35px 5px 15px 5px' },
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: { sm: '75%', xs: '100%' },
                }}
            >
                <Radio
                    checked={checked === addressIndex}
                    name='radio-buttons'
                    onChange={() => setChecked(addressIndex)}
                    sx={{
                        padding: '0',
                        color: 'red',
                        '&.Mui-checked': {
                            color: 'red',
                        },
                    }}
                />

                <Box sx={{ marginLeft: { sm: '30px', xs: '15px' }, width: '100%' }}>
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                //borderRight: '1px solid rgba(0,0,0,.09)',
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
                    </Stack>

                    <Stack>
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
                        <Box
                            sx={{
                                display: { sm: 'none', xs: 'flex' },
                                justifyContent: 'flex-end',
                                marginTop: '5px',
                            }}
                        >
                            <Button
                                variant='outlined'
                                onClick={() => {
                                    // handleCloseListItem(false);
                                    setLengthAddress(true);
                                    // TODO: fix this any type
                                    selectedAddressToUpdateIndex(addressIndex, address as any);
                                }}
                            >
                                Cập nhật
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>

            <Box
                sx={{
                    width: '25%',
                    display: { sm: 'flex', xs: 'none' },
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    onClick={() => {
                        // handleCloseListItem(false);
                        setLengthAddress(true);
                        // TODO: fix this any type
                        selectedAddressToUpdateIndex(addressIndex, address as any);
                    }}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    );
};

export default AddressItemList;
