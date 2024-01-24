'use client';

import { AddressSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(0,0,0,.09)',
                paddingTop: '45px',
                paddingBottom: '35px',
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
                                fontSize: { sm: '16px', xs: '14px' },
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
                                    setLengthAddress(true);
                                    selectedAddressToUpdateIndex(addressIndex, address);
                                }}
                            >
                                Cập nhật
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ width: '25%' }}>
                <Button
                    onClick={() => {
                        setLengthAddress(true);
                        // TODO: fix this any type
                        selectedAddressToUpdateIndex(addressIndex, address as any);
                    }}
                    sx={{
                        width: { xs: '100%' },
                        margin: { xs: '0px auto' },
                    }}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    );
};

export default AddressItemList;
