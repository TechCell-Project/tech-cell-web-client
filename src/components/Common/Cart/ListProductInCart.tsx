import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from '@styles/components/cart.module.scss';
import stylescrolling from '@styles/components/productattached.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Image from 'next/image';
import { red } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductAttachedScrolling from '../Products/ProductAttachedScrolling';
import { Box } from '@mui/material';

export default function ListProductInCart() {
    const [checked, setChecked] = useState([true, false]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        let IsSelected = event.target.value;
        if (IsSelected) {
        }
    };
    const [quantity, setQuantity] = useState(1);
    const handleUpQuantity = () => {
        if (quantity < 10) {
            setQuantity((prevCount) => prevCount + 1);
        }
    };
    const handleDownQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevCount) => prevCount - 1);
        }
    };

    return (
        <>
            <div className={styles.block_product}>
                <div className={styles.cart_header}>
                    <div className={styles.go_to_back}>
                        <ArrowBackIcon />
                    </div>
                    <div className={styles.title}>Giỏ hàng của bạn</div>
                </div>
                {/* Chon tat ca */}
                <div className={styles.cart_checkbox}>
                    <FormControlLabel
                        label="Chọn tất cả"
                        control={
                            <Checkbox
                                defaultChecked
                                checked={checked[0] && checked[1]}
                                onChange={handleChange1}
                                sx={{
                                    color: red[800],
                                    '&.Mui-checked': {
                                        color: red[600],
                                    },
                                }}
                            />
                        }
                    />
                </div>
                {/* Danh sach san pham */}
                <div className={styles.cart_body}>
                    <div className={styles.body_content}>
                        <div className={styles.cart_content}>
                            <div className={styles.product_cart}>
                                <div className={styles.product_cart_check}>
                                    <Checkbox
                                        defaultChecked
                                        checked={checked[1]}
                                        onChange={handleChange2}
                                        sx={{
                                            color: red[800],
                                            '&.Mui-checked': {
                                                color: red[600],
                                            },
                                        }}
                                    />
                                </div>
                                <div className={styles.product_cart_img}>
                                    <Image
                                        src="/img_productDetail/ip14_2.webp"
                                        width={80}
                                        height={80}
                                        alt="product"
                                    />
                                </div>
                                <div className={styles.product_info}>
                                    <div className={styles.product_text}>
                                        <div className={styles.product_heading}>Iphone 14</div>
                                        <div className={styles.product_price}>
                                            <div className={styles.product_price_new}>
                                                26.690.000đ
                                            </div>
                                            <div className={styles.product_price_old}>
                                                <span>32.990.000đ</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.product_quanity}>
                                        <button
                                            className={styles.product_quanity_btn}
                                            onClick={handleDownQuantity}
                                        >
                                            -
                                        </button>
                                        <div className={styles.product_quanity_number}>
                                            {quantity}
                                        </div>
                                        <button
                                            className={styles.product_quanity_btn}
                                            onClick={handleUpQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.product_cart_delete}>
                                    <DeleteIcon />
                                </div>
                            </div>
                            {/* ))} */}
                        </div>

                        <div className={styles.cart_promotions}>
                            <div className={styles.cart_promotion_header}>
                                <div className={styles.cart_promotion_icon}>
                                    <ShoppingBagIcon />
                                </div>
                                <div className={styles.cart_promotion_text}>
                                    Chương trình khuyến mãi
                                </div>
                            </div>
                            <ul className={styles.cart_promotion_list}>
                                <span></span>
                                <li>
                                    Mua Office Home & Student 2021 kèm Macbook chỉ còn 2,090,000
                                </li>
                            </ul>
                        </div>

                        <div className={styles.cart_buy_savings}>
                            <div className={styles.cart_buy_header}>
                                <div className={styles.cart_buy_header_icon}>
                                    <ShoppingBagIcon />
                                </div>
                                <div className={styles.cart_buy_header_text}>
                                    Mua kèm tiết kiệm hơn
                                </div>
                            </div>
                            <Box sx={{display:'flex'}}>
                                <ProductAttachedScrolling
                                    className={stylescrolling.list_products.toString()}
                                />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
