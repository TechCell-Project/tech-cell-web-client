import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useOnClickOutside } from 'usehooks-ts';

import Popper, { PopperProps } from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { PulseLoader } from 'react-spinners';

import { ProductLabel } from '@interfaces/product';

import { useAppSelector } from '@store/store';

import { currencyFormat, formatProductLabel } from 'utils';
import Box from '@mui/material/Box';
import Image from 'next/image';

interface RecentSearchValueProps {
    onClose(): void;
    getHistoryKey(searched: string): void;
    recentSearches: string[];
    removeItem(searchTerm: string): void;
}

const CurrentSearches: FC<RecentSearchValueProps & PopperProps> = ({
    anchorEl,
    open,
    onClose,
    recentSearches,
    removeItem,
    getHistoryKey,
}) => {
    const router = useRouter();

    const paperRef = useRef<HTMLDivElement>(null);

    const [currentProducts, setCurrentProducts] = useState<ProductLabel[]>([]);

    const { products, isLoading } = useAppSelector((state) => state.product);

    useEffect(() => {
        const productLabels = formatProductLabel(products);

        setCurrentProducts(productLabels);
    }, [products, isLoading]);

    useOnClickOutside(paperRef, onClose);
    if (!anchorEl) return null;

    console.log(products);

    return (
        <Popper open={open} anchorEl={anchorEl} disablePortal placement="bottom-start">
            <Paper sx={{ width: '500px', marginTop: '5px' }} ref={paperRef}>
                <MenuList sx={{ padding: 0 }}>
                    {isLoading ? (
                        <MenuItem sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <PulseLoader
                                color="#ee4949"
                                cssOverride={{}}
                                margin={10}
                                size={10}
                                speedMultiplier={0.5}
                            />
                        </MenuItem>
                    ) : (
                        <>
                            {!recentSearches.length ? (
                                <></>
                            ) : (
                                <>
                                    <Paper
                                        sx={{
                                            padding: '0 10px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                            height: '40px',
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '16px',
                                            }}
                                        >
                                            Lịch sử tìm kiếm
                                        </Typography>
                                        <Button size='small' endIcon={<DeleteOutlineIcon />} sx={{ color: 'inherit'}}>
                                            Xóa tất cả
                                        </Button>
                                    </Paper>
                                    {recentSearches.map((searchTerm, i) => (
                                        <MenuItem
                                            divider
                                            key={i}
                                            sx={{ alignItems: 'center', padding: '0px 10px' }}
                                        >
                                            <ListItemIcon>
                                                <AccessTimeIcon />
                                            </ListItemIcon>
                                            <ListItemText onClick={() => getHistoryKey(searchTerm)}>
                                                {searchTerm}
                                            </ListItemText>
                                            <IconButton
                                                sx={{ backgroundColor: 'inherit !important' }}
                                                onClick={() => removeItem(searchTerm)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </MenuItem>
                                    ))}
                                    {currentProducts.length !== 0 && (
                                        <Paper
                                            sx={{
                                                padding: '0 10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: '40px',
                                            }}
                                        >
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Sản phẩm gợi ý
                                            </Typography>
                                        </Paper>
                                    )}
                                    {currentProducts.map((product) => (
                                        <MenuItem key={product.id} onClick={() => router.push(`/chi-tiet-san-pham/${product.id}`)}>
                                            <Stack spacing={2} direction="row">
                                                <Box>
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        height={64}
                                                        width={64}
                                                    />
                                                </Box>
                                                <Stack
                                                    sx={{
                                                        width: '100%',
                                                        paddingLeff: '10px',
                                                    }}
                                                    alignItems='flex-start'
                                                    justifyContent='center'
                                                    spacing={1}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        sx={{
                                                            fontWeight: '600',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                                        <Typography variant='h6' sx={{ fontWeight: 700, fontSize: '17px', color: '#ee4949' }}>
                                                            {currencyFormat(product.price.sale)}
                                                        </Typography>
                                                        <Typography variant='h6' sx={{ fontWeight: 500, fontSize: '14px', color: '#777777', textDecoration: 'line-through' }}>
                                                            {currencyFormat(product.price.base)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </MenuList>
            </Paper>
        </Popper>
    );
};

export default CurrentSearches;
