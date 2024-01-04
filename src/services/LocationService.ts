import { GET_DISTRICTS_ENDPOINT, GET_PROVINCES_ENDPOINT, GET_WARDS_ENDPOINT } from '@constants/Services';
import { District, Province, Ward } from 'models/Location';
import instancePublic from '@config/instancePublic.config';
import { AddressApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const getProvincess = () => instancePublic.get<Array<Province>>(GET_PROVINCES_ENDPOINT);
export const getDistricts = (province_id: string | undefined) =>
    instancePublic.get<Array<District>>(`${GET_DISTRICTS_ENDPOINT}/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    instancePublic.get<Array<Ward>>(`${GET_WARDS_ENDPOINT}/${district_id}`);

const addressApi = new AddressApi(undefined, undefined, instancePublic);
export function getProvinces() {
    return addressApi.getProvinces();
}
