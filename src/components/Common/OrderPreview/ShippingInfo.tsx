import React, { FC } from 'react';

import styles from '@styles/components/payment.module.scss';
import { Address } from '@models/Account';
import { buildAddressString } from 'utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddressSchemaDTO } from '@TechCell-Project/tech-cell-server-node-sdk';
import { OrderListTitle } from './OrderList';

type InfoProps = {
    address: Address;
    email: string;
};

const ShippingInfo: FC<InfoProps> = ({ address, email }) => {
    return (
        <Box>
            <div className={styles.address_main}>
                <div className={styles.address_block}>
                    <OrderListTitle>
                        <Typography variant='subtitle1' fontSize='14px'>
                            Thông tin nhận hàng
                        </Typography>
                    </OrderListTitle>
                    <div className={styles.address_item}>
                        <div className={styles.address_title}>Khách hàng</div>
                        <div className={styles.address_value}>{address.customerName}</div>
                    </div>

                    <div className={styles.address_item}>
                        <div className={styles.address_title}>Số điện thoại</div>
                        <div className={styles.address_value}>{address.phoneNumbers}</div>
                    </div>

                    <div className={styles.address_item}>
                        <div className={styles.address_title}>Email</div>
                        <div className={styles.address_value}>{email}</div>
                    </div>

                    <div className={styles.address_item}>
                        <div className={styles.address_title}>Nhận hàng tại</div>
                        <div className={styles.address_value}>
                            {buildAddressString(address as unknown as AddressSchemaDTO)}
                        </div>
                    </div>

                    <div className={styles.address_item}>
                        <div className={styles.address_title}>Ghi chú</div>
                        <div className={styles.address_value}>{address.detail}</div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ShippingInfo;
