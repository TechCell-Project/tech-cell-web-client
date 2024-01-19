import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { AddressState, getDistricts, getProvinces, getWards } from '@store/slices/addressSlice';
import {
    GhnDistrictDTO,
    GhnProvinceDTO,
    UserMntResponseDTO,
} from '@TechCell-Project/tech-cell-server-node-sdk';
import { sleep } from '@utils/shared.util';

export type UseAddress = AddressState & {
    preLoadAddressDataFromUser: (user: UserMntResponseDTO['address']) => Promise<void>;
    currentProvince: GhnProvinceDTO['province_id'];
    setCurrentProvince: React.Dispatch<React.SetStateAction<GhnProvinceDTO['province_id']>>;
    currentDistrict: GhnDistrictDTO['district_id'];
    setCurrentDistrict: React.Dispatch<React.SetStateAction<GhnDistrictDTO['district_id']>>;
};

export const INIT_CURRENT_DISTRICT = 0;
export const RESET_PROVINCE = -1;
export const RESET_DISTRICT = -1;

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
        if (currentProvince && !addressState?.addresses?.districts?.[currentProvince]) {
            dispatch(getDistricts(currentProvince));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentProvince]);

    useEffect(() => {
        if (currentDistrict && !addressState?.addresses?.wards?.[currentDistrict]) {
            dispatch(getWards(currentDistrict));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, currentDistrict]);

    const preLoadAddressDataFromUser = useCallback(
        async (userAddress: UserMntResponseDTO['address']) => {
            if (userAddress && userAddress.length > 0) {
                const uniqueProvinces = new Set<number>();
                const uniqueDistricts = new Set<number>();

                for (const address of userAddress) {
                    uniqueProvinces.add(address.provinceLevel.province_id);
                    uniqueDistricts.add(address.districtLevel.district_id);
                }

                for (const provinceId of Array.from(uniqueProvinces)) {
                    if (!addressState?.addresses?.districts?.[provinceId]) {
                        dispatch(getDistricts(provinceId));
                        await sleep(200);
                    }
                }

                for (const districtId of Array.from(uniqueDistricts)) {
                    if (!addressState?.addresses?.wards?.[districtId]) {
                        dispatch(getWards(districtId));
                        await sleep(200);
                    }
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch],
    );

    return {
        ...addressState,
        preLoadAddressDataFromUser,
        currentProvince,
        setCurrentProvince,
        currentDistrict,
        setCurrentDistrict,
    };
}
