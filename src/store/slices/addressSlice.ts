import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {
    GhnProvinceDTO,
    GhnDistrictDTO,
    GhnWardDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { addressApi } from '@services/LocationService';
import { createInitialValues, isStatusSuccess } from '@utils/shared.util';

export type AddressState = {
    addresses: {
        provinces?: GhnProvinceDTO[];
        districts?: Record<string, GhnDistrictDTO[]>;
        wards?: Record<string, GhnWardDTO[]>;
    };
    status: 'loading' | 'success' | 'error' | 'idle';
};

const initialState: AddressState = {
    addresses: {
        provinces: createInitialValues<GhnProvinceDTO[]>(),
        districts: createInitialValues<Record<string, GhnDistrictDTO[]>>(),
        wards: createInitialValues<Record<string, GhnWardDTO[]>>(),
    },
    status: 'idle',
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setStatus: (state, { payload }: PayloadAction<Pick<AddressState, 'status'>>) => {
            state.status = payload.status;
        },
        setProvinces: (state, { payload }: PayloadAction<Pick<AddressState, 'addresses'>>) => {
            state.addresses.provinces = payload.addresses.provinces;
        },
        setDistricts: (
            state,
            { payload }: PayloadAction<{ districts: GhnDistrictDTO[]; provinceId: number }>,
        ) => {
            if (!state?.addresses?.districts) {
                state.addresses.districts = createInitialValues<Record<string, GhnDistrictDTO[]>>();
            }
            state.addresses.districts[payload.provinceId] = payload.districts;
        },
        setWards: (
            state,
            { payload }: PayloadAction<{ wards: GhnWardDTO[]; districtId: number }>,
        ) => {
            if (!state?.addresses?.wards) {
                state.addresses.wards = createInitialValues<Record<string, GhnWardDTO[]>>();
            }
            state.addresses.wards[payload.districtId] = payload.wards;
        },
    },
});

// Thunk
export const getProvinces = () => async (dispatch: Dispatch) => {
    dispatch(setStatus({ status: 'loading' }));
    try {
        const { data, status } = await addressApi.getProvinces();
        if (isStatusSuccess(status)) {
            dispatch(
                setProvinces({
                    addresses: {
                        provinces: data,
                    },
                }),
            );
            dispatch(setStatus({ status: 'success' }));
            return data;
        }
    } catch (error) {
        dispatch(setStatus({ status: 'error' }));
    }
};

export const getDistricts = (province_id: number) => async (dispatch: Dispatch) => {
    dispatch(setStatus({ status: 'loading' }));
    try {
        const { data, status } = await addressApi.getDistricts({
            provinceId: province_id,
        });
        if (isStatusSuccess(status)) {
            dispatch(
                setDistricts({
                    provinceId: province_id,
                    districts: data,
                }),
            );
            dispatch(setStatus({ status: 'success' }));
            return data;
        }
    } catch (error) {
        dispatch(setStatus({ status: 'error' }));
    }
};

export const getWards = (district_id: number) => async (dispatch: Dispatch) => {
    dispatch(setStatus({ status: 'loading' }));
    try {
        const { data, status } = await addressApi.getWards({
            districtId: district_id,
        });
        if (isStatusSuccess(status)) {
            dispatch(
                setWards({
                    districtId: district_id,
                    wards: data,
                }),
            );
            dispatch(setStatus({ status: 'success' }));
            return data;
        }
    } catch (error) {
        dispatch(setStatus({ status: 'error' }));
    }
};

const { actions, reducer } = addressSlice;
export const { setStatus, setProvinces, setDistricts, setWards } = actions;
export default reducer;
