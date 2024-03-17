import React, { Suspense, lazy } from 'react';

import { getProductsCustom } from 'utils/get-products';

import { ProductSearchingStatus } from '@/interfaces/product';

import { ProductsSkeleton } from '@/components/Common/Products/Products';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatProductLabel, getMessage } from '@/utils/funcs';
import { ProductModel } from '@/models/Product';

const ResultsSection = lazy(() => import('@/components/Common/Searching/ResultsSection'));

export default async function SearchPage({
    searchParams,
}: Readonly<{ searchParams: { search?: string } }>) {
    const searchQuery = searchParams.search ?? '';

    const searchData = (await getProductsCustom(searchQuery)) as ProductSearchingStatus;

    const decodeKeyword = decodeURIComponent(searchQuery);

    const getDataLabels = (products: ProductModel[]) => {
        return products.map((product) => formatProductLabel(product));
    };

    return (
        <Box marginTop='24px'>
            <Container sx={{ maxWidth: '1320px !important' }}>
                <Stack spacing={3} alignItems='center' minHeight='60vh'>
                    <Suspense fallback={<ProductsSkeleton />}>
                        <Typography
                            variant='h3'
                            color='primary'
                            sx={{
                                fontSize: '18px',
                                fontWeight: 500,
                                '& span': {
                                    fontWeight: 700,
                                },
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: getMessage(
                                        searchData.messageStatusCode,
                                        decodeKeyword,
                                        searchData.data?.totalRecord,
                                    ),
                                }}
                            />
                        </Typography>
                        {searchData.data && (
                            <ResultsSection
                                currentData={getDataLabels(searchData.data.data)}
                                keyword={decodeKeyword}
                                totalPage={searchData.data.totalPage}
                            />
                        )}
                    </Suspense>
                </Stack>
            </Container>
        </Box>
    );
}
