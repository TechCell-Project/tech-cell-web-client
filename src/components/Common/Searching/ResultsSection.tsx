'use client';

import React, { ChangeEvent, FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/store';
import { useSkipFirstRender } from '@hooks/useSkipFirstRender';
import { getAllProduct } from '@store/slices/productSlice';

import { Paging } from '@models/Common';
import { ProductLabel } from '@interfaces/product';

import Box from '@mui/material/Box';
import SortingToolbarVSearch from './SortingToolbar-vSearch';
import { formatProductLabel } from 'utils';
import PaginationData from '../PaginationData/PaginationData';
import { LoadingSection } from '../Display/LoadingSection';

interface ResultsDataProps {
    currentData: ProductLabel[];
    keyword: string;
    totalPage: number;
}

const ResultsSection: FC<ResultsDataProps> = ({ currentData, keyword, totalPage }) => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector((state) => state.product);

    const [searchProduct, setSearchProduct] = useState<Paging>({ ...new Paging(), keyword });
    const [currentProducts, setCurrentProducts] = useState<ProductLabel[]>(currentData);

    useSkipFirstRender(() => {
        dispatch(getAllProduct(searchProduct));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchProduct]);

    useSkipFirstRender(() => {
        const formatProducts = products.data.map((product) => formatProductLabel(product));

        setCurrentProducts(formatProducts);
    }, [products]);

    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        setSearchProduct({
            ...searchProduct,
            page: page - 1,
            keyword,
        });
    };

    return (
        <>
            {isLoading ? (
                <LoadingSection isLoading={isLoading} />
            ) : (
                <>
                    <Box sx={{ width: '100%' }}>
                        <SortingToolbarVSearch />
                    </Box>
                    <PaginationData
                        initialData={currentProducts}
                        pagingData={{ page: searchProduct.page, totalPage }}
                        handleChange={handleChange}
                    />
                </>
            )}
        </>
    );
};

export default ResultsSection;
