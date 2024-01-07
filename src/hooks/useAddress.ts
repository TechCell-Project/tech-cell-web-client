import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { AddressState, getDistricts, getProvinces, getWards } from '@store/slices/addressSlice';
import { GhnDistrictDTO, GhnProvinceDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

type UseAddress = AddressState & {
    currentProvince: GhnProvinceDTO['province_id'];
    setCurrentProvince: React.Dispatch<React.SetStateAction<GhnProvinceDTO['province_id']>>;
    currentDistrict: GhnDistrictDTO['district_id'];
    setCurrentDistrict: React.Dispatch<React.SetStateAction<GhnDistrictDTO['district_id']>>;
};

export function useAddress(): UseAddress {
    const dispatch = useAppDispatch();
    const addressState = useAppSelector((state) => state.address);
    const [currentProvince, setCurrentProvince] = useState<GhnProvinceDTO['province_id']>(0);
    const [currentDistrict, setCurrentDistrict] = useState<GhnDistrictDTO['district_id']>(0);

    useEffect(() => {
        if (addressState.status === 'idle') {
            dispatch(getProvinces());
        }
    }, [dispatch, addressState.status]);

    useEffect(() => {
        if (currentProvince) {
            dispatch(getDistricts(currentProvince));
        }
    }, [dispatch, currentProvince]);

    useEffect(() => {
        if (currentDistrict) {
            dispatch(getWards(currentDistrict));
        }
    }, [dispatch, currentDistrict]);

    return {
        ...addressState,
        currentProvince,
        setCurrentProvince,
        currentDistrict,
        setCurrentDistrict,
    };
}
