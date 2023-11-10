export class Province {
    province_id?: string | undefined;
    province_name?: string | null = null;
    provnce_type?: string | null = null;
    country_id?: number | null = null;
    name_extension?: string | null = null;
    status?: number | null = null;
}

export class District {
    district_id?: string | undefined;
    district_name?: string | null = null;
    province_id?: string | null = null;
    support_type?: number | null = null;
    name_extension?: string | null = null;
    can_update_cod?: boolean | null = null;
    status?: number | null = null;
}

export class Ward {
    ward_code?: string | null = null;
    ward_name?: string | null = null;
    district_id?: string | null = null;
    support_type?: number | null = null;
    can_update_cod?: boolean | null = null;
    status?: number | null = null;
}

export class Address {
    addressName?: string | null = null;
    customerName?: string | null = null;
    phoneNumbers?: string | null = null;
    provinceLevel:  Province | Province[] | null = null;
    districtLevel: District | District[] | null = null;
    wardLevel: Ward | Ward[] | null = null;
    detail: string | null = null;
    isDefault: boolean | null = null;
}


export class Location {
    address: Address = new Address();
}
