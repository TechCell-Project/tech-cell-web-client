import { Address } from '@models/Location';
import { Box, Button, Radio } from '@mui/material';
import { buildAddressString } from 'utils/address.util';

interface AddressItemListProps {
    address: Address;
    index: number;
    seleted: number;
    setSelected: (index: number) => void;
}

export const AddressItemList = (props: AddressItemListProps) => {
    const { address, index, seleted, setSelected } = props;

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
                }}
            >
                <Radio
                    checked={seleted === index}
                    name="radio-buttons"
                    onChange={() => setSelected(index)}
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
                            {address && address?.customerName}
                        </Box>
                        <Box
                            sx={{
                                marginLeft: '15px',
                                fontSize: '12px',
                                color: '#000000A6',
                            }}
                        >
                            {address && address?.phoneNumbers}
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
                            {buildAddressString(address)}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '25%' }}>
                <Button>Cập nhật</Button>
            </Box>
        </Box>
    );
};
