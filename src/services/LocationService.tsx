import { rejects } from 'assert';
import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@constants/Services';
import { District, Province, Ward,Location } from 'models/Location';
import { ADDRESS_PROVICES } from '@constants/Services';
import { useAxiosAuth } from '@hooks/useAxios';

const instance: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// export const addAddress = (values:Location) =>{
//     const axiosAuth = useAxiosAuth();
//     return axiosAuth.patch('/profile/address', values);
// }


export const getProvinces = () => instance.get<Array<Province>>(ADDRESS_PROVICES);
export const getDistricts = (province_id: string | undefined) =>
    instance.get<Array<District>>(`/address/districts/${province_id}`);
export const getWards = (distric_id: string | undefined) =>
    instance.get<Array<Ward>>(`/address/wards/${distric_id}`);
