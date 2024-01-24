'use client';

import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PriceModel } from '@models/Product';
import CardComponent from '@components/Form/CardComponent';
import styles from '@styles/components/product.module.scss';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { useRouter } from 'next/navigation';
import { RootPath } from '@constants/enum';

interface ProductsListProps {
    initialData: {
        id: string;
        name: string;
        category: string;
        price: PriceModel;
        image: string;
    }[];
}

const FeaturedSection: FC<ProductsListProps> = ({ initialData }) => {
    const router = useRouter();

    return (
        <>
            <Stack mt={4} mb={4} direction='row' justifyContent='space-between' alignItems='center'>
                <Typography fontWeight={600} sx={{ fontSize: { md: '24px', xs: '16px' } }}>
                    Sản phẩm nổi bật
                </Typography>
                <Typography
                    className={styles.see_more_btn}
                    onClick={() => router.push(RootPath.ProductList)}
                >
                    Xem thêm <KeyboardDoubleArrowRightRoundedIcon fontSize='small' />
                </Typography>
            </Stack>
            <Box className={styles.cards_wrapper}>
                {initialData.map((product) => (
                    <React.Fragment key={product.id}>
                        <CardComponent initialData={product} />
                    </React.Fragment>
                ))}
            </Box>
        </>
    );
};

export default FeaturedSection;
