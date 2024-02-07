import React from 'react';
import Image from 'next/image';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { PaymentMethodLabel } from '@/constants/contents';
import { Typography } from '@mui/material';

const Card = styled(Paper)(({ theme }) => ({
    width: '100%',
    backgroundColor: 'white',
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    border: `1px solid ${theme.color.lightGray}`,
}));

type CardProps = {
    isSelected: boolean;
    method: PaymentMethodLabel;
};

const PaymentMethodCard = ({ method, isSelected }: CardProps) => {
    return (
        <Stack
            direction='column'
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Card
                elevation={2}
                sx={{
                    ...(isSelected && {
                        border: '2px solid #ee4949',
                    }),
                }}
            >
                <Image
                    src={method.imgLable}
                    alt='Payment Method'
                    height={60}
                    width={60}
                    style={{ height: '60px !important', width: 'auto' }}
                />
            </Card>
            <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{method.label}</Typography>
        </Stack>
    );
};

export default PaymentMethodCard;
