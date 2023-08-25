
import React, { useState } from "react";
import styles from '../../../styles/components/productdetail.module.scss';

export const SalientFeatures = () => {
    const [collapse, setCollapse] = useState(false);

    return(
        <><div className={styles.card_content_left}>
        <div className={styles.card_title_left}>
            <h4>Đặc điểm nổi bật của iPhone 14 Pro Max</h4>
        </div>
        <div className={styles.card_head_left}>
            <ul>
                <div className={styles.card_head_title}>
                    <span></span>
                    <li>
                        Màn hình Dynamic Island - Sự biến mất của màn hình tai
                        thỏ thay thế bằng thiết kế viên thuốc, OLED 6,7 inch, hỗ
                        trợ always-on display
                    </li>
                </div>
                <div className={styles.card_head_title}>
                    <span></span>
                    <li>
                        Cấu hình iPhone 14 Pro Max mạnh mẽ, hiệu năng cực khủng
                        từ chipset A16 Bionic
                    </li>
                </div>

                <div className={styles.card_head_title}>
                    <span></span>
                    <li>
                        Làm chủ công nghệ nhiếp ảnh - Camera sau 48MP, cảm biến
                        TOF sống động
                    </li>
                </div>

                <div className={styles.card_head_title}>
                    <span></span>
                    <li>
                        Pin liền lithium-ion kết hợp cùng công nghệ sạc nhanh
                        cải tiến
                    </li>
                </div>
            </ul>
        </div>
        <div className={styles.card_body_left}>
            <div
                className={`${styles.card_body_title} ${
                    collapse ? `${styles.expanded}` : ''
                }`}
            >
                iPhone 14 Pro Max sở hữu thiết kế màn hình Dynamic Island ấn
                tượng cùng màn hình OLED 6,7 inch hỗ trợ always-on display và
                hiệu năng vượt trội với chip A16 Bionic. Bên cạnh đó máy còn sở
                hữu nhiều nâng cấp về camera với cụm camera sau 48MP, camera
                trước 12MP dùng bộ nhớ RAM 6G đa nhiệm vượt trội. iPhone 14 Pro
                Max sở hữu thiết kế màn hình Dynamic Island ấn tượng cùng màn
                hình OLED 6,7 inch hỗ trợ always-on display và hiệu năng vượt
                trội với chip A16 Bionic. Bên cạnh đó máy còn sở hữu nhiều nâng
                cấp về camera với cụm camera sau 48MP, camera trước 12MP dùng bộ
                nhớ RAM 6G đa nhiệm vượt trội.

                iPhone 14 Pro Max sở hữu thiết kế màn hình Dynamic Island ấn
                tượng cùng màn hình OLED 6,7 inch hỗ trợ always-on display và
                hiệu năng vượt trội với chip A16 Bionic. Bên cạnh đó máy còn sở
                hữu nhiều nâng cấp về camera với cụm camera sau 48MP, camera
                trước 12MP dùng bộ nhớ RAM 6G đa nhiệm vượt trội. iPhone 14 Pro
                Max sở hữu thiết kế màn hình Dynamic Island ấn tượng cùng màn
                hình OLED 6,7 inch hỗ trợ always-on display và hiệu năng vượt
                trội với chip A16 Bionic. Bên cạnh đó máy còn sở hữu nhiều nâng
                cấp về camera với cụm camera sau 48MP, camera trước 12MP dùng bộ
                nhớ RAM 6G đa nhiệm vượt trội.

            </div>

            <div className={styles.card_btn}>
                <button onClick={() => setCollapse((prev) => !prev) }>
                   Xem Thêm 
                </button>
            </div>
        </div>
    </div></>
    )
}