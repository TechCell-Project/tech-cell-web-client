import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT, ADDRESS_PROVINCES } from '@constants/Services';
import { District, Province, Ward } from 'models/Location';

const instance: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProvinces = () => instance.get<Array<Province>>(ADDRESS_PROVINCES);
export const getDistricts = (province_id: string | undefined) =>
    instance.get<Array<District>>(`/address/districts/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    instance.get<Array<Ward>>(`/address/wards/${district_id}`);
