'use client';

import {
    CarouselComponent,
    BrandCategoryCompoment,
    PromotionComponent,
    ShopServicesComponent,
} from 'components/Form';
import {
    Box,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
    styled,
    useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { API_ENDPOINT } from '@constants/Services';

const StyledListItemButton = styled(ListItemButton)(() => ({
    '&.Mui-selected': {
        backgroundColor: 'white',
        color: 'black',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'white',
    },
    ':hover': {
        backgroundColor: 'white',
        color: 'black',
    },
}));

export default function Home() {
    const theme = useTheme();
    const [selectedTag, setSelectedTag] = useState('latest');

    const handleTagSelect = (event: MouseEvent<Element, globalThis.MouseEvent>, tag: string) => {
        setSelectedTag(tag);
    };

    return (
        <>
            <CarouselComponent />
            <ShopServicesComponent />

            <Stack spacing={3}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            margin: '20px 0px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Stack spacing={0} sx={{ alignItems: 'center' }}>
                            <List
                                component="a"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: theme.color.gray,
                                    textTransform: 'uppercase',
                                }}
                            >
                                <StyledListItemButton
                                    selected={selectedTag === 'latest'}
                                    onClick={(event) => handleTagSelect(event, 'latest')}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                            >
                                                Sản phẩm mới nhất
                                            </Typography>
                                        }
                                    />
                                </StyledListItemButton>
                                <Divider
                                    flexItem
                                    orientation="vertical"
                                    sx={{ mx: 0.5, my: 1, width: '1px' }}
                                />
                                <StyledListItemButton
                                    selected={selectedTag === 'best-selling'}
                                    onClick={(event) => handleTagSelect(event, 'best-selling')}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                            >
                                                Bán chạy nhất
                                            </Typography>
                                        }
                                    />
                                </StyledListItemButton>
                                <Divider
                                    flexItem
                                    orientation="vertical"
                                    sx={{ mx: 0.5, my: 1, width: '1px' }}
                                />
                                <StyledListItemButton
                                    selected={selectedTag === 'featured'}
                                    onClick={(event) => handleTagSelect(event, 'featured')}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 'bold', fontSize: '16px' }}
                                            >
                                                Sản phẩm nổi bật
                                            </Typography>
                                        }
                                    />
                                </StyledListItemButton>
                                <Divider
                                    flexItem
                                    orientation="vertical"
                                    sx={{ mx: 0.5, my: 1, width: '1px' }}
                                />
                            </List>
                            <Divider
                                component="div"
                                sx={{
                                    width: '100%',
                                    height: '2px',
                                    marginTop: 0,
                                    background: `linear-gradient(to right, lightGray, ${theme.color.gray} , ${theme.color.red}, ${theme.color.gray}, lightGray)`,
                                }}
                            />
                            <PromotionComponent />
                        </Stack>
                    </Box>
                </Container>
            </Stack>
            <BrandCategoryCompoment />
            <Box sx={{ margin: '0px auto', maxWidth: '1200px' }}>
                <Box sx={{ maxWidth: { lg: '100%', xs: '100%' } }}>
                    <Image
                        src="/background_img/2.webp"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                        alt="img1"
                    />
                </Box>
            </Box>
            <Stack spacing={3} marginTop='20px'>
                <Container maxWidth='lg'>
                    <Box
                        sx={{
                            marginBottom: '15px',
                            color: '#ee4949',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <LocalMallIcon sx={{ display: 'inline-block' }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { sm: '22px', xs: '18px' },
                                display: 'inline-block',
                                marginLeft: '15px',
                                fontWeight: 500,
                            }}
                        >
                            Khuyến Mãi HOT
                        </Typography>
                    </Box>
                    <PromotionComponent />
                </Container>
            </Stack>
        </>
    );
}
