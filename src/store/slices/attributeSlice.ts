import { createSlice, Dispatch } from '@reduxjs/toolkit';
import {
    AttributeModel,
    AttributeSlice,
    PagingAttribute,
    AttributeData,
} from '@models/Attribute';
import { getAttributes, getByIdAttribute } from '@services/AttributeService';

const initialState: AttributeSlice = {
    attributes: new AttributeData(),
    attribute: null,
    isLoading: false,
    isLoadingDetail: false,
};

export const attributeSlice = createSlice({
    name: 'attribute',
    initialState,
    reducers: {
        isFetching: (state) => {
            state.isLoading = true;
        },
        isFetchingDetail: (state) => {
            state.isLoadingDetail = true;
        },
        getAllSuccess: (state, { payload }) => {
            state.attributes = payload;
            state.isLoading = false;
        },
        getAllFailure: (state) => {
            state.attributes = new AttributeData();
            state.isLoading = false;
        },
        getDetailsSuccess: (state, { payload }: { payload: AttributeModel }) => {
            state.attribute = payload;
            state.isLoadingDetail = false;
        },
        getDetailsFailure: (state) => {
            state.attribute = null;
            state.isLoadingDetail = false;
        },
        fetchedDone: (state) => {
            state.isLoading = false;
        },
    },
});

// Thunk
export const getAllAttributes = (payload: PagingAttribute) => async (dispatch: Dispatch) => {
    dispatch(isFetching());
    try {
        const response = await getAttributes(payload);
        if (response.data) {
            dispatch(getAllSuccess(response.data));
        }
    } catch (error) {
        dispatch(getAllFailure());
    }
};

export const getDetailAttributeById = (id: string) => async (dispatch: Dispatch) => {
    dispatch(isFetchingDetail());
    try {
        const response = await getByIdAttribute(id);
        if (response.data) {
            dispatch(getDetailsSuccess(response.data));
        }
    } catch (error) {
        dispatch(getDetailsFailure());
    }
};

const { actions, reducer } = attributeSlice;

export const {
    isFetching,
    isFetchingDetail,
    getAllFailure,
    getAllSuccess,
    getDetailsFailure,
    getDetailsSuccess,
    fetchedDone,
} = actions;
export default reducer;
