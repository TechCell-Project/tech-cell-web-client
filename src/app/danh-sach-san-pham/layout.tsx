import { BrandScrolling } from '@/components/Common/Products/BrandScrolling';
import { BreadCrumbs } from '@/components/Common/Products/BreadCrumbs';
import CategorySelect from '@/components/Common/Products/CategorySelect';
import SortingToolbar from '@/components/Common/Products/SortingToolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import styles from '@styles/components/brands.module.scss';

export default function ProductsPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <BreadCrumbs />
            <Box sx={{ marginTop: '20px' }}>
                <Container sx={{ maxWidth: '1320px !important' }}>
                    <Box className='flex flex-col w-full' sx={{ paddingBottom: '20px' }}>
                        <Box sx={{ overflowX: 'auto' }}>
                            <BrandScrolling className={styles.list_brands.toString()} />
                            <CategorySelect />
                            <SortingToolbar className={styles.list_brands.toString()} />
                        </Box>
                        {children}
                    </Box>
                </Container>
            </Box>
        </>
    );
}
