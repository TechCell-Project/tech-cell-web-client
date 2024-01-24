'use client';
import Image from 'next/image';
import styles from '../../../styles/components/orderHistory.module.scss';
import { useProfile } from '@hooks/useProfile';
import TableOrderList from '@/components/Common/OrderPreview/TableOrderList';

const PurchaseHistory = () => {
    const { profile: user } = useProfile();
    return (
        <div className={styles.content_purchase_history}>
            <div className={styles.block_user_name}>
                <div className={styles.avatar_purchase_history}>
                    <Image src={'/img_profile/info.webp'} width={50} height={50} alt='' />
                </div>
                <div
                    className={styles.text_purchase_history}
                >{`${user?.firstName} ${user?.lastName}`}</div>
            </div>

            {/* Block homepage menu */}
            <div className={styles.block_hompage_menu}>
                <div className={styles.block_item_left}>
                    <p className={styles.item_left_number}>0</p>
                    <p className={styles.item_left_text}>đơn hàng</p>
                </div>
                <div className={styles.block_item_right}>
                    <p className={styles.item_right_number}>0đ</p>
                    <p className={styles.item_right_text}>Tổng tiền</p>
                </div>
            </div>

            {/* Block order */}
            <div className={styles.block_order}>
                <div className={styles.order_date}>
                    {/* <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} /> */}
                </div>

                <div className={styles.order_button}>
                    <div className={styles.list_button}>
                        <div className={styles.item_button}>Tất cả</div>
                        <div className={styles.item_button}>Chờ xác nhận</div>
                        <div className={styles.item_button}>Đã xác nhận</div>
                        <div className={styles.item_button}>Đang vận chuyển</div>
                        <div className={styles.item_button}>Đã giao hàng</div>
                        <div className={styles.item_button}>Đã hủy</div>
                    </div>
                </div>

                <div className={styles.list_order}>
                    {/* Có sản phẩm */}
                    <div className={styles.order}>
                        <TableOrderList />
                    </div>
                    {/* Không có sản phẩm */}
                    {/* <div className={styles.no_order}>
                            <div className={styles.no_order_img}>
                                <Image
                                    src={'/img_profile/Order-empty.webp'}
                                    width={208}
                                    height={150}
                                    alt=''
                                />
                            </div>
                            <div className={styles.text_no_order}>
                                Không có đơn hàng nào thỏa mãn
                            </div>
                        </div> */}
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
