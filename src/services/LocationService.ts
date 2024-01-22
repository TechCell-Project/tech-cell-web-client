import {
    GET_PROVINCES_ENDPOINT,
    GET_DISTRICTS_ENDPOINT,
    GET_WARDS_ENDPOINT,
} from '@constants/Services';
import { District, Province, Ward } from 'models/Location';
import { axiosPublic } from '@libs/axios';
import { AddressApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const addressApi = new AddressApi(undefined, undefined, axiosPublic);

export const getProvinces = () => axiosPublic.get<Array<Province>>(GET_PROVINCES_ENDPOINT);
export const getDistricts = (province_id: string | undefined) =>
    axiosPublic.get<Array<District>>(`${GET_DISTRICTS_ENDPOINT}/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    axiosPublic.get<Array<Ward>>(`${GET_WARDS_ENDPOINT}/${district_id}`);
