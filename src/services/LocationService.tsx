import { LOCATION_PROVINCES_ENDPOINT } from '@constants/Services';
import { District, Province, Ward } from 'models/Location';
import instancePublic from '@config/instancePublic.config';

export const getProvinces = () => instancePublic.get<Array<Province>>(LOCATION_PROVINCES_ENDPOINT);
export const getDistricts = (province_id: string | undefined) =>
    instancePublic.get<Array<District>>(`/address/districts/${province_id}`);
export const getWards = (district_id: string | undefined) =>
    instancePublic.get<Array<Ward>>(`/address/wards/${district_id}`);
