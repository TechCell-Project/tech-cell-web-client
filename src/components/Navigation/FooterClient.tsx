'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from 'styles/components/footer.module.scss';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AppStore from '@public/images/app-store.png';
import GooglePlay from '@public/images/google-play.png';
import SocialMedia1 from '@public/images/social-1.png';
import SocialMedia2 from '@public/images/social-2.png';
import SocialMedia4 from '@public/images/social-4.png';

const IconContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& p': {
        fontSize: '14px',
    },
}));

const Icon = styled(Box)(({ theme }) => ({
    width: 32,
    height: 32,
    display: 'flex',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#777777',
    marginRight: theme.spacing(2),
    flex: '0 0 32px',
}));

export const FooterClient = () => {
    return (
        <Box component="footer" sx={{ position: 'absolute',backgroundColor: '#eaeaea', paddingTop: '20px', width: '100%', }}>
            <Container maxWidth="lg">
                <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={3}
                    sx={{
                        width: { xs: '390px', lg: '1200px', sm: '768px', md: '960px' },
                        // marginTop: '30px',
                    }}
                >
                    <Grid item xs={12} lg={3} sm={6}>
                        <div className={styles.footerContent}>
                            <h4>Liên hệ với chúng tôi</h4>
                            <Stack spacing={1.5}>
                                <IconContainer>
                                    <Icon>
                                        <LocationOnIcon />
                                    </Icon>
                                    <Box>
                                        <p>Hno: 18 Tam Trinh Hoang Mai, Ha Noi</p>
                                    </Box>
                                </IconContainer>
                                <IconContainer>
                                    <Icon>
                                        <MailIcon />
                                    </Icon>
                                    <p>techcellVTC@gmail.com</p>
                                </IconContainer>
                                <IconContainer>
                                    <Icon>
                                        <PhoneAndroidIcon />
                                    </Icon>
                                    <p>
                                        Phone 1 : 0123456789
                                        <br />
                                        Phone 2 : 0987654321
                                    </p>
                                </IconContainer>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                        <div className={styles.footerContent}>
                            <h4>Thanh toán & Giao hàng</h4>
                            <ul>
                                <li>
                                    <Link href="/">Điều khoản dịch vụ</Link>
                                </li>
                                <li>
                                    <Link href="/">Phương thức thanh toán</Link>
                                </li>
                                <li>
                                    <Link href="/">Hướng dẫn đổi trả hàng</Link>
                                </li>
                                <li>
                                    <Link href="/">Chính sách giao hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                        <div className={styles.footerContent}>
                            <h4>Liên kết nhanh</h4>
                            <ul>
                                <li>
                                    <Link href="/">iphone</Link>
                                </li>
                                <li>
                                    <Link href="/">Tai nghe</Link>
                                </li>
                                <li>
                                    <Link href="/">Cáp sạc</Link>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                        <div className={styles.footerLogo}>
                            <Stack spacing={2} alignItems="center" justifyContent="center">
                                <Image
                                    src="/logo-red.png"
                                    alt="Logo Techcell"
                                    width={150}
                                    height={50}
                                />
                                <Link href="/">
                                    <Image src={GooglePlay} alt="Download platforms" height={50} />
                                </Link>
                                <Link href="/">
                                    <Image src={AppStore} alt="Download platforms" height={50} />
                                </Link>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
                <hr className={styles.footerDivider} />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '50px',
                    }}
                >
                    <span>
                        © TechCell Team VTC, 2023 - <b>Privacy Policy</b>
                    </span>
                    <Stack direction="row" spacing={2}>
                        <Link href="/">
                            <Image src={SocialMedia1} alt="facebook" height={32} />
                        </Link>
                        <Link href="/">
                            <Image src={SocialMedia2} alt="instagram" height={32} />
                        </Link>
                        <Link href="/">
                            <Image src={SocialMedia4} alt="youtube" height={32} />
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};