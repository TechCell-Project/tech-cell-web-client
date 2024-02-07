import React from 'react';

import { OrderListTitle } from './OrderList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PAYMENT_METHODS, ValidPaymentMethod } from '@/constants/contents';
import PaymentMethodCard from './PaymentMethodCard';
import Grid from '@mui/material/Grid';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

type SelectPaymentMethodProps = {
    handleSelectMethod: (event: React.MouseEvent<HTMLElement>, method: string) => void;
    selectedMethod: ValidPaymentMethod;
};

const SelectingPaymentMethod = ({
    handleSelectMethod,
    selectedMethod,
}: SelectPaymentMethodProps) => {
    return (
        <Box
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
                onChange={handleSelectMethod}
                aria-label='payment method'
                exclusive
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}
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
        </Box>
    );
};

export default SelectingPaymentMethod;
