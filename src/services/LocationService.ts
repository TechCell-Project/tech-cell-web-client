import { LOCATION_PROVINCES_ENDPOINT } from '@constants/Services';
import { District, Province, Ward } from 'models/Location';
import instancePublic from '@config/instancePublic.config';
import { AddressApi } from '@TechCell-Project/tech-cell-server-node-sdk';

export const getProvincess = () => instancePublic.get<Array<Province>>(LOCATION_PROVINCES_ENDPOINT);
export const getDistricts = (province_id: string | undefined) =>
    instancePublic.get<Array<District>>(`/address/districts/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    instancePublic.get<Array<Ward>>(`/address/wards/${district_id}`);

const addressApi = new AddressApi(undefined, undefined, instancePublic);
export function getProvinces() {
    return addressApi.getProvinces();
}
