'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from 'styles/components/footer.module.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const links = [
    {
        title: 'Dịch vụ',
        children: [
            { title: 'Quy chế hoạt động', href: '' },
            { title: 'Ưu đãi thanh toán', href: '' },
            { title: 'Bảo hành điện thoại', href: '' },
            { title: 'Bảo hành mở rộng', href: '' },
            { title: 'Chính sách bảo hành', href: '' },
        ],
    },
    {
        title: 'Sản phẩm',
        children: [
            { title: 'Smart Phone', href: '' },
            { title: 'Phụ kiện', href: '' },
        ],
    },
    {
        title: 'Liên hệ',
        children: [
            { title: 'Mail: teams@techcell.cloud', href: '' },
            { title: 'Hotline: 0019 8942', href: '' },
        ],
    },
];

const socialsIcon = [FacebookIcon, GitHubIcon, LinkedInIcon];

export const FooterClient = () => {
    return (
        <Box component='footer' sx={{ marginTop: '45px', width: '100%' }}>
            <Container sx={{ maxWidth: '1320px !important' }}>
                <Grid container spacing={10}>
                    <Grid item md={6}>
                        <Box width='150px' mb={3}>
                            <Image
                                src='/logo-red.png' alt=''
                                width={0}
                                height={0}
                                sizes='100vw'
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                        <Typography fontSize='13px' fontWeight={500} sx={{ opacity: 0.9 }}>Tận hưởng Cuộc Sống Kỹ Thuật
                            Số với Techcell -
                            Nơi Nâng Tầm Trải Nghiệm Điện Thoại.
                            Sự hoàn hảo gặp gỡ thiết kế đẳng cấp, để mỗi cuộc gọi, mỗi cử chỉ đều trở thành một trải
                            nghiệm không thể quên.
                            Khám phá ngay với Techcell - Nơi Thăng Hoa Công Nghệ!</Typography>
                        <Stack direction='row' gap={3} mt={4}>
                            {socialsIcon.map((Icon, i) => (
                                <IconButton key={i} sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)', p: '8px' }}>
                                    <Icon />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>
                    {links.map(link => (
                        <Grid item md={2} key={link.title}>
                            <Typography fontSize='18px' fontWeight={600}>{link.title}</Typography>
                            <ul className={styles.footerLinks}>
                                {link.children.map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>

                <hr className={styles.footerDivider} />

                <Stack direction='row' alignItems='center' justifyContent='space-between' mb='25px'>
                    <Typography fontSize='14px'>© 2023, made with ❤️ by <b>Techcell Team</b></Typography>
                    <Stack direction='row' gap={5} sx={{
                        display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
                    }}>
                        <Link href='https://admin.techcell.cloud' target='_blank'
                              style={{ fontWeight: 600, fontSize: '14px' }}>Admin</Link>
                        <Link href='https://docs.techcell.cloud' target='_blank'
                              style={{ fontWeight: 600, fontSize: '14px' }}>Documentation</Link>
                        <Link href='mailto:teams@techcell.cloud'
                              style={{ fontWeight: 600, fontSize: '14px' }}>Contact</Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};