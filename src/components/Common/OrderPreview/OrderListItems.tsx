import React, { FC } from 'react';
import Image from 'next/image';

import { VariantInCart } from '@/interfaces/cart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from '@styles/components/payment.module.scss';
import { currencyFormat, upperCase } from '@/utils/funcs';

type ListProps = {
    list: VariantInCart[];
};

const OrderListItems: FC<ListProps> = ({ list }) => {
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
                            justifyContent: 'space-between',
                        }}
                    >
                        <Image src={item.data.images[0].url} width={80} height={80} alt='product' />

                        <div className={styles.payment_card_info}>
                            <div className={styles.payment_name}>{item.name}</div>
                            <Typography variant='h6' sx={{ fontSize: '14px' }}>
                                {item.data.attributes.map((attr, index) => {
                                    let str = '';
                                    const unit = attr.u ?? '';
                                    const separate = index !== 0 ? ' - ' : ('' as string);
                                    str += separate + upperCase(attr.v) + unit;
                                    return str;
                                })}
                            </Typography>
                            <div className={styles.payment_price}>
                                <div className={styles.payment_price_new}>
                                    {currencyFormat(item.data.price.special * item.quantity)}
                                </div>
                                <div className={styles.payment_price_old}>
                                    {currencyFormat(item.data.price.base * item.quantity)}
                                </div>
                            </div>
                        </div>
                    </Box>

                    <Box>
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

export default OrderListItems;
