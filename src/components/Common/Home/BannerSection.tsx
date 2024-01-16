import React from 'react';
import styles from '@styles/components/banner.module.scss';
import Link from 'next/link';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { RootPath } from '@constants/enum';

const BannerSection = () => {
    return (
        <section className={styles.home_banner}>
            <div
                className={styles.home_banner_left}
                style={{ backgroundImage: 'url("/banner/apple-bg.jpg")' }}
            >
                <div className={styles.home_banner_left_content}>
                    <span>Apple</span>
                    <h4>
                        Đặc quyền sinh viên <br /> giảm thêm 5% tối đa 300k
                    </h4>
                    <Link href={RootPath.ProductList}>
                        Khám phá ngay <EastRoundedIcon fontSize='small' />
                    </Link>
                </div>
            </div>
            <div className={styles.home_banner_right}>
                <div style={{ backgroundImage: 'url("/banner/samsung-bg.jpg")' }}>
                    <div className={styles.home_banner_right_content}>
                        <span>SAMSUNG</span>
                        <h4>
                            Tưng vừng lễ hội <br /> nhập hội galaxy tab series
                        </h4>
                        <Link href={RootPath.ProductList}>
                            Khám phá ngay <EastRoundedIcon fontSize='small' />
                        </Link>
                    </div>
                </div>
                <div style={{ backgroundImage: 'url("/banner/product-bg.jpg")' }}>
                    <div className={styles.home_banner_right_content}>
                        <span>Sản phẩm, Phụ kiện</span>
                        <h4>
                            Mua ngay, săn deal <br /> hời với Techcell
                        </h4>
                        <Link href={RootPath.ProductList}>
                            Khám phá ngay <EastRoundedIcon fontSize='small' />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
