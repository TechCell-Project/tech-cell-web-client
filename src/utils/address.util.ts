import { Address } from '@models/Location';

export function getDefaultAddress(addresses: Address[]) {
    if (!Array.isArray(addresses)) {
        return null;
    }

    let result = addresses.find((a) => a?.isDefault);
    if (!result) {
        result = addresses[0];
    }
    return result;
}

export function buildAddressString(address: Address): string {
    let { detail, wardLevel, districtLevel, provinceLevel } = address;
    wardLevel = Array.isArray(wardLevel) ? wardLevel[0] : wardLevel;
    districtLevel = Array.isArray(districtLevel) ? districtLevel[0] : districtLevel;
    provinceLevel = Array.isArray(provinceLevel) ? provinceLevel[0] : provinceLevel;

    let result = '';
    result += detail + ', ';
    result += wardLevel?.ward_name + ', ';
    result += districtLevel?.district_name + ', ';
    result += provinceLevel?.province_name + '.';

    return result;
}
