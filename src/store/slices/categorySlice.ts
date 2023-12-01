import { 
    CategoryModel,
    // CategoryData, 
    CategorySlice 
} from '@models/Category';
import { Paging, PagingResponse } from '@models/Common';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { getCategories, getCategoryByLabel } from '@services/index';

const initialState: CategorySlice = {
    categories: new PagingResponse<CategoryModel>(),
    category: null,
    isLoading: false,
    isLoadingDetails: false,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        isFetchingDetails: (state) => {
            state.isLoadingDetails = true;
        },
        getAllSuccess: (state, { payload }) => {
            state.categories = payload;
            state.isLoading = false;
        },
        getAllFailure: (state) => {
            state.categories = new PagingResponse<CategoryModel>();
            state.isLoading = false;
        },
        getDetailsSuccess: (state, { payload }) => {
            state.category = payload;
            state.isLoadingDetails = false;
        },
        getDetailsFailure: (state) => {
            state.category = null;
            state.isLoadingDetails = false;
        },
        fetchedDone: (state) => {
            state.isLoading = false;
        },
    },
});

// Thunk
export const getAllCategory = (payload: Paging) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const response = await getCategories(payload);
        if (response.data) {
            dispatch(getAllSuccess(response.data));
        }
    } catch (error) {
        dispatch(getAllFailure());
    }
};

export const getDetailsCategoryByLabel = (label: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetails());
    try {
        const response = await getCategoryByLabel(label);
        if (response.data) {
            dispatch(getDetailsSuccess(response.data));
        }
    } catch (error) {
        dispatch(getDetailsFailure());
    }
};

const { actions, reducer } = categorySlice;

export const {
    isFetching,
    isFetchingDetails,
    getDetailsFailure,
    getDetailsSuccess,
    fetchedDone,
    getAllSuccess,
    getAllFailure,
} = actions;
export default reducer;