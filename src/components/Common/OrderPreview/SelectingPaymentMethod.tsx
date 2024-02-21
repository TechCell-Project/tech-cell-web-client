import React from 'react';

import { OrderListTitle } from './OrderList';
import { PaymentMethodCard } from './PaymentMethodCard';

import { PAYMENT_METHODS, ValidPaymentMethod } from '@/constants/contents';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type SelectPaymentMethodProps = {
    handleSelectMethod: (method: string) => void;
    selectedMethod: ValidPaymentMethod;
};

export const SelectingPaymentMethod = ({
    handleSelectMethod,
    selectedMethod,
}: SelectPaymentMethodProps) => {
    const onChangeMethod = (event: React.MouseEvent<HTMLElement>, method: string) => {
        handleSelectMethod(method);
    };

    const onSelectMethod = (event: SelectChangeEvent) => {
        handleSelectMethod(event.target.value);
    };

    return (
        <Box
            className='flex flex-col'
            sx={{
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '5px 15px 30px 15px',
                margin: '10px 0',
            }}
        >
            <OrderListTitle>
                <Typography variant='subtitle1' fontSize='14px'>
                    Chọn phương thức thanh toán
                </Typography>
            </OrderListTitle>
            <ToggleButtonGroup
                value={selectedMethod}
                onChange={onChangeMethod}
                aria-label='payment method'
                exclusive
                sx={{
                    display: { sm: 'grid', xs: 'none' },
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '10px',
                }}
            >
                {PAYMENT_METHODS.map((method) => (
                    <ToggleButton
                        key={method.key}
                        value={method.key}
                        sx={{ padding: 0, margin: 0, border: 'none' }}
                    >
                        <PaymentMethodCard
                            method={method}
                            isSelected={selectedMethod === method.key}
                        />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <FormControl
                className='w-full'
                sx={{ display: { sm: 'none', xs: 'flex' }, maxHeight: '40px', padding: 0 }}
            >
                <Box className='h-full w-full'>
                    <Select
                        value={selectedMethod}
                        onChange={onSelectMethod}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            '& .MuiSelect-select': {
                                backgroundColor: 'white',
                                padding: '10px 12px',
                                border: '2px solid #ee4949',
                                '& p': {
                                    fontSize: '16px',
                                },
                            },
                        }}
                    >
                        {PAYMENT_METHODS.map((method) => (
                            <MenuItem key={method.key} value={method.key}>
                                <Typography variant='body1' fontSize={14}>
                                    {method.label}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </FormControl>
        </Box>
    );
};
