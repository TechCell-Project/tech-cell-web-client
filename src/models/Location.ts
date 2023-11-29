import { Address } from "./Account";

export class LocationExtended {
    name_extension: Array<string> = [];
    status: number | null = null;
}

export class Province<T = string> extends LocationExtended {
    province_id: T | null = null;
    province_name: T | null = null;
    country_id: number | null = null;
}

export class District<T = string> extends LocationExtended {
    province_id: T | null = null;
    district_id: T | null = null;
    district_name: T | null = null;
    support_type: number | null = null;
    can_update_cod: boolean = false;
}

export class Ward<T = string> extends LocationExtended {
    district_id: T | null = null;
    ward_code: T | null = null;
    ward_name: T | null = null;
    support_type: number | null = null;
    can_update_cod: boolean = false;
}

export class Location {
    address: Address = new Address();
    constructor(values?: Address) {
        if (values) {
            Object.assign(this, {address: values});
        }
    }
}
