import React, { FC } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { VariantInCart } from '@/interfaces/cart';
import styles from '@styles/components/payment.module.scss';

import { currencyFormat, upperCase } from '@/utils/funcs';

type ListProps = {
    list: VariantInCart[];
};

export const OrderListItems: FC<ListProps> = ({ list }) => {
    return (
        <Box>
            {list.map((item) => (
                <Box
                    key={item.id + item.data.sku}
                    sx={{
                        margin: { sm: '15px 0', xs: '10px 0' },
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                display: { sm: 'block', xs: 'none' },
                                width: '80px',
                                height: '80px',
                            }}
                        >
                            <Image
                                src={item.data.images[0].url}
                                width={80}
                                height={80}
                                alt='product'
                            />
                        </Box>
                        <Box
                            sx={{
                                display: { sm: 'none', xs: 'block' },
                                width: '60px !important',
                                height: '60px',
                            }}
                        >
                            <Image
                                src={item.data.images[0].url}
                                width={60}
                                height={60}
                                alt='product'
                            />
                        </Box>
                        <div className={styles.payment_card_info}>
                            <Stack>
                                <Typography
                                    variant='h4'
                                    sx={{ fontSize: { sm: '18px', xs: '16px' }, fontWeight: 600 }}
                                >
                                    {item.name}
                                </Typography>
                                <Typography variant='h6' sx={{ fontSize: '14px' }}>
                                    {item.data.attributes.map((attr, index) => {
                                        let str = '';
                                        const unit = attr.u ?? '';
                                        const separate = index !== 0 ? ' - ' : ('' as string);
                                        str += separate + upperCase(attr.v) + unit;
                                        return str;
                                    })}
                                </Typography>
                            </Stack>
                            <div className={styles.payment_price}>
                                <div className={styles.payment_price_box}>
                                    <div className={styles.payment_price_new}>
                                        {currencyFormat(item.data.price.special * item.quantity)}
                                    </div>
                                    <div className={styles.payment_price_old}>
                                        {currencyFormat(item.data.price.base * item.quantity)}
                                    </div>
                                </div>
                                <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            '& span': {
                                                fontSize: '18px',
                                                fontWeight: 600,
                                            },
                                        }}
                                    >
                                        {'x '}
                                        <span>{item.quantity}</span>
                                    </Typography>
                                </Box>
                            </div>
                        </div>
                    </Box>

                    <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                        <div className={styles.payment_item_right}>
                            <div className={styles.payment_quanity}>
                                Số lượng : <span> {item.quantity} </span>
                            </div>
                        </div>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};
