'use client';

import React from 'react';
import styles from 'styles/components/footer.module.scss';
import { Stack, Chip, useTheme, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Image from 'next/image';
import AppStore from '../../../public/images/app-store.png';
import GooglePlay from "../../../public/images/google-play.png"
import SocialMedia1 from "../../../public/images/social-1.png"
import SocialMedia2 from "../../../public/images/social-2.png"
import SocialMedia4 from "../../../public/images/social-4.png"
import Link from 'next/link';

const FooterClient = () => {
    const { color } = useTheme();
    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerContent}>
                    <h4>Thanh toán & Giao hàng</h4>
                    <ul>
                        <li><Link href="/">Điều khoản dịch vụ</Link></li>
                        <li><Link href="/">Phương thức thanh toán</Link></li>
                        <li><Link href="/">Hướng dẫn đổi trả hàng</Link></li>
                        <li><Link href="/">Chính sách giao hàng</Link></li>
                    </ul>
                </div>
                <div className={styles.footerContent}>
                    <h4>Liên kết nhanh</h4>
                    <ul>
                        <li><Link href="/">iphone</Link></li>
                        <li><Link href="/">Tai nghe</Link></li>
                        <li><Link href="/">Cáp sạc</Link></li>
                        {/* <li><Link href="/">Điều khoản dịch vụ</Link></li> */}
                    </ul>
                </div>
                <div className={styles.footerContent}>
                    <h4>Liên hệ với chúng tôi</h4>
                    <div className={styles.footerContact}>
                        <div className={styles.contactSymbol}>
                            <LocationOnIcon style={{padding: "2px"}} />
                        </div>
                        <p>
                            Hno: 18 Tam Trinh Hoang Mai, Ha Noi <br />
                            Pincode: 100000
                        </p>
                    </div>
                    <div className={styles.footerContact}>
                        <div className={styles.contactSymbol}>
                            <MailIcon style={{padding: "2px"}} />
                        </div>
                        <p>techcellVTC@gmail.com</p>
                    </div>
                    <div className={styles.footerContact}>
                        <div className={styles.contactSymbol}>
                            <PhoneAndroidIcon style={{padding: "2px"}} />
                        </div>
                        <p>
                            Phone 1 : 0123456789<br/>
                            Phone 2 : 0987654321
                        </p>
                    </div>
                </div>
                <div className={styles.footerLogo}>
                    <Stack>
                        <Image src="/logo-red.png" alt="Logo Techcell" width={150} height={50} />
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                        <Link href="/">
                            <Image src={GooglePlay} alt="Download platforms" height={50} />
                        </Link>
                    </Stack>
                    <Stack direction="row" gap={2} alignItems="center">
                        <Link href="/">
                            <Image src={AppStore} alt="Download platforms" height={50} />
                        </Link>
                    </Stack>
                </div>
            </div>
            <hr className={styles.footerDivider} />
            <div className={styles.footerBottom}>
                <span>
                    © TechCell Team VTC, 2023 - <b>Privacy Policy</b>
                </span>
                <Stack direction="row" gap={2}>
                    <Link href="/">
                        <Image src={SocialMedia1} alt="facebook" height={30}/>
                    </Link>
                    <Link href="/">
                        <Image src={SocialMedia2} alt="instagram" height={30}/>
                    </Link>
                    <Link href="/">
                        <Image src={SocialMedia4} alt="youtube" height={30}/>
                    </Link>
                </Stack>
            </div>
        </div>
    );
};

export default FooterClient;
