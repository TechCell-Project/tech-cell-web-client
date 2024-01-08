import { LOCATION_PROVINCES_ENDPOINT } from '@constants/Services';
import { District, Province, Ward } from 'models/Location';
import { axiosPublic } from '@libs/axios';
import { AddressApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const addressApi = new AddressApi(undefined, undefined, axiosPublic);

export const getProvinces = () => axiosPublic.get<Array<Province>>(LOCATION_PROVINCES_ENDPOINT);
export const getDistricts = (province_id: string | undefined) =>
    axiosPublic.get<Array<District>>(`/address/districts/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    axiosPublic.get<Array<Ward>>(`/address/wards/${district_id}`);
