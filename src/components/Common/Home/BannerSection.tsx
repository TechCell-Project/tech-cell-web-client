import React from 'react';
import styles from '@styles/components/banner.module.scss';
import Link from 'next/link';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { RootPath } from '@constants/enum';
import Image from 'next/image';
import AppleBg from '@public/banner/apple-bg.jpg';
import ProductBg from '@public/banner/product-bg.jpg';
import SamsungBg from '@public/banner/samsung-bg.jpg';

const BannerSection = () => {
    return (
        <section className={styles.home_banner}>
            <div className={styles.home_banner_left}>
                <Image src={AppleBg} alt='apple banner' fill={true} placeholder='blur' />
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
                <div>
                    <Image src={SamsungBg} alt='samsung banner' fill={true} placeholder='blur' />
                    <div className={styles.home_banner_right_content}>
                        <span>SAMSUNG</span>
                        <h4>
                            Tưng bừng lễ hội <br /> nhập hội galaxy tab series
                        </h4>
                        <Link href={RootPath.ProductList}>
                            Khám phá ngay <EastRoundedIcon fontSize='small' />
                        </Link>
                    </div>
                </div>
                <div>
                    <Image src={ProductBg} alt='product banner' fill={true} placeholder='blur' />
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
